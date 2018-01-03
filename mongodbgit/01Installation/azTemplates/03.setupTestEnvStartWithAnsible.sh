cd /Users/daekim/daegit/mongodbgit/01Installation/ansible/

echo 'ansible start'
ansible-playbook playbooks/groups/common.yaml -vv
ansible-playbook playbooks/groups/mongo.yaml -vv
