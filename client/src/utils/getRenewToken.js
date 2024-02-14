export const getRenewToken = async ({ uid, token }) => {
  const response = await fetch('http://localhost:3001/auth/renew', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid, token }),
  });

  const data = await response.json();
  return data;
}