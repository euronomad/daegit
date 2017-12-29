#backup 폴더를 만들고 export
mkdir /mnt/resource/backup
mongodump -o /mnt/resource/backup
#shutdown mongod
systemctl stop mongod
#configuration을 MMAPv1을 쓰도록 수정
#conf 백업
cp /etc/mongod.conf /etc/mongod.wt.conf
#storage engine 부분 고침
sed -i -e 's/^#  engine:/  engine: mmapv1/g' /etc/mongod.conf
#datafile field 고침
sed -i -e 's|/data1/mongo|/mnt/resource/data1/mongo|g' /etc/mongod.conf
#datafile path 권한 설정
mkdir -p /mnt/resource/data1/mongo
chown –R mongod:mongod /mnt/resource/data1/mongo
chcon -Rv --type=mongod_var_lib_t /mnt/resource/data1/mongo
#start mongod
systemctl start mongod
#Storage 확인
#mongo shell 실행
var status = db.serverStatus();
status['storageEngine']
#데이터 import
mongorestore /mnt/resource/backup
#데이터 확인