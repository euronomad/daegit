var compliment=["attractive","intelligent","like Batman"];
var index=Math.floor(Math.random()*3);
print("Hello, you'are looking particulary " + compliment[index]+ " today!");

var no = function() {
    print("Not permitted");
};

/* 아래와 같이 둘 다를 override해야 함. 그렇지 않으면 한 쪽에는 적용되지 않음. 
 * 예를 들어 DB.prototype.dropDatabase에 대한 정의를 빼 먹으면
 * use db 혹은 db.getSisterDB("db명"); 을 한 이후에는 no가 동작하지 않음.
*/
db.dropDatabase = DB.prototype.dropDatabase = no;
DBCollection.prototype.drop = no;
DBCollection.prototype.dropIndex = no;

//default shell prompt 바꿈
/*
prompt = function() {
    return (new Date())+"> ";
};
*/
prompt = function() {
    if (typeof db == 'undefined') {
        return (new Date())+':(nodb)> ';
    }
    /* 아래 try catch 부분이 없으면?
     * 아래 try catch를 없애고, shell에 들어간다.
     * shell은 남겨두고 db를 내렸다 올린다(systemctl restart mongod)
     * try catch 부분이 있는 것과 없는 것의 차이는?
    */
    try {
        db.runCommand({getLastError:1});
    } catch (e) {
        print(e);
    }

    return (new Date())+':'+db+'> ';
}