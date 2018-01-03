#!/bin/bash


#Creating Network
echo "Creating Network..."
az group create --name daekimMongoDBRG01 --location koreacentral
az group deployment create --name networkForMongoDBDeployment --resource-group daekimNETRG01 \
--template-file 00.mongoNet.json \
--parameters vnet_name=daekimVnet01 \
--parameters subnet_name=testSubnet01 \
--parameters publicip_name=mongodkIP02 \
--parameters dnsPrefix=mongodk02 \
--parameters nic_name=mongodkNic02


#Creating VM
echo "Creating VM..."

customData=$(cat dummy-init.yaml | base64)
set -x
IP_RES_ID=`az group deployment create --name createVM --resource-group daekimMongoDBRG01 --template-file 02.vm.json \
--parameters vm_name=mongoTestVM02 \
--parameters adminUserId=daekim \
--parameters nic_name=mongodkNic02 \
--parameters netRGName=daekimNETRG01 \
--parameters customData=$customData| jq -r '.properties.outputs.publicIPAddress.value.id'`


#echo "IP_RES_ID=$IP_RES_ID"

if [ $?  == 0 ];
then
    echo "Template has been successfully deployed"
    #echo "IP_RES_ID=$IP_RES_ID"
    FQDN=`az network public-ip show --ids $IP_RES_ID| jq -r '.dnsSettings.fqdn'`
    echo "fqdn=$FQDN"
#### /etc/ansible/hosts에 넣기 위해서 hosts파일을 write권한은 주어야 함.
    if grep -Fq "$FQDN" /Users/daekim/daegit/mongodbgit/01Installation/ansible/hosts;
    then
        echo "already this vm is in ansible default inventory. Skipping.."
    else
        echo "$FQDN ansible_ssh_private_key_file=/Users/daekim/.ssh/daekim_ebay.com">> /Users/daekim/daegit/mongodbgit/01Installation/ansible/hosts
    fi
fi

# disk 두 개 만듬
az group deployment create --name createDataDisk --resource-group daekimMongoDBRG01 --template-file 01.dataDisk.json \
--parameters dataDisk_name=mongodbDataDisk21
az group deployment create --name createDataDisk --resource-group daekimMongoDBRG01 --template-file 01.dataDisk.json \
--parameters dataDisk_name=mongodbDataDisk22

# data disk attach
az vm disk attach --vm-name mongoTestVM02 --disk mongodbDataDisk21 --lun 0 --resource-group daekimMongoDBRG01
az vm disk attach --vm-name mongoTestVM02 --disk mongodbDataDisk22 --lun 1 --resource-group daekimMongoDBRG01

#disk lun 확인
az vm show --resource-group daekimMongoDBRG01 --name mongoTestVM02 | jq -r .storageProfile.dataDisks
az vm show --resource-group daekimMongoDBRG01 --name mongoTestVM02 | jq -r .storageProfile.dataDisks[].lun