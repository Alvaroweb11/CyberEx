export const getStartMachine = async () => {
    const response = await fetch('http://localhost:3001/auth/getStartMachine', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}