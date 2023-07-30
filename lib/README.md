# Usage

## Creating the proxy
```typescript
import { PrismaClient } from '@prisma/client';
import { proxyPrisma, type ProxyPrisma } from 'prisma-proxy';

// The type if you need it!
type ProxyPrismaClient = ProxyPrisma<PrismaClient>;

const prisma = proxyPrisma(new PrismaClient());

export default prisma;
```

## Normal Usage Without Proxy
```typescript
import { prisma } from "wherever-you-made-prisma"

let posts, postsError;
try {
    posts = await prisma.posts.findMany();
}
catch(error){
    postsError = error;
}

if(postsError){
    //Deal with error
}
```

## Proxy Usage
```typescript
import { prisma } from "wherever-you-made-prisma"

let [posts, postsError] = await prisma.posts.findMany();

if(postsError){
    //Deal with error
}
```