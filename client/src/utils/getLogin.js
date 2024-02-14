import Swal from "sweetalert2";

export const getLogin = async ({ email, password }) => {
  const response = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
  }

  const data = await response.json();
  return data;
}