# Usage

## Normal Usage (without proxy)
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

let posts, postsError;
try {
    posts = await prisma.posts.findMany();
}
catch(error){
    //Deal with error here
    postsError = error;
}

if(postsError){
    //Or deal with error here
}
```


## Proxy Usage

### **_NOTE:_**  
- Errors will no longer be thrown as they are caught in the proxy and attached to `prisma.lastError`
- `prisma.lastError` changes after every prisma function call, if the last call was successful it will be `null` otherwise it will be an error

```typescript
import { PrismaClient } from '@prisma/client';
import { proxyPrisma, type ProxyPrisma } from 'prisma-proxy';

// The type in case you need it.
type ProxyPrismaClient = ProxyPrisma<PrismaClient>;

const prisma: ProxyPrismaClient = proxyPrisma(new PrismaClient());
// Use prisma as you do normal
const posts = await prisma.posts.findMany();

if(prisma.lastError){
    //Deal with error
}
```