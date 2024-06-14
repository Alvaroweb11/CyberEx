import { approveAdminFiles } from '../utils/approveAdminFiles';

describe('approveAdminFiles function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should approve admin files successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ ok: true })
    };
    global.fetch.mockResolvedValue(mockResponse);

    const response = await approveAdminFiles({
      username: 'testuser',
      fileName: 'example.txt',
      selectedCategory: 'category',
      selectedDifficulty: 'easy'
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/approveAdminFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        fileName: 'example.txt',
        selectedCategory: 'category',
        selectedDifficulty: 'easy'
      }),
    });

    expect(response).toEqual({ ok: true });
  });

  test('should handle file not found error', async () => {
    const mockResponse = {
      status: 404,
      json: jest.fn().mockResolvedValue({
        ok: false,
        msg: 'File not found'
      })
    };
    global.fetch.mockResolvedValue(mockResponse);

    const response = await approveAdminFiles({
      username: 'testuser',
      fileName: 'nonexistent.txt',
      selectedCategory: 'category',
      selectedDifficulty: 'easy'
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/approveAdminFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        fileName: 'nonexistent.txt',
        selectedCategory: 'category',
        selectedDifficulty: 'easy'
      }),
    });

    expect(response).toEqual({
      ok: false,
      msg: 'File not found'
    });
  });

  test('should handle errors gracefully', async () => {
    const mockError = new Error('Network error');
    global.fetch.mockRejectedValue(mockError);

    await expect(approveAdminFiles({
      username: 'testuser',
      fileName: 'example.txt',
      selectedCategory: 'category',
      selectedDifficulty: 'easy'
    })).rejects.toThrow('Network error');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/approveAdminFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        fileName: 'example.txt',
        selectedCategory: 'category',
        selectedDifficulty: 'easy'
      }),
    });
  });
});
