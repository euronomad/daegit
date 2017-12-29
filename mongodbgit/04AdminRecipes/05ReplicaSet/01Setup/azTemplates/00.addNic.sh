az group deployment create --name networkForMongoDBDeployment --resource-group minschoNetRG \
--template-file 00.addNic.json \
--parameters dnsPrefix=$1