// main
const addZeroes = (num: number) => {
    const value = num.toString()
    const dec = value.split('.')[1]

    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
}

// exports
export { addZeroes }
