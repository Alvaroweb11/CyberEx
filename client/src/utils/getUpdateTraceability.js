export const getUpdateTraceability = async (traceabilityUpdates) => {
  const response = await fetch('http://localhost:3001/auth/updateTraceability', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(traceabilityUpdates),
  });

  const data = await response.json();
  return data;
}