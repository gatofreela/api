import { randomUUID } from "node:crypto";
import { Test } from "@nestjs/testing";
import { HashPasswordService } from "../../services/hash-password.service";
import { PrismaService } from "../../services/prisma.service";

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
