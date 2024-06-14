import { getRegister } from '../utils/getRegister';

describe('getRegister function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Successful registration: should register a new user', async () => {
    const mockResponse = {
      ok: true,
      uid: 123,
      username: 'newuser',
      email: 'newuser@example.com',
      fullName: 'New User',
      role: 'user',
      token: 'mock-token'
    };

    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockResponse) });

    const response = await getRegister({
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password123'
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      }),
    });

    expect(response).toEqual(mockResponse);
  });

  test('Error handling for existing user: should handle existing email or username gracefully', async () => {
    const mockErrorResponse = {
      ok: false,
      status: 400,
      json: () => Promise.resolve({ ok: false, msg: 'El usuario ya existe' })
    };

    global.fetch.mockResolvedValue(mockErrorResponse);

    const response = await getRegister({
      username: 'existinguser',
      email: 'existinguser@example.com',
      password: 'password123'
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'existinguser',
        email: 'existinguser@example.com',
        password: 'password123'
      }),
    });

    expect(response).toEqual({ ok: false, msg: 'El usuario ya existe' });
  });
});
