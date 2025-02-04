import { Test } from "@nestjs/testing";
import { PrismaService } from "../../src/services/prisma.service";
import { PasswordRegisterService } from "../../src/services/password-register.service";
import { randomUUID } from "node:crypto";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { HashPasswordService } from "../../src/services/hash-password.service";
import { faker } from "@faker-js/faker";
import { env } from "../../src/utils/config/env";

describe("Password RegisterService", () => {
  let prismaService: PrismaService;
  let passwordRegisterService: PasswordRegisterService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, PasswordRegisterService, HashPasswordService],
      imports: [
        JwtModule.register({
          secret: env.JWT_SECRET,
          secretOrPrivateKey: env.JWT_SECRET,
        }),
      ],
    }).compile();

    passwordRegisterService = moduleRef.get(PasswordRegisterService);
    jwtService = moduleRef.get(JwtService);
  });

  it("should sign jwt", async () => {
    const { jwt, user } = await passwordRegisterService.execute({
      email: `${randomUUID()}${faker.internet.email()}`,
      password: faker.internet.password(),
    });

    const decoded = jwtService.decode(jwt);
    expect(decoded).toHaveProperty("userId");
    expect(decoded).toHaveProperty("email");

    expect(user.id).toBe(decoded.userId);
    expect(user.email).toBe(decoded.email);
    expect(user.password).toBeNull();
  });
});
