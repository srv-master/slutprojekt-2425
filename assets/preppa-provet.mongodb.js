/* global use, db */
// MongoDB Playground

const database = "prov";
const collection = "cats";

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);

// Create a new document in the collection.
db.getCollection("cats").insertMany([
  {
    name: "Iggy",
    age: 7,
    race: "Street corner",
    category: 2
  },
  {
    name: "Jiro",
    age: 2,
    race: "Japanese Demon",
    category: 3
  },
  {
    name: "Aisha",
    age: 17,
    race: "Demigodess",
    category: 3
  },
  {
    name: "Majsan",
    age: 4,
    race: "Bondkatt",
    category: 1
  },
]);
