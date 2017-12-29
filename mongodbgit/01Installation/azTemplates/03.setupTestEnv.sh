#!/bin/bash
az group create --name daekimMongoDBRG01 --location koreacentral
az group deployment create --name networkForMongoDBDeployment --resource-group daekimNETRG01 \
--template-file 00.mongoNet.json \
--parameters vnet_name=daekimVnet01 \
--parameters subnet_name=testSubnet01 \
--parameters publicip_name=mongoDBSingleNodeIP \
--parameters dnsPrefix=mongodk01 \
--parameters nic_name=mongodbTestNic01


az group deployment create --name createVM --resource-group daekimMongoDBRG01 --template-file 02.vm.json \
--parameters vm_name=mongoTestVM01 \
--parameters adminUserId=daekim \
--parameters nic_name=mongodbTestNic01

# disk 두 개 만듬
az group deployment create --name createDataDisk --resource-group daekimMongoDBRG01 --template-file 01.dataDisk.json \
--parameters dataDisk_name=mongodbDataDisk01
az group deployment create --name createDataDisk --resource-group daekimMongoDBRG01 --template-file 01.dataDisk.json \
--parameters dataDisk_name=mongodbDataDisk02
# data disk attach
az vm disk attach --vm-name mongoTestVM01 --disk mongodbDataDisk01 --lun 0 --resource-group daekimMongoDBRG01
az vm disk attach --vm-name mongoTestVM01 --disk mongodbDataDisk02 --lun 1 --resource-group daekimMongoDBRG01

#disk lun 확인
az vm show --resource-group daekimMongoDBRG01 --name mongoTestVM01 | jq -r .storageProfile.dataDisks
az vm show --resource-group daekimMongoDBRG01 --name mongoTestVM01 | jq -r .storageProfile.dataDisks[].lun