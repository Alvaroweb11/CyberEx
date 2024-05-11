export const getAdminFiles = async () => {
    const response = await fetch('http://localhost:3001/getAdminFiles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}