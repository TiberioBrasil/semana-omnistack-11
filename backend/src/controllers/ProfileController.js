const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await connection("incidents")
      .where("ong_id", ong_id)
      .select("*");

    if (!incidents) {
      return res
        .status(401)
        .json({ error: "There are no incidents for this profile" });
    }

    return res.json(incidents);
  }
};
