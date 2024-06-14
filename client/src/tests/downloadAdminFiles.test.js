import { downloadAdminFiles } from '../utils/downloadAdminFiles';

describe('downloadAdminFiles function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should download admin files successfully', async () => {
    const mockBlob = new Blob(['Text file'], { type: 'text/plain' });
    global.fetch.mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob)
    });

    const response = await downloadAdminFiles({
      username: 'testuser',
      fileName: 'documento.txt'
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/downloadAdminFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        fileName: 'documento.txt'
      }),
    });

    expect(response instanceof Blob).toBe(true);
    const text = await new Response(mockBlob).text();
    expect(text).toEqual('Text file');
  });

  test('should handle errors gracefully', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(downloadAdminFiles({
      username: 'testuser',
      fileName: 'documento.txt'
    })).rejects.toThrow('Network error');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/downloadAdminFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        fileName: 'documento.txt'
      }),
    });
  });
});