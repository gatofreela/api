import { Test } from "@nestjs/testing";
import { PrismaService } from "../services/prisma.service";
import { SendMailService } from "../services/send-mail.service";
import { randomUUID } from "node:crypto";

describe("SendMailService", () => {
  let prismaService: PrismaService;
  let sendMailService: SendMailService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, SendMailService],
    }).compile();

    sendMailService = moduleRef.get(SendMailService);
  });

  it("should ", async () => {
    const user = await sendMailService.execute({
    
    });

    // Test here ...
  });
});
