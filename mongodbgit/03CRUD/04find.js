// Generated by CoffeeScript 1.6.3
var insertUsers;

insertUsers = function() {
  var birthday, i, _i, _results;
  db.users.drop();
  _results = [];
  for (i = _i = 5; _i <= 60; i = ++_i) {
    birthday = new Date('01/01/' + (2014 - i));
    _results.push(db.users.insert({
      name: 'yong' + i,
      birthday: birthday,
      age: i
    }));
  }
  return _results;
};

insertUsers();

db.users.find({
  age: {
    $gte: 18,
    $lte: 30
  }
});

db.users.find({
  birthday: {
    $lt: new Date('01/01/1970')
  }
});

db.users.find({
  age: {
    $ne: 8
  }
});

db.users.find({
  age: {
    $in: [8, 11, 33, 99]
  }
});

db.users.find({
  age: {
    $nin: [8, 11, 33, 99]
  }
});

db.users.find({
  $or: [
    {
      age: {
        $in: [8, 13, 14]
      }
    }, {
      name: 'yong45'
    }
  ]
});

//아래와 같이 modifier는 같은 key에 대해서 여러번 쓸 수 없다.
db.users.updateOne(
    {name:"yong5"},
    {$inc: {"age":1}, $set: {"age":40}}
);

//아래의 query와 같이 $and도 metaconditional operator이다.
db.users.find({"$and" : [{"x" : {"$lt" : 1}}, {"x" : 4}]});
//위는 아래와 같지만 아래가 더 효율적이다.
db.users.find({x: {$lt:1, $in:[4]}});

db.c.find({"y" : null});

//정규식
db.users.insertMany(
    [
        {"name" : "조민수", "birthday" : new Date("01/01/2007"), "age" : 20},
        {"name" : "조용수", "birthday" : new Date("01/01/2007"), "age" : 20}
    ]   
);
db.users.find({name:{$regex:"조[민용]수"}});
db.users.find({name:{$regex:"조[가-힣]수"}});

//array
db.food.insertOne({"fruit" : ["apple", "banana", "peach"]});
db.food.find({"fruit" : "banana"}); //결과가 나오지만
db.food.find({"fruit":["banana"]}); //결과가 나오지 않는다.
db.food.find({"fruit":["apple","banana","peach"]}); //나온다.
db.food.find({"fruit":["peach","banana","apple"]}); //안나온다.
db.food.find({fruit:"banana",fruit:"apple"}) //나온다.

db.food.insertMany(
    [
        {"fruit" : ["apple", "kumquat", "orange"]},
        {"fruit" : ["cherry", "banana", "apple"]}
    ]
);
db.food.find({fruit: {$all:["apple","peach"]}});
//이렇게 위치를 정확하게 쓸 수도 있는데, 중요한 것은 index를 쓸 때에는 따옴표를 붙여야 한다.
db.food.find({"fruit.2":"peach"}); 
db.food.insertMany(
    [
        {"fruit" : ["자두", "망고"]}
    ]
);
db.food.find({fruit:{$size:2}}); //array size로 찾기
//그런데 size는 $gt 같은 operator와 함께 쓸 수가 없기 때문에 array length가 2보다 큰 것 같은 것은 찾을 수가 없다.
//따라서 document에 "size"라는 key를 만들어서 유지하는 것이 하나의 방법이다.

//array range query
db.x.insertMany(
    [
        {x:5},
        {x:15},
        {x:25},
        {x:[10,25]}
    ]
);
db.x.find(
    {x:{$gt:10,$lt:20}}
); //이렇게 query하면 [10,25]도 나오게 된다.
db.x.find(
    {x:{$elemMatch: {$gt:10,$lt:20}}}
); //이렇게 하면 [10,25]는 나오지 않지만 x가 array가 아닌 document는 또 나오지 않는다.
db.x.find(
    {x:{$gt:10,$lt:20}}
).min({x:10}).max({x:20});//원하는 결과가 나온다. 그렇지만 먼저 index생성이 필요.

//query embedded documents
db.users.drop();
db.users.insertOne(
    {"name":{
        "first":"Joe",
        "last":"Jack"
        },
        "age":45
    }
);

