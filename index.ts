import {parse, stringify} from './util'

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
        this.store.setItem(key, typeof value === "string" ? value : stringify(value));
        if (expire > 0) {
            this.store.setItem(`__storejs__${key}__expire__`, expire.toString());
        }
    }

    get(key: string): any {
        const v = this.store.getItem(key);
        return parse(v);
    }

    // 0:not expire -1: expired  >0 : Residual expiration time
    getExpire(key: string): number {
        const expire = this.store.getItem(`__storejs__${key}__expire__`)
        if (!expire) {
            return 0
        }
        const expireMilliseconds: number = parseInt(expire) - new Date().getTime()

        if (expireMilliseconds <= 0) {
            this.store.removeItem(key)
            return -1
        }

        return expireMilliseconds
    }

    remove(key: string): void {
        this.store.removeItem(key)
        this.store.removeItem(`__storejs__${key}__expire__`)
    }

    removeAll(): void {
        this.store.removeAllItems()
    }
}