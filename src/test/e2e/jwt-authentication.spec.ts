import { randomUUID } from "node:crypto";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "../../main.module";
import { FakeFactoryModule } from "../../modules/fake-factory.module";
import { FakeFactoryService } from "../../services/fake-factory.service";

describe("E2E - JwtAuthentication", () => {
  let app: INestApplication<App>;
  let fakeFactoryService: FakeFactoryService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, FakeFactoryModule],
    }).compile();

    jwtService = moduleFixture.get(JwtService);
    fakeFactoryService = moduleFixture.get(FakeFactoryService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("should register a new user", async () => {
    const payload = {
      email: `${randomUUID()}@mail.com`,
      password: "123456",
    };
    const response = await request(app.getHttpServer())
      .post("/auth/register")
      .send(payload)
      .expect(201);

    expect(response.body.jwt).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.email).toBeDefined();

    expect(response.body.user.salt).not.toBeDefined();
    expect(response.body.user.password).not.toBeDefined();
  });

  it("should login a new user", async () => {
    const payload = {
      email: `${randomUUID()}@mail.com`,
      password: "123456",
    };

    const { user } = await fakeFactoryService.generateUser(payload);

    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: user.email, password: payload.password })
      .expect(201);

    expect(response.body.jwt).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.email).toBeDefined();

    expect(response.body.user.salt).not.toBeDefined();
    expect(response.body.user.password).not.toBeDefined();
  });

  it("should guard private router", async () => {
    await request(app.getHttpServer()).get("/health-check/private").expect(401);
  });

  it("should allow authorized user in private route", async () => {
    const { jwt } = await fakeFactoryService.generateUser();

    await request(app.getHttpServer())
      .get("/health-check/private")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200)
      .expect("Hello World!");
  });

  it("should not allow user in private route with wrong jwt", async () => {
    const jwt = await jwtService.sign({}, { secret: "wrong-secret" });

    await request(app.getHttpServer())
      .get("/health-check/private")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(401);
  });

  it("should not allow user in private route with wrong secret signature", async () => {
    const outerJwtService = new JwtService();

    const payload = {
      email: `${randomUUID()}@mail.com`,
      password: "123456",
    };

    const { user } = await fakeFactoryService.generateUser(payload);

    const jwt = await outerJwtService.sign(
      { userId: user.id, email: user.email },
      { secret: "wrong-wrong-secret", algorithm: "HS256" },
    );

    await request(app.getHttpServer())
      .get("/health-check/private")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(401);
  });

  it("should not allow user in private route with none algorithm", async () => {
    const payload = {
      email: `${randomUUID()}@mail.com`,
      password: "123456",
    };

    const { user } = await fakeFactoryService.generateUser(payload);

    const jwt = await jwtService.sign(
      { userId: user.id, email: user.email },
      { algorithm: "none" },
    );

    await request(app.getHttpServer())
      .get("/health-check/private")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(401);
  });
});
