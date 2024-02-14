import Swal from 'sweetalert2'

export const getRegister = async ({ username, email, password }) => {
  const response = await fetch('http://localhost:3001/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    Swal.fire('Error', 'Ya existe un usuario con ese Username o Email', 'error');
  }
  
  return response.json();
}