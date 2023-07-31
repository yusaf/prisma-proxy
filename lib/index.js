export function proxyPrisma(prismaClient) {
    return prismaProxyClient(prismaClient, []);
}
function noop() { }
function prismaProxyClient(callback, path) {
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
                method = method[path[i]];
            }
            let result = null;
            try {
                result = await method(...args);
                callback.lastError = null;
            }
            catch (error) {
                callback.lastError = error;
            }
            return result;
        },
    });
}
