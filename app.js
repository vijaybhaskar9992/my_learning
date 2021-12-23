const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");
app.use(express.json());
let db = null;

let dbToServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("The app is running on 3000");
    });
  } catch (e) {
    console.log(`DB Error : ${e.message}`);
    process.exit(1);
  }
};
dbToServer();

app.get("/players/", async (request, response) => {
  const getResults = `
    select * from cricket_team;`;
  const allResults = await db.all(getResults);
  response.send(allResults);
});

app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  const postQuery = `
  insert into cricket_team (player_name , jersey_number, role) values
  (
      '${playerName}',
      ${jerseyNumber},
      '${role}'
  );`;
  const dbResponse = await db.run(postQuery);
  const playerId = dbResponse.lastID;
  response.send({ player_id: playerId });
});

app.get("/", (request, response) => {});

app.get("/", (request, response) => {});

app.get("/", (request, response) => {});

module.exports = app;
