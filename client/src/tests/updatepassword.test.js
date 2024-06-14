import Swal from 'sweetalert2';
import { updatePassword } from '../utils/updatePassword';

jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

describe('updatePassword function', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        jest.spyOn(Swal, 'fire');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should update the password successfully', async () => {
        const mockResponse = {
            ok: true,
            msg: 'Contraseña actualizada'
        };

        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockResponse)
        });

        const passwordUpdates = {
            uid: 123,
            oldPassword: 'oldPassword123',
            newPassword: 'newPassword123'
        };

        const response = await updatePassword(passwordUpdates);

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordUpdates),
        });

        expect(response).toEqual(mockResponse);
    });

    test('should handle errors gracefully', async () => {
        const mockErrorResponse = {
            ok: false,
            status: 400,
            json: () => Promise.resolve({ ok: false, msg: 'Password incorrecto' })
        };
    
        global.fetch.mockResolvedValue(mockErrorResponse);
    
        const passwordUpdates = {
            uid: 123,
            oldPassword: 'incorrectOldPassword',
            newPassword: 'newPassword123'
        };
    
        try {
            await updatePassword(passwordUpdates);
        } catch (error) {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/updatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passwordUpdates),
            });
    
            expect(Swal.fire).toHaveBeenCalledWith('Error', 'Contraseña incorrecta', 'error');
            expect(error).toEqual({ ok: false, msg: 'Password incorrecto' });
        }
    });
});
