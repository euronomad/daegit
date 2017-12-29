conn = new Mongo("localhost:27017")
db = conn.getDB("video");
movie={"title": "Star Wars: episode IV - a new hope",
       "director": "Jeorge Lucas",
       "year": 1977};

db.movies.insertOne(movie);
db.movies.find();
db.movies.findOne();

db.movies.update({"_id" : ObjectId("5a37485393b341e6ccb35ebd")},
{$set: {reviews: []}});
db.movies.findOne();

db.movies.deleteOne({"title" : "Star Wars: episode IV - a new hope"});
db.movies.deleteMany({"title" : "Star Wars: episode IV - a new hope"});

conn= new Mong("192.168.0.5:27013");
db = con.getDB("video");