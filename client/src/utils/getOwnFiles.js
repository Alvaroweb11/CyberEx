export const getOwnFiles = async ({ uid }) => {
    const response = await fetch('http://localhost:3001/getOwnFiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }),
    });

    const data = await response.json();
    return data;
}