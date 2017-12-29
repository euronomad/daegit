var connectTo = function(dbname,port) {
    if (!dbname) {
        dbname = "test";
    }
    if (!port) {
        port=27017;
    }
    db = connect("localhost:"+port+"/"+dbname);
    return db;
};