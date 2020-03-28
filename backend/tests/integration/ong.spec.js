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

describe("OngController()", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe("index()", () => {
    it("should return a list of ONGs", async () => {
      // Popula o banco com 10 ONGs
      for (let i = 0; i < 10; i += 1) {
        const ongData = {
          name: faker.company.companyName(),
          email: faker.internet.email(),
          whatsapp: faker.random.number({ min: 1111111111, max: 99999999999 }),
          city: faker.address.city(),
          uf: faker.address.stateAbbr()
        };

        await request(app)
          .post("/ongs")
          .send(ongData);
      }

      const listOngs = await request(app).get("/ongs");

      expect(listOngs.statusCode).toBe(200);
      expect(listOngs.body.length).toBe(10);
    });
  });

  describe("store()", () => {
    it("should be able to create a new ONG", async () => {
      const createOng = await request(app)
        .post("/ongs")
        .send(ongObject);

      expect(createOng.statusCode).toBe(200);
      expect(createOng.body).toHaveProperty("id");
      expect(createOng.body.id).toBeDefined();
      expect(createOng.body.id).toHaveLength(8);
    });

    it("should return an error if the data isnt valid", async () => {
      const createOng = await request(app)
        .post("/ongs")
        .send({ ...ongObject, email: "contato" });

      expect(createOng.body.statusCode).toBe(400);
      expect(createOng.body.message).not.toBeNull();
    });
  });
});
