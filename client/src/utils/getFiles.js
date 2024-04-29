export const getFiles = async () => {
    const response = await fetch('http://localhost:3001/getFiles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}