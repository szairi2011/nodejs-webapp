/* 
  This router is created to initiatialize database creation and collections initializations
*/
const express = require("express");
const debug = require("debug")("app:admin-router");
const eventsData = require("../data/events2.json");
const sessionsData = require("../data/sessions.json");
const loadDB = require("../db/repositories/sessionRpository");
debug("Creating admin router ...");
const adminRouter = express.Router();

async function initCollection(collectionName, collData) {
  
  let response;

  try {
    const db = await loadDB();
    const collection = db.collection(collectionName);
    response = await collection.insertMany(collData);
  } catch (error) {
    debug(error.stack);
  }
  return response;
}

adminRouter.get("/", async (req, res) => {
  try {
    const db = await loadDB();
    // Create "events "collection if it does not exist otherwise it will throw an error
    const insertedEvents = await initCollection("events", eventsData);
    debug(`Inserted ${insertedEvents.insertedCount} events into DB collection name "events"`);
    
    const insertedSessions = await initCollection("sessions", sessionsData);
    debug(`Inserted ${insertedSessions.insertedCount} sessions into DB collection name "sessions"`);

    res.json({
      insertedEventsCount:  insertedEvents.insertedCount,
      insertedSessionsCount:  insertedSessions.insertedCount
    });
  } catch (error) {
    debug(error.stack);
  }
});

module.exports = adminRouter;
