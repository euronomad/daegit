db.setProfilingLevel(1,20);
db.mockdata.find(
    {first_name:"Pam"}
).count();
db.system.profile.find().pretty();

//system profile size 늘이기 (1MB -> 10MB)
db.setProfilingLevel(0);
db.system.profile.drop();
db.createCollection('system.profile',{capped:true, size: 10485760});
db.setProfilingLevel(1,20);

//Wired Tiger statistics
db.serverStatus().wiredTiger.cache