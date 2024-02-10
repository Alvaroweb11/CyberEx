import Swal from 'sweetalert2'

export const getRegister = async ({ user, email, password }) => {
  const response = await fetch('http://localhost:3001/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, email, password }),
  });

  if (!response.ok) {
    Swal.fire('Error', 'El usuario ya existe', 'error');
  }
}