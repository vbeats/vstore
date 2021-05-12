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
