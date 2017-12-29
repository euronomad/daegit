#NIC 2개
./00.addNic.sh minschomongo01
./00.addNic.sh minschomongo02
#DataDisk 2개
./01.addDataDisk.sh mongo01-1
./01.addDataDisk.sh mongo01-2
./01.addDataDisk.sh mongo02-1
./01.addDataDisk.sh mongo02-2
#availability set 생성
./02.avSet.sh minschoMongoAvSet01
#vm 2개
./02.vm.sh minschomongo01 minschoMongoAvSet01
./02.vm.sh minschomongo02 minschoMongoAvSet01
#attach Disk
./03.attachDisk.sh minschomongo01 mongo01-1 0
./03.attachDisk.sh minschomongo01 mongo01-2 1
./03.attachDisk.sh minschomongo02 mongo02-1 0
./03.attachDisk.sh minschomongo02 mongo02-2 1
