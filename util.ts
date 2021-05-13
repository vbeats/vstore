export function stringify<T>(value: T): string {
    try {
        return JSON.stringify(value)
    } catch (e) {
        return ""
    }
}

export function parse(value: string | null): any {
    try {
        return value ? JSON.parse(value) : null
    } catch (e) {
        return value
    }
}