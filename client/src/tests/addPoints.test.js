import { addPoints } from '../utils/addPoints';

describe('addPoints function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should add points to user successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        ok: true,
        points: 150,
        msg: 'Puntos actualizados'
      })
    };
    global.fetch.mockResolvedValue(mockResponse);

    const response = await addPoints({ username: 'testuser', points: 100 });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/addPoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'testuser', points: 100 }),
    });

    expect(response).toEqual({
      ok: true,
      points: 150,
      msg: 'Puntos actualizados'
    });
  });

  test('should handle errors gracefully', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(addPoints({ username: 'testuser', points: 100 })).rejects.toThrow('Network error');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/addPoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'testuser', points: 100 }),
    });
  });
});