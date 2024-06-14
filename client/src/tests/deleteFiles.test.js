import { deleteFiles } from '../utils/deleteFiles';

describe('deleteFiles function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should delete file successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        ok: true
      })
    };
    global.fetch.mockResolvedValue(mockResponse);

    const response = await deleteFiles({
      uid: 'testUserId',
      fileName: 'testFile.txt',
      category: 'testCategory',
      difficulty: 'testDifficulty'
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/deleteFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: 'testUserId',
        fileName: 'testFile.txt',
        category: 'testCategory',
        difficulty: 'testDifficulty'
      }),
    });

    expect(response).toEqual({
      ok: true
    });
  });

  test('should handle errors gracefully', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(deleteFiles({
      uid: 'testUserId',
      fileName: 'testFile.txt',
      category: 'testCategory',
      difficulty: 'testDifficulty'
    })).rejects.toThrow('Network error');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/deleteFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: 'testUserId',
        fileName: 'testFile.txt',
        category: 'testCategory',
        difficulty: 'testDifficulty'
      }),
    });
  });
});
