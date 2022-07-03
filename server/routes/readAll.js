const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/api/psl", async (req, res) => {
  try {
    const query = `
    SELECT * FROM psl
    ORDER BY points;
    `;
    const { rows } = await db.query(query);
    res.json({ results: rows.length, rows });
    // const rows = [
    //   {
    //     address: "Address",
    //     city: "City",
    //     firstname: "FirstName",
    //     team_name: "team_name",
    //     team_id: 101,
    //   },
    //   {
    //     address: "Address",
    //     city: "City",
    //     firstname: "FirstName",
    //     team_name: "team_name",
    //     team_id: 102,
    //   },
    // ];
    // res.json({ results: rows.length, rows });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
