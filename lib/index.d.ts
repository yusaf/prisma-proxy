import type { Prisma } from "@prisma/client";
type PrismaPromise<T> = Prisma.PrismaPromise<T>;
type TuplePromise<A extends any[], R> = (...args: A) => PrismaPromise<[null, Error] | [R, undefined]>;
export type ProxyPrisma<PC extends {}> = {
    [key in keyof PC]: PC[key] extends (...args: infer A) => PrismaPromise<infer R> ? TuplePromise<A, R> : ProxyPrisma<PC[key]>;
};
export declare function proxyPrisma<PC extends {}>(prismaClient: PC): ProxyPrisma<PC>;
export {};
