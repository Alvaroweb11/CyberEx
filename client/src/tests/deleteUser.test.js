import { deleteUser } from '../utils/deleteUser';

describe('deleteUser function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should delete a user successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        ok: true,
        msg: 'Usuario eliminado'
      })
    };
    global.fetch.mockResolvedValue(mockResponse);

    const response = await deleteUser({
      uid: 'testUserId'
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/deleteUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: 'testUserId'
      }),
    });

    expect(response).toEqual({
      ok: true,
      msg: 'Usuario eliminado'
    });
  });

  test('should handle errors gracefully', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(deleteUser({
      uid: 'testUserId'
    })).rejects.toThrow('Network error');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/deleteUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: 'testUserId'
      }),
    });
  });
});
