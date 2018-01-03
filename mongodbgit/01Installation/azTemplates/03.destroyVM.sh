#!/bin/bash
az vm delete -y --name mongoTestVM01 --resource-group daekimMongoDBRG01
az disk delete -y --name mongoTestVM01_OsDisk1 --resource-group daekimMongoDBRG01

#아래는 data disk만 삭제
#az vm disk detach --name mongodbDataDisk01 --vm-name mongoTestVM01 --resource-group daekimMongoDBRG01
#az vm disk detach --name mongodbDataDisk02 --vm-name mongoTestVM01 --resource-group daekimMongoDBRG01
az disk delete -y --name mongodbDataDisk11 --resource-group daekimMongoDBRG01
az disk delete -y --name mongodbDataDisk12 --resource-group daekimMongoDBRG01
#새로 disk 만들었다면 attach는 
#az vm disk attach --disk mongodbDataDisk01 --vm-name mongoTestVM01 --resource-group daekimMongoDBRG01