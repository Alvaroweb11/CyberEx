import { getPoints } from '../utils/getPoints';

describe('Function getPoints', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should retrieve points successfully', async () => {
    const mockUid = '123';
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        ok: true,
        points: 150,
        hashEasyTask1: 'hash1',
        hashHardTask1: 'hash2',
        // Add more fields as needed
      })
    };

    global.fetch.mockResolvedValue(mockResponse);

    const response = await getPoints({ uid: mockUid });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/getPoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: mockUid }),
    });

    expect(response).toEqual({
      ok: true,
      points: 150,
      hashEasyTask1: 'hash1',
      hashHardTask1: 'hash2',
      // Add more fields as needed
    });
  });

  test('should handle user not found gracefully', async () => {
    const mockUid = '456';
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        ok: false,
        msg: 'User not found'
      })
    };

    global.fetch.mockResolvedValue(mockResponse);

    const response = await getPoints({ uid: mockUid });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/getPoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: mockUid }),
    });

    expect(response).toEqual({
      ok: false,
      msg: 'User not found'
    });
  });

  test('should handle errors gracefully', async () => {
    const mockUid = '789';
    const mockError = new Error('Network error');

    global.fetch.mockRejectedValue(mockError);

    await expect(getPoints({ uid: mockUid })).rejects.toThrow('Network error');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/getPoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: mockUid }),
    });
  });
});
