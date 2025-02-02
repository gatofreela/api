import { Injectable } from "@nestjs/common";

@Injectable()
export class HealtCheckService {
  getHello(): string {
    return "Hello World!";
  }
}
