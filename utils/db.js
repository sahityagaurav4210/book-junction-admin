const mongoClient = require('mongodb').MongoClient;

async function connect(databaseUrl) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(databaseUrl, (error, database) => {
      if (error) reject(error);
      else resolve(database);
    });
  });
}

async function find(databaseRef, queryObject) {
  return new Promise(async (resolve, reject) => {
    if (databaseRef) {
      const database = databaseRef.db(process.env.DATABASE_NAME);
      const collection = database.collection('books');

      const results = await collection.find(queryObject).toArray();

      return resolve(results);
    } else return reject('No database ref passed..');
  });
}

async function findOne(databaseRef, collName, queryObject) {
  return new Promise(async (resolve, reject) => {
    if (databaseRef) {
      const database = databaseRef.db(process.env.DATABASE_NAME);
      const collection = database.collection(collName);

      const results = await collection.findOne(queryObject);

      return resolve(results);
    } else return reject('No database ref passed..');
  });
}

async function findAndUpdate(databaseRef, collName, queryObject = {}, objToUpdate = {}) {
  return new Promise(async (resolve, reject) => {
    if (databaseRef) {
      const database = databaseRef.db(process.env.DATABASE_NAME);
      const collection = database.collection(collName);

      const results = await collection.findOneAndUpdate(queryObject, objToUpdate, { new: true });

      return resolve(results);
    } else return reject('No database ref passed..');
  });
}

async function update(databaseRef, collName, queryObject = {}, objToUpdate = {}) {
  return new Promise(async (resolve, reject) => {
    if (databaseRef) {
      const database = databaseRef.db(process.env.DATABASE_NAME);
      const collection = database.collection(collName);

      const results = await collection.update(queryObject, objToUpdate);

      return resolve(results);
    } else return reject('No database ref passed..');
  });
}

async function insert(databaseRef, record) {
  return new Promise(async (resolve, reject) => {
    const database = databaseRef.db(process.env.DATABASE_NAME); // Getting the required database
    const books = database.collection('books'); // Getting the required table or collection...

    const result = await books.insertOne(record);

    if (result) return resolve(result);
    else return reject(`Couldn't insert a record at this moment, please try again after  sometime.`);
  });
}

async function insertMany(databaseRef, record) {
  return new Promise(async (resolve, reject) => {
    const database = databaseRef.db(process.env.DATABASE_NAME); // Getting the required database
    const books = database.collection('books'); // Getting the required table or collection...

    const result = await books.insertMany(record);

    if (result) return resolve(result);
    else return reject(`Couldn't insert a record at this moment, please try again after  sometime.`);
  });
}

module.exports = { connect, find, insert, insertMany, findOne, update, findAndUpdate };
