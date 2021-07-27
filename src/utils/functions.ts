// main
function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
): (...args: Params) => void {
    let timer: NodeJS.Timeout
    return (...args: Params) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, timeout)
    }
}

function throttle<Params extends any[]>(func: (...args: Params) => any, timeout: number) {
    let shouldWait = false

    return (...args: Params) => {
        if (!shouldWait) {
            func(...args)
            shouldWait = true
            setTimeout(() => (shouldWait = false), timeout)
        }
    }
}

const nonEmpty = (element: any) =>
    Object.entries(element).filter(([_, value]: [string, any]) => value && value.length)

// exports
export { debounce, throttle, nonEmpty }
