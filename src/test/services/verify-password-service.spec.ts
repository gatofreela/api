import { randomUUID } from "node:crypto";
import { Test } from "@nestjs/testing";
import { HashPasswordService } from "../../services/hash-password.service";
import { PrismaService } from "../../services/prisma.service";
import { VerifyPasswordService } from "../../services/verify-password.service";

describe("Verify PasswordService", () => {
  let prismaService: PrismaService;
  let verifyPasswordService: VerifyPasswordService;
  let hashPasswordService: HashPasswordService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, HashPasswordService, VerifyPasswordService],
    }).compile();

    verifyPasswordService = moduleRef.get(VerifyPasswordService);
    hashPasswordService = moduleRef.get(HashPasswordService);
  });

  it("should hash and verify successfully", async () => {
    const password = randomUUID();
    const { salt, hash } = await hashPasswordService.execute({
      password,
    });

    const checked = await verifyPasswordService.execute({
      hashedPassword: hash,
      salt,
      password,
    });

    expect(checked).toBe(true);
  });

  it("should deny wrong password", async () => {
    const password = randomUUID();
    const { salt, hash } = await hashPasswordService.execute({
      password,
    });

    const checked = await verifyPasswordService.execute({
      hashedPassword: hash,
      salt,
      password: "wrong-password",
    });

    expect(checked).toBe(false);
  });
});
