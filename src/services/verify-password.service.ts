import { pbkdf2Sync } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { z } from "zod";

@Injectable()
export class VerifyPasswordService {
  static get inputSchema() {
    return z.object({
      password: z.string(),
      salt: z.string(),
      hashedPassword: z.string(),
    });
  }

  private validateInput(input: unknown) {
    const { data, error } = VerifyPasswordService.inputSchema.safeParse(input);
    if (error)
      throw new Error(error.errors.flatMap((e) => e.message).join("\n"));
    return data;
  }

  async execute(input: z.infer<typeof VerifyPasswordService.inputSchema>) {
    const validatedInput = this.validateInput(input);

    const { hashedPassword, salt, password } = validatedInput;

    const hashToCompare = pbkdf2Sync(
      password,
      salt,
      10000,
      64,
      "sha512",
    ).toString("hex");

    return hashedPassword === hashToCompare;
  }
}
