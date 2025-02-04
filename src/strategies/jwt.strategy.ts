import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../services/prisma.service";
import { JwtContent } from "../types/jwt-content";
import { env } from "../utils/config/env";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
      algorithms: ["HS256"],
    });
  }

  async validate(payload: JwtContent) {
    const { userId, email } = payload;

    if (!userId || !email) {
      throw new UnauthorizedException();
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId, email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
