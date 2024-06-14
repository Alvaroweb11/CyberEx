import Swal from 'sweetalert2';
import { getLogin } from '../utils/getLogin';

jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

describe('getLogin function', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should login successfully', async () => {
        const mockUserData = {
            ok: true,
            uid: '123',
            username: 'testuser',
            email: 'testuser@example.com',
            fullName: 'Test User',
            role: 'user',
            token: 'mock.jwt.token'
        };

        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue(mockUserData)
        };

        global.fetch.mockResolvedValue(mockResponse);

        const response = await getLogin({ email: 'testuser@example.com', password: 'password123' });

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'testuser@example.com', password: 'password123' }),
        });

        expect(response).toEqual(mockUserData);
    });

    test('should display error message', async () => {
        const mockResponse = {
            ok: false,
            json: () => Promise.resolve({}),
        };
    
        global.fetch.mockResolvedValue(mockResponse);

        await getLogin({ email: 'invalid@example.com', password: 'invalidpassword' });
    
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'invalid@example.com', password: 'invalidpassword' }),
        });
    
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Usuario o contraseña incorrectos", "error");
    });

    test('should handle errors gracefully', async () => {
        const mockError = new Error('Network error');

        global.fetch.mockRejectedValue(mockError);

        await expect(getLogin({ email: 'testuser@example.com', password: 'password123' })).rejects.toThrow('Network error');

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'testuser@example.com', password: 'password123' }),
        });

        expect(Swal.fire).not.toHaveBeenCalled();
    });
});