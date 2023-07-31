export function proxyPrisma(prismaClient) {
    return prismaProxyClient(prismaClient, []);
}
const noop = function () { };
function prismaProxyClient(prismaClient, path) {
    return new Proxy(noop, {
        get(_obj, key) {
            if (typeof key !== "string") {
                return undefined;
            }
            if (!path.length && key === "lastError") {
                return noop.lastError;
            }
            return prismaProxyClient(prismaClient, [...path, key]);
        },
        async apply(_1, _2, args) {
            let method = prismaClient;
            for (let i = 0, iLen = path.length; i < iLen; i++) {
                method = method[path[i]];
            }
            let result = null;
            try {
                result = await method(...args);
                noop.lastError = null;
            }
            catch (error) {
                noop.lastError = error;
            }
            return result;
        },
    });
}
