const useDebounce = <T extends Function>(callback: T, ms: number) => {
    let timer: any;

    return function(...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), ms)
    }
}

export default useDebounce;