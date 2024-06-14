import { downloadFiles } from '../utils/downloadFiles';

describe('downloadFiles function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should download files successfully', async () => {
    const mockBlob = new Blob(['Test file'], { type: 'text/plain' });
    global.fetch.mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob)
    });

    const response = await downloadFiles({
      username: 'testuser',
      fileName: 'document.txt',
      category: 'documents',
      difficulty: 'easy'
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/downloadFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        fileName: 'document.txt',
        category: 'documents',
        difficulty: 'easy'
      }),
    });

    expect(response instanceof Blob).toBe(true);
    const text = await new Response(mockBlob).text();
    expect(text).toEqual('Test file');
  });

  test('should handle errors gracefully', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(downloadFiles({
      username: 'testuser',
      fileName: 'document.txt',
      category: 'documents',
      difficulty: 'easy'
    })).rejects.toThrow('Network error');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/downloadFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        fileName: 'document.txt',
        category: 'documents',
        difficulty: 'easy'
      }),
    });
  });
});