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

describe("ProfileController", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe("index()", () => {
    it("should be able to list incidents from a specific ONG with proper authorization", async () => {
      const createOng = await request(app)
        .post("/ongs")
        .send(ongObject);

      const ongId = createOng.body.id;

      for (let count = 0; count < 10; count++) {
        const incidentObject = {
          title: faker.lorem.words(),
          description: `${faker.lorem.words()} \
${faker.lorem.words()} \
${faker.lorem.words()} \
${faker.lorem.words()}`,
          value: faker.random.number({ min: 100, max: 999 })
        };

        await request(app)
          .post("/incidents")
          .set("authorization", ongId)
          .send(incidentObject);
      }

      const listProfile = await request(app)
        .get("/profile")
        .set("authorization", ongId);

      expect(listProfile.statusCode).toBe(200);
      expect(ongId).toHaveLength(8);
      expect(listProfile.body.length).toBe(10);
    });

    it("should return an error if the user has no authorization", async () => {
      const createOng = await request(app)
        .post("/ongs")
        .send(ongObject);

      const ongId = createOng.body.id;

      for (let count = 0; count < 10; count++) {
        const incidentObject = {
          title: faker.lorem.words(),
          description: `${faker.lorem.words()} \
${faker.lorem.words()} \
${faker.lorem.words()} \
${faker.lorem.words()}`,
          value: faker.random.number({ min: 100, max: 999 })
        };

        await request(app)
          .post("/incidents")
          .set("authorization", ongId)
          .send(incidentObject);
      }

      const listProfile = await request(app).get("/profile");

      expect(listProfile.body.statusCode).toBe(400);
      expect(listProfile.body.message).not.toBeNull();
    });
  });
});
