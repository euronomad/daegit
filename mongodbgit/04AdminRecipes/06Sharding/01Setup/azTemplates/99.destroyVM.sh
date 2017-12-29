#!/bin/bash
az vm delete -y --name minschomongo01 --resource-group minschoMongoDBRG01
az disk delete -y --name minschomongo01_OsDisk1 --resource-group minschoMongoDBRG01
az vm delete -y --name minschomongo02 --resource-group minschoMongoDBRG01
az disk delete -y --name minschomongo02_OsDisk1 --resource-group minschoMongoDBRG01
az vm delete -y --name minschomongo03 --resource-group minschoMongoDBRG01
az disk delete -y --name minschomongo03_OsDisk1 --resource-group minschoMongoDBRG01
