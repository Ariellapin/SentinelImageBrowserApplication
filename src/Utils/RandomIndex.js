
const max = 10;
export function getRandomIndexes(oldIndexes, newIndexes, count) {
    if (count > 1) 
        return newIndexes;
    
    const idx = Math.floor(Math.random() * max);
    if (!oldIndexes.includes(idx) && !newIndexes.includes(idx)){
        newIndexes.push(idx);
        count++;
    }
        
    return getRandomIndexes(oldIndexes, newIndexes, count);
}