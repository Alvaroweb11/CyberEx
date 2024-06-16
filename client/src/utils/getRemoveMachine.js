export const getRemoveMachine = async () => {
    const response = await fetch('http://localhost:3001/auth/getRemoveMachine', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}