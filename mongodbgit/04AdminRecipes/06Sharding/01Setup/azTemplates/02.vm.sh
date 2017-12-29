az group deployment create --name $1 --resource-group minschoMongoDBRG01 --template-file 02.vm.json \
--parameters vm_name=$1 \
--parameters adminUserId=minsoojo \
--parameters avset_name=$2