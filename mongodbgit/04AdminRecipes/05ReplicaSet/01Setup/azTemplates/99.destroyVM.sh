#!/bin/bash
az vm delete -y --name minschomongo01 --resource-group minschoMongoDBRG01
az disk delete -y --name minschomongo01_OsDisk1 --resource-group minschoMongoDBRG01
az vm delete -y --name minschomongo02 --resource-group minschoMongoDBRG01
az disk delete -y --name minschomongo02_OsDisk1 --resource-group minschoMongoDBRG01

#아래는 data disk만 삭제
#az vm disk detach --name mongodbDataDisk01 --vm-name mongoTestVM01 --resource-group minschoMongoDBRG01
#az vm disk detach --name mongodbDataDisk02 --vm-name mongoTestVM01 --resource-group minschoMongoDBRG01
az disk delete -y --name mongo01-1 --resource-group minschoMongoDBRG01
az disk delete -y --name mongo01-2 --resource-group minschoMongoDBRG01
az disk delete -y --name mongo02-1 --resource-group minschoMongoDBRG01
az disk delete -y --name mongo02-2 --resource-group minschoMongoDBRG01
