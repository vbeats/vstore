export default class VStore {
    store: Storage;

    /**
     * @param type localStorage || sessionStorage
     */
    constructor(type: string) {
        switch (type) {
            case "localStorage":
                this.store = localStorage;
            case "sessionStorage":
                this.store = sessionStorage;
            default:
                this.store = localStorage;
        }
    }

    /**
     * @param key key
     * @param value value
     * @param store Storage
     * @param expire Millisecond timestamp || 0: not expire
     */
    set<T>(key: string, value: T, expire: number = 0): void {
        this.store.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
        if (expire > 0) {
            this.store.setItem(`__storejs__${key}__expire__`, expire.toString());
        }
    }

    get<T>(key: string): T {
        const v = this.store.getItem(key) || null;
        return v && typeof v === "string" ? JSON.parse(v) : v;
    }

    // 0:not expire <0: expired
    getExpire(key: string): number {
        const expire = this.store.getItem(`__storejs__${key}__expire__`)
        if (!expire) {
            return 0
        }
        const expireMilliseconds: number = new Date().getTime() - parseInt(expire)

        if (expireMilliseconds <= 0) {
            this.store.removeItem(key)
        }

        return expireMilliseconds
    }

    remove(key: string): void {
        this.store.removeItem(key)
        this.store.removeItem(`__storejs__${key}__expire__`)
    }
}