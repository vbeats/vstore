# vstore

Sponsor [![paypal.me/bootvue](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/icon/paypal.svg)](https://www.paypal.me/bootvue)
☕☕☕

## install

```bash
npm i @vbeats/vstore
```

## use

```typescript
import VStore from "vstore";

const store = new VStore("localStorage")

store.set("test", "1234");
store.set("test2", "5555", new Date().getTime() + 24 * 60 * 60 * 1000)

store.get("test")

store.getExpire("test2")  // 0:not expire ; >0:Residual expiration time ; -1:has expired

store.remove('test2')

store.removeAll()
```

## method

```bash
set<T>(key: string, value: T, [expire: number = 0]): void : expire Millisecond timestamp || 0 not expire

get(key: string): any : return value || null

getExpire(key: string): number : // 0:not expire -1: expired  >0 : Residual expiration time

remove(key: string): void : remove on item

removeAll(): void : clear storage all items 
```

