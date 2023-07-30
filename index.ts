import type { Prisma } from "@prisma/client";

type PrismaPromise<T> = Prisma.PrismaPromise<T>;

type TuplePromise<A extends any[], R> = (
	...args: A
) => R extends null
	? PrismaPromise<[null, Error]>
	: PrismaPromise<[R, undefined]>;

export type ProxyPrisma<PC extends {}> = {
	[key in keyof PC]: PC[key] extends (
		...args: infer A
	) => PrismaPromise<infer R>
		? TuplePromise<A, R>
		: ProxyPrisma<PC[key]>;
};

export function proxyPrisma<PC extends {}>(prismaClient: PC): ProxyPrisma<PC> {
	return prismaProxyClient(prismaClient, []);
}

function noop() {}
function prismaProxyClient(callback: any, path: string[]): any {
	return new Proxy(noop, {
		get(_obj, key) {
			if (typeof key !== "string") {
				return undefined;
			}
			return prismaProxyClient(callback, [...path, key]);
		},
		async apply(_1, _2, args) {
			let method = callback;
			for (let i = 0, iLen = path.length; i < iLen; i++) {
				method = method[path[i] as keyof typeof method];
			}
			let result = null,
				error;
			try {
				result = await method(...args);
			} catch (e: any) {
				error = e;
			}
			return [result, error];
		},
	});
}
