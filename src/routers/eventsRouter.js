const express = require('express');
// let sessionRepository = require('../db/repositories/sessionRepository');

const debug = require('debug')('app:events-router');

const eventsData = require('../data/events.json');
// const loadDB = require('../db/repositories/sessionRpository');

async function getEventsCollection() {

  let eventsCollection;

  try {
    const db = await loadDB();
    eventsCollection = db.collection('events');
  }
  catch(error) {
    debug(error);
  }

  return eventsCollection;
}


const eventsRouter = express.Router();

eventsRouter.get('/', async (req, res) => {
  // const sessions = await sessionRepository.findMany();
  // const sessions = sessionsData
  let events = null;
  try {
    /* const collection = await getEventsCollection;
    // debug('Returned events collection object', collection);
    events = await collection.find().toArray(); */
    events = eventsData;
    debug(`Found ${events.length} events in Mongo DB`);
    res.json(events);;
  }
  catch(error) {
    debug(error);
  }
});

eventsRouter.post('/*', (req, res) => {
  const event = req.body;
  debug(`Received a new post request for a new event ${JSON.stringify(event)}`);
  res.status(201).json(event);
});

/* sessionsRouter.get('/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;
  debug(`Requested session id: ${sessionId}`);
  // res.json(sessionsData[sessionId]);
  
  let session;
  try {
    const collection = await getSessionsCollection();
    // debug('Returned sessions collection object', collection);
    session = await collection.findOne();
    debug(`Found session in DB: ${session}`);
    res.render('session', {
      session: session
    });
  }
  catch(error) {
    debug(error);
  }
}); */

module.exports = eventsRouter;