import { pbkdf2Sync, randomBytes } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { z } from "zod";

@Injectable()
export class HashPasswordService {
  static get inputSchema() {
    return z.object({
      password: z.string(),
    });
  }

  private validateInput(input: unknown) {
    const { data, error } = HashPasswordService.inputSchema.safeParse(input);
    if (error)
      throw new Error(error.errors.flatMap((e) => e.message).join("\n"));
    return data;
  }

  async execute(input: z.infer<typeof HashPasswordService.inputSchema>) {
    const validatedInput = this.validateInput(input);

    const salt = randomBytes(16).toString("hex"); // Gera um salt aleatório
    const hash = pbkdf2Sync(
      validatedInput.password,
      salt,
      10000,
      64,
      "sha512",
    ).toString("hex");

    return {
      salt,
      hash,
    };
  }
}
