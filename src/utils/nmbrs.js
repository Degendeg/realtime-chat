export const getUniqueNumbers = (count, max) => {
    const numbers = new Set();
    while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * max) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
};