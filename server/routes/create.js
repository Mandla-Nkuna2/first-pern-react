const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/api/psl", async (req, res) => {
  try {
    const query = `
    INSERT INTO psl(team_name,played,points,goal_d)
    VALUES($1,$2,$3,$4)
    RETURNING *;
    `;

    const values = [
      req.body.team_name,
      req.body.played,
      req.body.points,
      req.body.goal_d,
    ];

    const { rows } = await db.query(query, values);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
