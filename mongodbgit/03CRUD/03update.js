db.users.insertOne(
    {
        "name": "joe",
        "friends": 32,
        "enemies": 2
    }
);

var joe = db.users.findOne({"name":"joe"}); //javascript variable로 데이타를 받아옴.
joe.relationship = {"friends": joe.friends, "enemies": joe.enemies}; //새로운 property relationship 생성
joe.username = joe.name; //새로운 property username 생성
//기존 property 모두 지움
delete joe.friends;
delete joe.enemies;
delete joe.name;
// 새로운 properties를 가진 joe도 대치
db.users.replaceOne({"name":"joe"}, joe);

//$inc 사용예제
db.users.drop();
db.users.insertOne(
    {
        "name": "joe",
        "friends": 32,
        "enemies": 2
    }
);
db.users.updateOne(
    {"name":"joe"},
    {"$inc": {"enemies":1}}
);

//$set 사용예제
db.users.drop();
db.users.insertOne(
    {
        "name":"joe",
        "age": 30,
        "sex": "male",
        "location": "Wisconsin"
    }
);
db.users.updateOne(
    {"name":"joe"},
    {"$set":{"favorite book":"War and Peace"}}
);
db.users.updateOne(
    {"name":"joe"},
    {"$set":{"favorite book":"Green Eggs and Ham"}}
);
//아래와 같이 기존 property의 type을 바꿀 수도 있음(string->array)
db.users.updateOne(
    {"name":"joe"},
    {"$set":{"favorite book":["Cat's Cradle", "Foundation Trilogy","Ender's Game"]}}
);
//$unset에서는 value는  1, "" 이던 아무런 의미 없음.
db.users.updateOne(
    {"name":"joe"},
    {"$unset":{"favorite book":1}}
);

//흔히 하는 실수
db.users.updateOne(
    {"name":"joe"},
    {"name":"john"}
);

//$push 샘플
db.getSiblingDB("test");
db.blog.posts.insertOne(
    {
        "title":"A blog post",
        "content":"Hello Mongodb!"
    }
);
db.blog.posts.updateOne(
    {"title":"A blog post"},
    {"$push":
        {"comments":
            {
                "name":"joe",
                "email":"joe@example.com",
                "content":"nice post."
            }
        }
    }
);
db.blog.posts.updateOne(
    {"title":"A blog post"},
    {"$push":
        {
            "comments":
                {
                    "name":"bob",
                    "email":"bob@example.com",
                    "content":"very nice post"
                }
        }
    }
);

//$each 샘플
db.stock.ticker.insertOne(
    {"_id": "GOOG"}
);
db.stock.ticker.updateOne(
    {"_id": "GOOG"},
    {"$push": {"hourly":
                {"$each":[562.776,562.790,559.123]}
              }
    }
);
db.stock.ticker.updateOne(
    {"_id": "GOOG"},
    {"$push": {"hourly":
                {"$each":[562.773]}
              }
    }
);
db.stock.ticker.updateOne(
    {"_id": "GOOG"},
    {"$push": {"hourly":562.798}
    }
);

//$slice 샘플
db.sliceExample.insertOne(
    { "_id" : 1, "scores" : [ 40, 50, 60 ] }
);
db.sliceExample.updateOne(
    {"_id":1},
    {"$push": 
        {"scores":
            {"$each":[70,80,90], //score에 세 개를 밀어 넣고 나서,
                "$slice":-5,     //score의 전체 개수를 오른쪽에서 부터 5개로 제한하라
                "$sort":1
            }
        }
    }
);

//$addToSet 샘플
db.users.insertOne(
    {"username":"joe",
     "emails":[
         "joe@example.com",
         "joe@gmail.com",
         "joe@yahoo.com"
     ]
    }
);
db.users.updateOne(
    {"username":"joe"},
    {"$addToSet":{
        "emails":"joe@gmail.com"
        }
    }
); //이미 있기 때문에 안들어감

