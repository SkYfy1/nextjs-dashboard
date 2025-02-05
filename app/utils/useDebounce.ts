const useDebounce = <T extends (...args: string[]) => void>(callback: T, ms: number) => {
    let timer: ReturnType<typeof setTimeout>;

    return function(...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), ms)
    }
}

export default useDebounce;