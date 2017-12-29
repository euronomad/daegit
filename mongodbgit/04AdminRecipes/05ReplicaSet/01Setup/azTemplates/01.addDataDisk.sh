az group deployment create --name createDataDisk --resource-group minschoMongoDBRG01 \
--template-file 01.addDataDisk.json \
--parameters dataDisk_name=$1