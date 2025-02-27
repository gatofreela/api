import { randomUUID } from "node:crypto";
import { UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { HashPasswordService } from "../../services/hash-password.service";
import { PrismaService } from "../../services/prisma.service";
import { UpdatePasswordService } from "../../services/update-password.service";
import { VerifyPasswordService } from "../../services/verify-password.service";

describe("UpdatePasswordService", () => {
  let updatePasswordService: UpdatePasswordService;
  let prismaService: PrismaService;
  let verifyPasswordService: VerifyPasswordService;
  let hashPasswordService: HashPasswordService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdatePasswordService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: VerifyPasswordService,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: HashPasswordService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    updatePasswordService = moduleRef.get(UpdatePasswordService);
    prismaService = moduleRef.get(PrismaService);
    verifyPasswordService = moduleRef.get(VerifyPasswordService);
    hashPasswordService = moduleRef.get(HashPasswordService);
  });

  it("should update the password successfully", async () => {
    const mockUserId = randomUUID();
    const mockCurrentPassword = "currentPassword";
    const mockNewPassword = "newPassword";

    prismaService.user.findUnique = jest.fn().mockResolvedValue({
      id: mockUserId,
      password: "hashedPassword",
      salt: "randomSalt",
    });

    verifyPasswordService.execute = jest.fn().mockResolvedValue(true);
    hashPasswordService.execute = jest.fn().mockResolvedValue({
      hash: "newHashedPassword",
      salt: "newSalt",
    });

    const result = await updatePasswordService.execute({
      userId: mockUserId,
      Password: mockCurrentPassword,
      newPassword: mockNewPassword,
    });

    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockUserId },
    });
    expect(verifyPasswordService.execute).toHaveBeenCalledWith({
      password: mockCurrentPassword,
      salt: "randomSalt",
      hashedPassword: "hashedPassword",
    });
    expect(hashPasswordService.execute).toHaveBeenCalledWith({
      password: mockNewPassword,
    });
    expect(prismaService.user.update).toHaveBeenCalledWith({
      where: { id: mockUserId },
      data: { password: "newHashedPassword", salt: "newSalt" },
    });
    expect(result).toEqual({ message: "Password changed successfully" });
  });

  it("should throw UnauthorizedException if the user is not found", async () => {
    prismaService.user.findUnique = jest.fn().mockResolvedValue(null);

    await expect(
      updatePasswordService.execute({
        userId: randomUUID(),
        Password: "password",
        newPassword: "newPassword",
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it("should throw UnauthorizedException if current password is incorrect", async () => {
    prismaService.user.findUnique = jest.fn().mockResolvedValue({
      id: randomUUID(),
      password: "hashedPassword",
      salt: "randomSalt",
    });

    verifyPasswordService.execute = jest.fn().mockResolvedValue(false);

    await expect(
      updatePasswordService.execute({
        userId: randomUUID(),
        Password: "wrongPassword",
        newPassword: "newPassword",
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
