//mongoimport --headerline --ignoreBlanks --type=csv -d mydb -c mockdata -h localhost chapter_2_mock_data.csv

db.getSiblingDB("mydb");
db.mockdata.find(
    {city:"Singapore"}
).explain("executionStats");

//indexing
db.mockdata.createIndex(
    {city:1},
    {name: "city_index"}
);
//index 생성후 다시 executionStats를 살펴본다.
db.mockdata.find(
    {city:"Singapore"}
).explain("executionStats");

db.mockdata.stats().totalIndexSize;
db.mockdata.stats().indexSizes;
//위 stats()는 아래와 같다.
db.mockdata.runCommand('collstats')
db.mockdata.reIndex('city_index');

/*
 * Compound Index example
 * 
*/
db.mockdata.find(
    {city:"Boston", first_name: "Sara"}
).explain("executionStats").executionStats;

//기존 index drop 후 compound Index 생성
db.mockdata.dropIndex("city_index");
db.mockdata.createIndex({city:1,first_name:1});
db.mockdata.find(
    {city:"Boston", first_name: "Sara"}
).explain("executionStats").executionStats;
//covered query의 효과.
db.mockdata.find(
    {city:'Boston', first_name:'Sara'},
    {city:1, first_name:1, _id:0}
).explain("executionStats").executionStats;

/*
 * Indexing Background
 */
db.mockdata.dropIndexes(); //index 전체 다 지움
//200만 건 더 add 하는 shell script임. bash에서 실행.
//for x in $(seq 20);
//do
//    mongoimport --headerline --type=csv -d mydb -c mockdata chapter_2_mock_data.csv;
//done

//두 개의 mongo shell을 열어서
//하나에서는
db.mockdata.createIndex(
    {city:1, first_name:1, last_name:1}
);
//다른 shell에서는
db.mockdata.insertOne({foo:'bar'});
//insertOne이 기다리는 것을 알 수 있다.

db.mockdata.dropIndexes();
db.mockdata.createIndex(
    {city:1, first_name:1, last_name:1},
    {background:1}
);

/*
 * TTL based Index
 */
db.ttlcol.drop();
//200개의 시간 variation이 있는 문서 생성
for ( var x = 1; x <= 100; x++) {
    var past = new Date();
    past.setSeconds(past.getSeconds() - 60*x);
    var doc = {
        foo: "bar",
        timestamp: past
    };
    db.ttlcol.insertOne(doc);

    var future = new Date();
    future.setSeconds(future.getSeconds() + 60*x);
    doc = {
        foo:"bar",
        timestamp: future
    };
    db.ttlcol.insertOne(future);
};

db.ttlcol.createIndex(
    {timestamp:1},
    {expireAfterSeconds:10}
);

/*
 * Sparse Index
 */
db=db.getSiblingDB("mydb");
db.mockdata.count(); //2만건 정도
db.mockdata.find(
    {language:{$eq:null}}
).count(); //12700건 정도
db.mockdata.createIndex(
    {language:1},
    {sparse: true}
);
db.mockdata.find(
    {language:"French"}
).explain("executionStats").executionStats;

/*
 * Partial Index
 */
db.mockdata.find().count();
db.mockdata.find(
    {language:{$eq:null}}
).count();
db.mockdata.createIndex(
    {first_name:1},
    {partialFilterExpression:{language:{$exists:true}}}
);
//COLLSCAN
db.mockdata.find({first_name: 'Sara'}).explain('executionStats').executionStats;
db.mockdata.find(
    {first_name:"Sara", language:"Spanish"}
).explain("executionStats").executionStats;
//Sparse Index의 위 샘플은 아래의 partial index와 같다.
db.mockdata.createIndex(
    {language:1},
    {partialFilterExpression: {language:{$exists:true}}}
);

/*
 * Unique Index
 */
db.testuniq.insert(
    {foo:"zoidberg"}
);
db.testuniq.createIndex(
    {foo:1},
    {unique:1}
);
db.testuniq.insert({foo: 'zoidberg'}); //wll raise error