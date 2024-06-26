import Swal from 'sweetalert2'

export const uploadFiles = async (uid, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uid', uid);

    const response = await fetch('http://localhost:3001/uploadFiles', {
        method: 'POST',
        body: formData,
    });

    if (response.status === 412) {
        Swal.fire('Error', 'Sólo se pueden subir archivos comprimidos', 'error');
    } else if (!response.ok) {
        Swal.fire('Error', 'Error al subir el archivo', 'error');
    } else {
        Swal.fire('Éxito', ' ', 'success');
        Swal.fire({
            html: `<p>Archivo subido correctamente.</p>
                   <br>
                   <p>Será revisado por nuestros administradores.</p>`,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
        });
    }

    return response.json();
}