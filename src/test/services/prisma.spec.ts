import { Test } from "@nestjs/testing";
import { PrismaService } from "../../services/prisma.service";

describe("Prisma service", () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = moduleRef.get(PrismaService);
  });

  it("Implements connection", async () => {
    const query = await prismaService.$queryRaw`SELECT CURRENT_TIMESTAMP;`;

    expect(query).toEqual([{ current_timestamp: expect.anything() }]);
  });
});
