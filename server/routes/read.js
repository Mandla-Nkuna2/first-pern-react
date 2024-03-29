const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/api/psl/:id", async (req, res) => {
  try {
    const query = `
    SELECT * FROM psl
      WHERE team_id = $1;
      `;

    const values = [req.params.id];
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
