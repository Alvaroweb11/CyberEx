export const deleteAdminFiles = async ({ username, fileName }) => {
    const response = await fetch('http://localhost:3001/deleteAdminFiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, fileName }),
    });

    const data = await response.json();
    return data;
}