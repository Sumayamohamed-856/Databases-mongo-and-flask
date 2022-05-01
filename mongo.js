db.createUser({
    user: 'mustafa',
    pwd: 'password',
    customData: { startDate: new Date() },
    roles: [
      { role: 'clusterAdmin', db: 'admin' },
      { role: 'readAnyDatabase', db: 'admin' },
      'readWrite'
    ]
  })

// db.getUsers() to see users
// db.dropUser('jon') to delete

// How to Create a MongoDB Collection

db.createCollection('books')
// { "ok" : 1 }

// show collections

// Guide to Inserting Documents into a MongoDB Collection

db.books.insert({
    "name": "OOP Programming",
    "publishedDate": new Date(),
    "authors": [
      {"name": "Jon Snow jr"},
      {"name": "Ned Stark"}
    ]
  })


// How to Insert Many Documents into a MongoDB Collection

db.books.insertMany([
    {
      "name": "Confident Ruby",
      "publishedDate": new Date(),
      "authors": [
        { "name": "Avdi Grimm" }
      ]
    },
    {
      "name": "The War of Art",
      "publishedDate": new Date(),
      "authors": [
        {"name": "Steven Pressfield"}
      ]
    },
    {
      "name": "Blink",
      "publishedDate": new Date(),
      "authors": [
        {"name": "Malcolm Gladwell"}
      ]
    }
  ])


// How to Query All Documents in a MongoDB Collection with the find() Method

db.books.find().pretty()

// How to Query for Specific Documents in a MongoDB Collection

db.books.find( {name: "OOP Programming"} ).pretty()


// Introduction to MongoDB Projections

db.books.find(
    {
      name: "Confident Ruby"
    },
    {
      name: 1,
      publishedDate: 1,
      authors: 1
    }
  ).pretty()

// By default

  db.books.find(
    {
      name: "Confident Ruby"
    },
    {
      _id: 0,
      name: 1,
      authors: 1
    }
  ).pretty()


// Query for a Portion of a Nested Array Element in a Document Using $slice

db.books.insert({
    "name": "Blink",
    "publishedDate": new Date(),
    "authors": [
      { "name": "Malcolm Gladwell" },
      { "name": "Ghost Writer" }
    ]
  })

db.books.find(
    {
      name: "Blink"
    },
    {
      publishedDate: 1,
      name: 1,
      authors: { $slice: 1 }
    }
  ).pretty()

// slice -1: last one, slice 2: two items


// How to Delete Documents in MongoDB

db.books.remove({name: "OOP Programming"}, 1) // Removes a single document
db.books.remove({name: "OOP Programming"}) // Removes all documents
db.books.find({name: "OOP Programming"})  


// How to Include Nested Fields in a find Query

db.books.insert({
    "name": "Blink",
    "publishedDate": new Date(),
    "authors": [
        { "name": "Malcolm Gladwell", "active": "true" },
        { "name": "Ghost Writer", "active": "true" }
    ]
});

db.books.find(
    {
      name: "Blink"
    },
    {
      name: 1,
      publishedDate: 1,
      "authors.name": 1
    }
  ).pretty()


// Using the findOne Method in MongoDB to Query for a Single Document

db.books.find({name: "Blink"})
db.books.find({name: "Blink"}).length()
db.books.findOne({name: "Blink"})

// How to Query for a Portion of a String in a MongoDB Document

db.books.insert({
    "name": "Deep Work: Rules for Focused Success in a Distracted World",
    "publishedDate": new Date(),
    "authors": [
        {"name": "Cal Newport"}
    ]
});

db.books.findOne({ name: /.*deep work.*/i })


// How to Check if a Field Exists in a MongoDB Document

db.books.insert( 
    {
      "name": "Deep Work: Rules for Focused Success in a Distracted World",
      "publishedDate": new Date(),
      "reviews": 100,
      "authors": [
        {"name": "Cal Newport"}
      ]
    }
  )

db.books.find({ reviews: { $exists: true } })
db.books.find({ reviews: { $exists: false } })