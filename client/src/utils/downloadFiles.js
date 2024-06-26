export const downloadFiles = async ({ username, fileName, category, difficulty }) => {
    const response = await fetch('http://localhost:3001/downloadFiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, fileName, category, difficulty }),
    });

    const blobResponse = new Response(response.body);
    const data = await blobResponse.blob();
    return data;
}