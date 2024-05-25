export const addPoints = async ({ username, points }) => {
    const response = await fetch('http://localhost:3001/auth/addPoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, points }),
    });
  
    const data = await response.json();
    return data;
}