import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
};

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb


export default prismadb;

// If we initialize a new prisma client every time, next13 with hot reloading
// would initiate a bunch of prisma instances, we dont want that
