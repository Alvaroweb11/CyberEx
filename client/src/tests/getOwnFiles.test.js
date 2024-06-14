import { getOwnFiles } from '../utils/getOwnFiles';

describe('getOwnFiles function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should retrieve files successfully', async () => {
    const mockUid = '123';
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        files: [
          {
            name: 'file1.txt',
            user: 'Test User',
            size: 1024,
            date: new Date('2024-06-01T10:30:00Z'),
            category: 'documents',
            difficulty: 'easy'
          },
          {
            name: 'file2.jpg',
            user: 'Test User',
            size: 2048,
            date: new Date('2024-06-02T15:45:00Z'),
            category: 'images',
            difficulty: 'medium'
          }
        ]
      })
    };

    global.fetch.mockResolvedValue(mockResponse);

    const response = await getOwnFiles({ uid: mockUid });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/getOwnFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: mockUid }),
    });

    expect(response).toEqual({
      files: [
        {
          name: 'file1.txt',
          user: 'Test User',
          size: 1024,
          date: new Date('2024-06-01T10:30:00Z'),
          category: 'documents',
          difficulty: 'easy'
        },
        {
          name: 'file2.jpg',
          user: 'Test User',
          size: 2048,
          date: new Date('2024-06-02T15:45:00Z'),
          category: 'images',
          difficulty: 'medium'
        }
      ]
    });
  });

  test('should handle errors gracefully', async () => {
    const mockUid = '789';
    const mockError = new Error('Network error');

    global.fetch.mockRejectedValue(mockError);

    await expect(getOwnFiles({ uid: mockUid })).rejects.toThrow('Network error');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/getOwnFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: mockUid }),
    });
  });
});
