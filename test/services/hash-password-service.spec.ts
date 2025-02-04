import { Test } from "@nestjs/testing";
import { PrismaService } from "../../src/services/prisma.service";
import { HashPasswordService } from "../../src/services/hash-password.service";
import { randomUUID } from "node:crypto";

describe("Hash PasswordService", () => {
  let prismaService: PrismaService;
  let hashPasswordService: HashPasswordService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, HashPasswordService],
    }).compile();

    hashPasswordService = moduleRef.get(HashPasswordService);
  });

  it("should return random salt and hash", async () => {
    const { salt: salt1, hash: hash1 } = await hashPasswordService.execute({
      password: randomUUID(),
    });
    const { salt: salt2, hash: hash2 } = await hashPasswordService.execute({
      password: randomUUID(),
    });

    expect(salt1).not.toBe(salt2);
    expect(hash1).not.toBe(hash2);
  });
});
