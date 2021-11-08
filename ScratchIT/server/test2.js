
const test = {
    arr: [
        { a: 1 },
        { a: 2 },
        { a: 3 }
    ]
}

console.log(test.arr.forEach(e => {
    if (e.a === 2)
        return true
}));