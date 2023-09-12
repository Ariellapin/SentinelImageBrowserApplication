

export function getRandomIndexes(maxNumber,oldIndexes, newIndexes, count) {
    if (count > 1) 
        return newIndexes;
    
    const idx = Math.floor(Math.random() * maxNumber);
    if (!oldIndexes.includes(idx) && !newIndexes.includes(idx)){
        newIndexes.push(idx);
        count++;
    }
        
    return getRandomIndexes(maxNumber,oldIndexes, newIndexes, count);
}