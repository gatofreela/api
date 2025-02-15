import { randomUUID } from "node:crypto";
import { Test } from "@nestjs/testing";
import { PrismaService } from "../../services/prisma.service";
import { SendMailService } from "../../services/send-mail.service";

describe("SendMailService", () => {
  let prismaService: PrismaService;
  let sendMailService: SendMailService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, SendMailService],
    }).compile();

    sendMailService = moduleRef.get(SendMailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // skiped real testing
  it.skip("should send mail", async () => {
    await sendMailService.execute({
      from: "from@resend.dev",
      to: ["gatofreela@gmail.com"],
      content: "Testing mail",
      subject: "Testing mail",
    });

    expect(true).toBeTruthy();
  });
});
