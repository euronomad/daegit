#NIC 2개
./00.addNic.sh minschoconfig01
./00.addNic.sh minschoshard01
./00.addNic.sh minschoshard02
./00.addNic.sh minschomongos01

#availability set 생성
./02.avSet.sh minschoMongoAvSet01
#vm 2개
./02.vm.sh minschoconfig01 minschoMongoAvSet01
./02.vm.sh minschoshard01 minschoMongoAvSet01
./02.vm.sh minschoshard02 minschoMongoAvSet01
./02.vm.sh minschomongos01 minschoMongoAvSet01
#attach Disk