db.users.find({name:{first:"Joe", last:"Jack"}}); //나옴
db.users.find({name: {first:"Joe"}}); //안나옴
db.users.find({name:{ last:"Jack",first:"Joe"}}); //안나옴
db.users.find({"name.first":"Joe"}); //이런식으로 dot notation을 쓰는 것이 좋음.
db.users.insertOne(
    {"name":{
        "first.middle":"Joe.Junior",
        "last":"Jack"
        },
        "age":45
    }
); 
//위와 같이 insert를 하고나면, query할 때 first.name을 쓰게 되면 first라는 property에 embedded된
//middle이라는 key를 찾으려고 할 것이기 때문에 이렇게도 안하는 것이 맞다.

db.blog.insertOne(
    {
        content: "Hello Mongodb",
        comments: [
            {
                author:"joe",
                score:3,
                comment: "nice post"
            },
            {
                author:"mary",
                score:6,
                comment: "terrible post"
            }
        ]
    }
);
db.blog.find(
    {comments:{
        author: "joe",
        score: {$lte:4},
        comment: "nice post"
    }}
); //결과가 나오지 않음.
db.blog.find(
    {"comments.author":"joe",
    "comments.score":{$gte:5}
    }
); //원하는 결과가 나오지 않음. joe이면서 점수가 5이상인 것이라고 생각했기 때문에 결과가 나오지 않아야 하지만 실제로는 나옴
db.blog.find(
    {comments:{$elemMatch:{
        author:"joe",
        score:{$gte:5}
    }}}
); //embedded document에 대해서는 dot notation으로 and 조건을 걸 수가 없고, 이것처럼 $elemMatch를 써야 한다.

//$where 절
db.foo.drop();
db.foo.insertMany(
    [
        {"apple" : 1, "banana" : 6, "peach" : 3},
        {"apple" : 8, "spinach" : 4, "watermelon" : 4}
    ]
);

db.foo.find(
    {
        $where: function() {
            for (var current in this) {
                for (var other in this) {
                    if (current != other && this[current] == this[other]) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
);

//server-side scripting
func = "function() { print('Hello, "+name+"!'); }"
//만약 name을 "'); db.dropDatabase(); 라고 주면?
//그래서 function을 아래와 같이 만들어야 한다.
func = pymongo.code.Code("function() { print('Hello, '+username+'!'); }",{"username": name});

//Cursor
for ( i = 0; i < 100; i++){
    db.collection.insertOne({x:i});
}
var cursor = db.collection.find();
cursor.forEach(function(x) {
    print(x.x);
});

var cursor = db.collection.find().sort({x:1}).limit(1).skip(10);
var cursor = db.collection.find().limit(1).sort({x:1}).skip(10);
var cursor = db.collection.find().skip(10).limit(1).sort({x:1});
cursor.forEach(function(x) {
    print(x.x);
});

//sort 순서
db.collection.drop();
db.collection.insertMany(
    [
        {x:2},
        {x:1},
        {x:null},
        {x:"5"},
        {x:{x:6}},
        {x:{x:"5"}},
        {x:["5"]}
    ]
);
db.collection.find().sort({x:1});

//skip 대안 예제. 날짜 property가 'registered'라는 이름으로 있다면,
//1. registered로 decending해서 가져와서..
var cursor = db.blog.post.find().sort({registered:-1}).limit(100);
//2. 뭔가 작업을 할 때 현재의 조건을 저장해 놓는다...
var latest = null;
while(cursor.hasNext()){ 
    latest = current;
    print(latest);
};
//3. 다시 가져올 때에는 현재의 조건을 filter에 넣어서 걸러낸다.
cursor = db.blog.post.find({registered: {$lt:latest.registered}}).sort({registered:-1}).limit(100);

//Find Random Document에서 아래와 같이 하면 안된다.
var count = db.myDocs.count();//여기에 filter라도 들어가면 더 안좋음.
var random = Math.floor(Math.random() * count);
var aDoc = db.myDocs.find().skip(random).limit(1); //데이타가 많은 경우 skip을 쓰면 안됨.
//trick인데, 아래처럼 문서를 넣을 때부터 random 값을 가지도록..
db.myDocs.insertMany(
    [
        {"name" : "doc1", "random" : Math.random()},
        {"name" : "doc2", "random" : Math.random()},
        {"name" : "doc3", "random" : Math.random()}
    ]
);
//random값이 이미 doc에 있으니..
var random = Math.random();
var result = db.myDocs.findOne({"random":{$gt : random}});
//혹시 재수가 없이 위 값이 없는 경우를 대비해서
if (result == null) {
    result = db.myDocs.findOne({"random":{$lte: random}});
}

var cursor = db.collection.find().sort({x:1}).showRecordId();
cursor.forEach(function(x){
    print(x);
});