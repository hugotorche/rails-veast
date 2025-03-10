async function rf(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    } catch (err) {
        console.error("Error fetching file:", err);
        throw err;
    }
}
 
export { rf };