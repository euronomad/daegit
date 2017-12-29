db.movies.insertOne({"title" : "Stand by Me"});

db.movies.insertMany(
    [
        {"title":"Ghostbursts"},
        {"title":"E.T."},
        {"title":"Blade Runner"}
    ]
);

db.movies.insertMany(
    [
        {"_id" : 0, "title" : "Top Gun"},
        {"_id" : 1, "title" : "Back to the Future"},
        {"_id" : 1, "title" : "Gremlins"},
        {"_id" : 2, "title" : "Aliens"}
    ]
);

db.movies.insertMany(
    [
        {"_id" : 0, "title" : "Top Gun"},
        {"_id" : 1, "title" : "Back to the Future"},
        {"_id" : 1, "title" : "Gremlins"},
        {"_id" : 2, "title" : "Aliens"}
    ],
    {"ordered":false}
);

aMovie={"title" : "Stand by Me"};
Object.bsonsize(aMovie); //28byte나옴. 전쟁과평화 소설 full text는 3.14MB