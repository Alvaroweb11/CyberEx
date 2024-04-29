export const downloadFiles = async ({ uid, fileName }) => {
    const response = await fetch('http://localhost:3001/downloadFiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, fileName }),
    });

    // Crea un nuevo objeto de respuesta con el mismo cuerpo
    const blobResponse = new Response(response.body);
    const data = await blobResponse.blob();
    return data;
}