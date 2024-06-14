import { getRanking } from '../utils/getRanking';

describe('getRanking function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should retrieve top 10 users by points successfully', async () => {
    const mockResponse = [
      { username: 'user1', points: 500 },
      { username: 'user2', points: 480 },
      { username: 'user3', points: 460 },
      { username: 'user4', points: 440 },
      { username: 'user5', points: 420 },
      { username: 'user6', points: 400 },
      { username: 'user7', points: 380 },
      { username: 'user8', points: 360 },
      { username: 'user9', points: 340 },
      { username: 'user10', points: 320 },
    ];

    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockResponse) });

    const response = await getRanking();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/getRanking', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response).toEqual(mockResponse);
});

  test('should handle errors gracefully', async () => {
    const mockError = new Error('Network error');

    global.fetch.mockRejectedValue(mockError);

    await expect(getRanking()).rejects.toThrow('Network error');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/getRanking', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
