export type ProxyPrisma<PC extends {}> = PC & {
    lastError: null | Error;
};
export declare function proxyPrisma<PC extends {}>(prismaClient: PC): ProxyPrisma<PC>;
