#!/bin/bash
cd /Users/daekim/daegit/mongodbgit/01Installation/azTemplates
sh 03.setupTestEnv01.sh

#Ansible 실해
if [ $?  == 0 ];
then
cd /Users/daekim/daegit/mongodbgit/01Installation/ansible
ansible-playbook playbooks/groups/common.yaml 
ansible-playbook playbooks/groups/mongo.yaml 
fi