//$addToSet과 $each를 함께 사용
db.users.updateOne(
    {"username":"joe"},
    {"$addToSet":{
        "emails": {
            "$each": ["joe@example.com", "joe@gmail.com", "joe@naver.com"]
        }
      }
    }
);

//$pop 샘플
db.users.updateOne(
    {"username":"joe"},
    {"$pop": {"emails":1}} //제일 뒤에꺼 없앰
);
db.users.updateOne(
    {"username":"joe"},
    {"$pop": {"emails":-1}} //제일 뒤에꺼 빼냄
);
db.users.updateOne(
    {"username":"joe"},
    {"$pull":{"emails":"joe@yahoo.com"}}
);

//$ operator
db.blog.posts.drop();
db.blog.posts.insertOne(
    {
        "title": "A blog post",
        "content": "Hello Mongodb!",
        "comments": [
            {"comment" : "good post",
            "author" : "John",
            "votes" : 0},
            {"comment" : "i thought it was too short",
            "author" : "Claire",
            "votes" : 3},
            {"comment" : "free watches",
            "author" : "Alice",
            "votes" : -1}
        ]
    }
);

db.blog.posts.updateOne(
    {"title": "A blog post"},
    {"$inc":{"comments.0.votes":1}}
);

//다만 아래 update는 author가 "John"인 comment가 여러 건이라도 처음 건만 update함
db.blog.posts.updateOne(
    {"comments.author":"John"},
    {"$set":{"comments.$.author":"Jim"}}
);

//$upsert
db.blog.posts.drop();
db.blog.posts.insertOne(
    {
        "title": "A blog post",
        "viewed": 0
    }
);
//upsert가 없다면 아래와 같이 했을 것.
//아래 code 중간의 save는 mongo의 function이 아니라 shell의 function임.
//save는 upsert와 같음. 다만 _id가 있을 때에는 update 없으면 insert가 됨.
var post = db.blog.posts.findOne({"title":"A blog post"});
if (post) {
    post.viewed++;
    db.blog.posts.save(post);
} else {
    db.blog.posts.insertOne(
        {
            "title":"A blog post",
            "viewed":0
        }
    )
};
//upsert 예제
db.blog.posts.updateOne(
    {"title":"Another blog post"},
    {
        "$inc":{"viewed":1},
        "$setOnInsert":
        {"author": "bob",
          "email": "bob@example.com"
        }
    },
    {"upsert":true}
);

//updateMany 예제
db.users.insertMany(
    [
        {birthday: "10/13/1978"},
        {birthday: "10/13/1978"},
        {birthday: "10/13/1978"}
    ]
);
db.users.updateMany(
    {"birthday": "10/13/1978"},
    {"$set":{"gift":"Happy Birthday!"}}
);

//findAndModify 예제
db.processes.insertMany(
    [
        {"name":"job1", "status":"READY","priority":10},
        {"name":"job2", "status":"READY","priority":20},
        {"name":"job3", "status":"READY","priority":30},
        {"name":"job4", "status":"READY","priority":10}
    ]
);

var cursor = db.processes.find({"status" : "READY"});
cursor.sort({"priority" : -1}).limit(1); //여기서 이미 cursor가 지나가 버리기 때문에 안됨
while ((ps = cursor.next()) != null) {
    var result = ps.updateOne({"_id" : ps._id, "status" : "READY"},
                              {"$set" : {"status" : "RUNNING"}});

    if (result.modifiedCount == 1) {
        //do_something(ps);
        db.processes.updateOne({"_id" : ps._id}, {"$set" : {"status" : "DONE"}})
        break;
    }
    cursor = db.processes.find({"status" : "READY"});
    cursor.sort({"priority" : -1}).limit(1);
};
//어쨌던 위와 같은 코드는 아래와 같음
var ps= db.processes.findOneAndUpdate(
    {"status":"READY"},
    {"$set": {"status":"RUNNING"}},
    {"sort": {"priority":-1},
     "returnNewDocument":false
    }
);
//do_somethond(ps);
db.processes.update(
    {"_id":ps._id},
    {"$set":{"status":"DONE"}}
);
