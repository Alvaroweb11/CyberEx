export const approveAdminFiles = async ({ username, fileName, selectedCategory, selectedDifficulty }) => {
    const response = await fetch('http://localhost:3001/approveAdminFiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, fileName, selectedCategory, selectedDifficulty }),
    });

    const data = await response.json();
    return data;
}