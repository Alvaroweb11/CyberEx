import { deleteAdminFiles } from '../utils/deleteAdminFiles';

describe('deleteAdminFiles function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should delete admin file successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        ok: true
      })
    };
    global.fetch.mockResolvedValue(mockResponse);

    const response = await deleteAdminFiles({ username: 'testuser', fileName: 'file.txt' });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/deleteAdminFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'testuser', fileName: 'file.txt' }),
    });

    expect(response).toEqual({ ok: true });
  });

  test('should handle errors gracefully', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(deleteAdminFiles({ username: 'testuser', fileName: 'file.txt' })).rejects.toThrow('Network error');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/deleteAdminFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'testuser', fileName: 'file.txt' }),
    });
  });
});