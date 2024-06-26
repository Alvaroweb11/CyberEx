export const downloadAdminFiles = async ({ username, fileName }) => {
    const response = await fetch('http://localhost:3001/downloadAdminFiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, fileName }),
    });

    const blobResponse = new Response(response.body);
    const data = await blobResponse.blob();
    return data;
}