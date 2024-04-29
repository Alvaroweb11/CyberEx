import Swal from 'sweetalert2'

export const uploadFiles = async (uid, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uid', uid);

    const response = await fetch('http://localhost:3001/uploadFiles', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        Swal.fire('Error', 'Error al subir el archivo', 'error');
    }

    return response.json();
}