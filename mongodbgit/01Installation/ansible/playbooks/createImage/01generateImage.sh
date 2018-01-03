ansible-playbook 01-1deprovision.yml
az vm deallocate --resource-group daekimMongoDBRG01 --name mongoTestVM01
az vm generalize --resource-group daekimMongoDBRG01 --name mongoTestVM01
az image create --resource-group daekimImgRG01 --name mongodbImg --source /subscriptions/7b13dc94-2b54-4cdf-a247-bbdebdb97f4f/resourceGroups/daekimMongoDBRG01/providers/Microsoft.Compute/virtualMachines/mongoTestVM01


az vm delete -g daekimMongoDBRG01 -n mongoTestVM01




az group create --name daekimMongoTestRG01 --location koreacentral

az vm create \
   --resource-group daekimMongoTestRG01 \
   --name mongoTestVM01 \
   --image mongodbImg\  
   --admin-username daekim \
   --ssh-key-value ~/.ssh/daekim_ebay.com.pub


az vm create --resource-group daekimImgRG01 --name mongoTestVM01 --image mongodbImg --admin-username daekim --ssh-key-value ~/.ssh/daekim_ebay.com.pub





