import Swal from 'sweetalert2';
import { uploadAvatars } from '../utils/uploadAvatars';

describe('uploadAvatars function', () => {
    let mockFile;
    let mockFormData;

    beforeEach(() => {
        mockFile = new File([''], 'avatar.png', { type: 'image/png' });
        mockFormData = new FormData();
        mockFormData.append('file', mockFile);
        mockFormData.append('uid', '123');

        global.fetch = jest.fn();
        jest.spyOn(Swal, 'fire');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should upload the avatar successfully', async () => {
        const mockResponse = new Response(new Blob(), { status: 200 });

        global.fetch.mockResolvedValue(mockResponse);

        const response = await uploadAvatars('123', mockFile);

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/uploadAvatars', {
            method: 'POST',
            body: mockFormData,
        });

        expect(Swal.fire).toHaveBeenCalledWith({
            html: `<p>Avatar subido correctamente.</p>`,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
        });

        expect(response).toBeInstanceOf(Blob);
    });

    test('should show an error for invalid file type', async () => {
        const mockResponse = new Response(new Blob(), { status: 412 });

        global.fetch.mockResolvedValue(mockResponse);

        await uploadAvatars('123', mockFile);

        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Sólo se pueden subir archivos JPG y PNG', 'error');
    });

    test('should show an error for upload failure', async () => {
        const mockResponse = new Response(new Blob(), { status: 500 });

        global.fetch.mockResolvedValue(mockResponse);

        await uploadAvatars('123', mockFile);

        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error al subir el archivo', 'error');
    });
});
