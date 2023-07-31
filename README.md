# About
Got frustrated with all the try catch, try catch, try catch, well you get the idea.

### Limitations
- Although limitations, they are only limitations for the proxy implementation. \
  - prisma proxy respect the original prisma client and makes no direct modifications to it. 
  - So you can still use the prisma client as is alongside the proxy!
- Only works for callable methods e.g. `prisma.table.create()`, `prisma.table.findMany()` (but not `prisma.table.fields`)
- Additional `.lastError` property, so if you happen to have a table/collection with this name, it will not longer work on the proxy client.
- Not soo much a limitation as it's kinda the point of this package, but errors are no longer thrown (so don't try catching em, or you'll be catching thin air).
  - After you call a method e.g. `prisma.users.findMany()` you can check `prisma.lastError` to see if there was an error
  - If there was no error `prisma.lastError` will be `null`
  - when you make another call `prisma.lastError` will be immediately overwritten, so you must always check for errors immediately after the original call



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

```typescript
import { PrismaClient } from '@prisma/client';
import { proxyPrisma, type ProxyPrisma } from 'prisma-proxy';

// The type in case you need it
type ProxyPrismaClient = ProxyPrisma<PrismaClient>;

const prismaOG: PrismaClient = new PrismaClient();
const prisma: ProxyPrismaClient = proxyPrisma(prismaOG);

// Use prisma proxy as you would regularly for callable methods
const posts = await prisma.posts.findMany();

if(prisma.lastError){
    //Deal with error
}
```