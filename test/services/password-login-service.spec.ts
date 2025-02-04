import { Test } from "@nestjs/testing";
import { PrismaService } from "../../src/services/prisma.service";
import { PasswordLoginService } from "../../src/services/password-login.service";
import { randomUUID } from "node:crypto";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { VerifyPasswordService } from "../../src/services/verify-password.service";
import { FakeFactoryModule } from "../../src/modules/fake-factory.module";
import { FakeFactoryService } from "../../src/services/fake-factory.service";
import { env } from "../../src/utils/config/env";

describe("Password LoginService", () => {
  let prismaService: PrismaService;
  let passwordLoginService: PasswordLoginService;
  let jwtService: JwtService;
  let fakeFactoryService: FakeFactoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        FakeFactoryModule,
        JwtModule.register({
          secret: env.JWT_SECRET,
          secretOrPrivateKey: env.JWT_SECRET,
        }),
      ],
      providers: [PrismaService, PasswordLoginService, VerifyPasswordService],
    }).compile();

    passwordLoginService = moduleRef.get(PasswordLoginService);
    jwtService = moduleRef.get(JwtService);
    fakeFactoryService = moduleRef.get(FakeFactoryService);
  });

  it("should sign jwt", async () => {
    const { user } = await fakeFactoryService.generateUser({
      password: "password",
    });

    const { user: signedUser, jwt } = await passwordLoginService.execute({
      email: user.email,
      password: "password",
    });

    const decoded = jwtService.decode(jwt);
    expect(decoded).toHaveProperty("userId");
    expect(decoded).toHaveProperty("email");

    expect(signedUser.id).toBe(decoded.userId);
    expect(signedUser.email).toBe(decoded.email);
    expect(signedUser.password).toBeNull();
  });
});
