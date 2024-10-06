function calculateTotalSpentByCategory(transactions) {
    let categoryTotalMap = {};

    transactions.forEach(transaction => {
        const {category, amount} = transaction;
        
        if(category in categoryTotalMap) {
            categoryTotalMap[category] += amount;
        } else {
            categoryTotalMap[category] = amount;
        }
    })
    const result = []
    for(const category in categoryTotalMap) {
        result.push({category, totalSpent: categoryTotalMap[category]})
    }
    return result
}