export const getUpdateTasks = async (taskUpdates) => {
  const response = await fetch('http://localhost:3001/auth/updatePoints', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskUpdates),
  });

  const data = await response.json();
  return data;
}