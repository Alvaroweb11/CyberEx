import { getAdminFiles } from '../utils/getAdminFiles';

describe('getAdminFiles function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should retrieval admin files successfully', async () => {
    // Mock data returned from the server
    const mockResponse = {
      files: [
        {
          uid: '1',
          name: 'document.txt',
          user: 'adminuser',
          size: 1024,
          date: new Date('2023-01-01T12:00:00Z')
        },
        {
          uid: '2',
          name: 'image.png',
          user: 'adminuser',
          size: 2048,
          date: new Date('2023-01-02T12:00:00Z')
        }
      ]
    };
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve(mockResponse)
    });

    // Call getAdminFiles function
    const response = await getAdminFiles();

    // Verify fetch call was made with correct parameters
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/getAdminFiles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verify response data format and contents
    expect(response).toEqual(mockResponse);
  });

  test('should handle errors gracefully', async () => {
    // Simulate server network error
    global.fetch.mockRejectedValue(new Error('Network error'));

    // Verify that getAdminFiles function handles errors correctly
    await expect(getAdminFiles()).rejects.toThrow('Network error');

    // Verify fetch call was made with correct parameters
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/getAdminFiles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
