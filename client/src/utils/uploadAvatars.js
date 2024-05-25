import Swal from 'sweetalert2'

export const uploadAvatars = async (uid, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uid', uid);

    const response = await fetch('http://localhost:3001/uploadAvatars', {
        method: 'POST',
        body: formData,
    });

    if (response.status === 412) {
        Swal.fire('Error', 'Sólo se pueden subir archivos JPG y PNG', 'error');
    } else if (!response.ok) {
        Swal.fire('Error', 'Error al subir el archivo', 'error');
    } else {
        Swal.fire('Éxito', ' ', 'success');
        Swal.fire({
            html: `<p>Avatar subido correctamente.</p>`,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
        });
    }

    return response.blob();
}