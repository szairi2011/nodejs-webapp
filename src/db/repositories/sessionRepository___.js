const debug = require("debug");
const { Collection } = require("mongodb");
const sessionCollection = require("../connections/mongodb_conn");
// const { Collection } = require("mongodb");

class SessionRepository {

  SesssionRepository() {
    // Initiatlize db connection to sessions colection
    // this.collection = await this.init("globomantics", "sessions");
  }

  async init(dbName, collectionName) {
    return await sessionCollection(dbName, collectionName);
  }

  /* Insert a list of sessions */
  async insertMany(sessions) {
    const dbSessions = null;
    try {
      dbSessions = await this.collection.insertMany(sessions);
      if (dbSessions) debug(`Inserted ${dbSessions.length} sessions to database`);
    } catch (error) {
      debug(error);
    }
    return dbSessions;
  }

  /* Insert a single session to DB */
  async insertOne(session) {
    const dbSession = null;
    try {
      dbSession = await this.collection.insertOne(session);
      if (dbSession) debug(`Inserted a new session, where _id: ${dbSession._id}`);
    } catch (error) {
      debug(error);
    }
    return dbSession;
  }

  /* Get all sessions from DB */
  async findMany() {
    try {
      const sessions = await this.collection.find().toArray();
      if (sessions) {
        debug(`Found ${sessions.length} sessions in DB`);
      }
      return sessions;
    } catch (error) {
      debug(error);
      // throw error;
    }
    return sessions;
  }

  /* Get a specific session from DB */
  async findOne(id) {
    const session = null;
    try {
      session = await this.collection.findOne({_id:id});
      if (session) debug(`Found the session, where _id: ${session._id}`);
    } catch (error) {
      debug(error);
    }
    return session;
  }

}

module.exports = new SessionRepository();
