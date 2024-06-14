import Swal from 'sweetalert2';
import { uploadFiles } from '../utils/uploadFiles';

describe('Function uploadFiles', () => {
    let mockFile;
    let mockFormData;

    beforeEach(() => {
        mockFile = new File([''], 'archive.zip', { type: 'application/zip' });
        mockFormData = new FormData();
        mockFormData.append('file', mockFile);
        mockFormData.append('uid', '123');

        global.fetch = jest.fn();
        jest.spyOn(Swal, 'fire');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should upload the file succesfully', async () => {
        const mockResponse = new Response(JSON.stringify({ ok: true, data: { fileName: 'archive.zip', fileSize: mockFile.size, fileType: mockFile.type } }), { status: 200 });

        global.fetch.mockResolvedValue(mockResponse);

        const response = await uploadFiles('123', mockFile);

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/uploadFiles', {
            method: 'POST',
            body: mockFormData,
        });

        expect(Swal.fire).toHaveBeenCalledWith("Éxito", " ", "success");

        expect(response).toEqual({ ok: true, data: { fileName: 'archive.zip', fileSize: mockFile.size, fileType: mockFile.type } });
    });

    test('should show an error for invalid file type', async () => {
        const mockResponse = new Response(JSON.stringify({ ok: false, msg: 'Sólo se pueden subir archivos comprimidos' }), { status: 412 });

        global.fetch.mockResolvedValue(mockResponse);

        await uploadFiles('123', mockFile);

        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Sólo se pueden subir archivos comprimidos', 'error');
    });

    test('should show an error for upload failure', async () => {
        const mockResponse = new Response(JSON.stringify({ ok: false, msg: 'Error al subir el archivo' }), { status: 500 });

        global.fetch.mockResolvedValue(mockResponse);

        await uploadFiles('123', mockFile);

        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error al subir el archivo', 'error');
    });
});
