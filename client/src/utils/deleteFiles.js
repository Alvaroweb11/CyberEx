export const deleteFiles = async ({ uid, fileName, category, difficulty }) => {
    const response = await fetch('http://localhost:3001/deleteFiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, fileName, category, difficulty }),
    });

    const data = await response.json();
    return data;
}