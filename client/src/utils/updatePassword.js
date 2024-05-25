import Swal from 'sweetalert2'

export const updatePassword = async ({ uid, oldPassword, newPassword }) => {
  const response = await fetch('http://localhost:3001/auth/updatePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid, oldPassword, newPassword }),
  });

  if (!response.ok) {
    return Swal.fire('Error', 'Contraseña incorrecta', 'error');
  }

  return response.json();
}