import { PrismaClient } from '@prisma/client';
import { logger } from "#functions/logger";

const prisma = new PrismaClient();

(async () => {
  await prisma.$connect().then(() => {
    return logger.info("Prisma connected to the database")
  }).catch((err) => {
    return logger.error("Prisma did not connect to the database: " + err.message)
  });
})()

export default prisma;
