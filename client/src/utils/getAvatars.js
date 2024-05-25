export const getAvatars = async ({ uid }) => {
    const response = await fetch('http://localhost:3001/getAvatars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }),
    });

    const data = await response.blob();
    return data;
}