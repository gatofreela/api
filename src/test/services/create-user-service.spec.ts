import { randomUUID } from "node:crypto";
import { Test } from "@nestjs/testing";
import { CreateUserService } from "../../services/create-user.service";
import { PrismaService } from "../../services/prisma.service";

describe("Prisma service", () => {
  let prismaService: PrismaService;
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, CreateUserService],
    }).compile();

    createUserService = moduleRef.get(CreateUserService);
  });

  it("Implements connection", async () => {
    const email = `test${randomUUID()}@mail.com`;
    const user = await createUserService.execute({
      email,
      role: "USER",
    });

    expect(user.email).toBe(email);
  });
});
