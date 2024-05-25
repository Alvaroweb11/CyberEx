import Swal from 'sweetalert2'

export const getUpdateUser = async ({ uid, username, email, fullName }) => {
  const response = await fetch('http://localhost:3001/auth/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid, username, email, fullName }),
  });

  if (!response.ok) {
    Swal.fire('Error', 'Ya existe un usuario con ese Username o Email', 'error');
  }

  return response.json();
}