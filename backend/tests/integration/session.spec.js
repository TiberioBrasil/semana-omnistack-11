const faker = require("faker/locale/pt_BR");
const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

// Cria uma ONG com dados aleatórios
const ongObject = {
  name: faker.company.companyName(),
  email: faker.internet.email(),
  whatsapp: faker.random.number({ min: 1111111111, max: 99999999999 }),
  city: faker.address.city(),
  uf: faker.address.stateAbbr()
};

describe("SessionController", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe("store()", () => {
    it("should be able to create a new Session", async () => {
      const createOng = await request(app)
        .post("/ongs")
        .send(ongObject);

      const ongId = createOng.body.id;

      const createSession = await request(app)
        .post("/sessions")
        .send({ id: ongId });

      expect(createSession.statusCode).toBe(200);
      expect(ongId).toHaveLength(8);
      expect(createSession.body).toHaveProperty("name");
      expect(createSession.body.name).toEqual(ongObject.name);
    });

    it("should return an error if the ONG ID isnt valid", async () => {
      const createSession = await request(app)
        .post("/sessions")
        // .send({ id: faker.random.hexaDecimal(8) });
        .send({ id: "a1b2c3d4" });

      expect(createSession.statusCode).toBe(400);
    });
  });
});
