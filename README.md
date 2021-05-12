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

store.getExpire("test2")

store.remove('test2')
```
