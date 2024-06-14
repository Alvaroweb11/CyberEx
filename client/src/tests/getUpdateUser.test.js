import Swal from 'sweetalert2';
import { getUpdateUser } from '../utils/getUpdateUser';

jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

describe('getUpdateUser function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.spyOn(Swal, 'fire');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should update user details for a valid user successfully', async () => {
    const mockResponse = {
      ok: true,
      username: 'newUsername',
      email: 'newEmail@example.com',
      fullName: 'New FullName'
    };

    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const userUpdates = {
      uid: 123,
      username: 'newUsername',
      email: 'newEmail@example.com',
      fullName: 'New FullName'
    };

    const response = await getUpdateUser(userUpdates);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/updateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userUpdates),
    });

    expect(response).toEqual(mockResponse);
  });

  test('should handle errors gracefully', async () => {
    const mockErrorResponse = {
      ok: false,
      status: 400,
      json: () => Promise.resolve({ ok: false, msg: 'El nombre de usuario ya está en uso' })
    };

    global.fetch.mockResolvedValue(mockErrorResponse);

    const userUpdates = {
      uid: 123,
      username: 'existingUsername',
      email: 'newEmail@example.com',
      fullName: 'New FullName'
    };

    const response = await getUpdateUser(userUpdates);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/updateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userUpdates),
    });

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Ya existe un usuario con ese Username o Email', 'error');
    expect(response).toEqual({ ok: false, msg: 'El nombre de usuario ya está en uso' });
  });
});
