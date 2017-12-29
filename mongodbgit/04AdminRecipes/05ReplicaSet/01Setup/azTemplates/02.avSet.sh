az group deployment create --name mongodbAvSet --resource-group minschoMongoDBRG01 \
--template-file 02.avSet.json \
--parameters avset_name=$1