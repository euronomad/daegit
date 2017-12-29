db.movies.deleteOne(
    {"_id":2}
);

db.movies.drop();

db.movies.insertMany(
    [
        { "_id" : 0, "title" : "Top Gun", "year" : 1986 },
        { "_id" : 1, "title" : "Back to the Future", "year" : 1985 },
        { "_id" : 3, "title" : "Sixteen Candles", "year" : 1984 },
        { "_id" : 4, "title" : "The Terminator", "year" : 1984 },
        { "_id" : 5, "title" : "Scarface", "year" : 1983 }
    ]
);

db.movies.deleteMany({"year":1984});