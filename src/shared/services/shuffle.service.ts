// used Fished-Yates shuffle algorithm.

export function shuffleArray(array: any[]) {
    const newArray = [...array];
    for (let i= array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }

    return newArray;
}