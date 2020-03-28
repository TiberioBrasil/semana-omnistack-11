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

// Cria um Incidente com dados aleatórios
const incidentObject = {
  title: faker.lorem.words(),
  description: `${faker.lorem.words()} \
${faker.lorem.words()} \
${faker.lorem.words()} \
${faker.lorem.words()}`,
  value: faker.random.number({ min: 100, max: 999 })
};

describe("IncidentController()", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe("index()", () => {
    it("should return a list of Incidents", async () => {
      for (let countOng = 0; countOng < 10; countOng++) {
        const createOng = await request(app)
          .post("/ongs")
          .send({
            name: faker.company.companyName(),
            email: faker.internet.email(),
            whatsapp: faker.random.number({
              min: 1111111111,
              max: 99999999999
            }),
            city: faker.address.city(),
            uf: faker.address.stateAbbr()
          });

        const ongId = createOng.body.id;

        for (let countIncident = 0; countIncident < 10; countIncident++) {
          await request(app)
            .post("/incidents")
            .set("authorization", ongId)
            .send({
              title: faker.lorem.words(),
              description: `${faker.lorem.words()} \
    ${faker.lorem.words()} \
    ${faker.lorem.words()} \
    ${faker.lorem.words()}`,
              value: faker.random.number({ min: 100, max: 999 })
            });
        }
      }

      const listIncidents1 = await request(app).get("/incidents?page=1");

      expect(listIncidents1.statusCode).toBe(200);
      expect(listIncidents1.body.length).toBe(5);
      expect(listIncidents1.header["x-total-count"]).toBe("100");

      const listIncidents2 = await request(app).get("/incidents?page=20");

      expect(listIncidents2.statusCode).toBe(200);
      expect(listIncidents2.body.length).toBe(5);
      expect(listIncidents2.header["x-total-count"]).toBe("100");

      const listIncidents3 = await request(app).get("/incidents?page=21");

      expect(listIncidents3.statusCode).toBe(200);
      expect(listIncidents3.body.length).toBe(0);
      expect(listIncidents3.header["x-total-count"]).toBe("100");
    });
  });

  describe("store()", () => {
    it("should be able to create a new Incident", async () => {
      const createOng = await request(app)
        .post("/ongs")
        .send(ongObject);

      const ongId = createOng.body.id;

      const createIncident = await request(app)
        .post("/incidents")
        .set("authorization", ongId)
        .send(incidentObject);

      expect(createIncident.statusCode).toBe(200);
      expect(createIncident.body).toHaveProperty("id");
      expect(typeof createIncident.body.id).toBe("number");
    });

    it("should return an error if the user has no authorization", async () => {
      const createIncident = await request(app)
        .post("/incidents")
        .send(incidentObject);

      expect(createIncident.body.statusCode).toBe(400);
      expect(createIncident.body.message).not.toBeNull();
    });

    it("should return an error if the data isnt valid", async () => {
      const createOng = await request(app)
        .post("/ongs")
        .send(ongObject);

      const ongId = createOng.body.id;

      const createIncident = await request(app)
        .post("/incidents")
        .set("authorization", ongId)
        .send({ ...incidentObject, value: "R$ 100,00" });

      expect(createIncident.body.statusCode).toBe(400);
      expect(createIncident.body.message).not.toBeNull();
    });
  });

  describe("delete()", () => {
    it("should delete an existing incident with proper authorization", async () => {
      const createOng = await request(app)
        .post("/ongs")
        .send(ongObject);

      const ongId = createOng.body.id;

      const createIncident = await request(app)
        .post("/incidents")
        .set("authorization", ongId)
        .send(incidentObject);

      const incidentId = createIncident.body.id;

      const deleteIncident = await request(app)
        .delete(`/incidents/${incidentId}`)
        .set("authorization", ongId);

      expect(deleteIncident.statusCode).toBe(204);
    });

    it("should return an error trying to delete an non existing incident", async () => {
      const createOng = await request(app)
        .post("/ongs")
        .send(ongObject);

      const ongId = createOng.body.id;

      await request(app)
        .post("/incidents")
        .set("authorization", ongId)
        .send(incidentObject);

      const deleteIncident = await request(app)
        .delete(`/incidents/10000`)
        .set("authorization", ongId);

      expect(deleteIncident.statusCode).toBe(401);
    });

    it("should return an error if the user has no authorization", async () => {
      const createOng = await request(app)
        .post("/ongs")
        .send(ongObject);

      const ongId = createOng.body.id;

      const createIncident = await request(app)
        .post("/incidents")
        .set("authorization", ongId)
        .send(incidentObject);

      const incidentId = createIncident.body.id;

      const deleteIncident = await request(app).delete(
        `/incidents/${incidentId}`
      );

      expect(deleteIncident.statusCode).toBe(400);
    });
  });
});
