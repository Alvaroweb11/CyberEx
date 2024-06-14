import { getRenewToken } from '../utils/getRenewToken';

describe('getRenewToken function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should renew a token for a valid user successfully', async () => {
    const mockResponse = {
      ok: true,
      uid: 123,
      username: 'validuser',
      email: 'validuser@example.com',
      fullName: 'Valid User',
      role: 'user',
      token: 'new-mock-token'
    };

    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockResponse) });

    const response = await getRenewToken({
      uid: 123,
      token: 'valid-token'
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/renew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: 123,
        token: 'valid-token'
      }),
    });

    expect(response).toEqual(mockResponse);
  });

  test('should handle errors gracefully', async () => {
    const mockErrorResponse = {
      ok: false,
      status: 500,
      json: () => Promise.resolve({ ok: false, msg: 'Por favor hable con el administrador' })
    };

    global.fetch.mockResolvedValue(mockErrorResponse);

    const response = await getRenewToken({
      uid: 123,
      token: 'invalid-token'
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/renew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: 123,
        token: 'invalid-token'
      }),
    });

    expect(response).toEqual({ ok: false, msg: 'Por favor hable con el administrador' });
  });
});
