const express = require('express');
// let sessionRepository = require('../db/repositories/sessionRepository');

const debug = require('debug')('app:sessions-router');

// const sessionsData = require('../data/sessions.json');
const loadDB = require('../db/repositories/sessionRpository');

async function getSessionsCollection() {

  let sessionsCollection;

  try {
    const db = await loadDB();
    sessionsCollection = db.collection('sessions');
  }
  catch(error) {
    debug(error);
  }

  return sessionsCollection;
}


const sessionsRouter = express.Router();

sessionsRouter.get('/', async (req, res) => {
  // const sessions = await sessionRepository.findMany();
  // const sessions = sessionsData
  let sessions = null;
  try {
    const collection = await getSessionsCollection();
    // debug('Returned sessions collection object', collection);
    sessions = await collection.find().toArray();
    debug(`Found ${sessions.length} sessions in Mongo DB`);
    res.render('sessions', {
      sessions: sessions
    });
    // res.json(sessions);;
  }
  catch(error) {
    debug(error);
  }
});

sessionsRouter.get('/:sessionId', async (req, res) => {
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
});

module.exports = sessionsRouter;