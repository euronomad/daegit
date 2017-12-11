#!/bin/bash
set -euo pipefail

cd ../02vmWithARM
/bin/bash 00.azuredeploy.sh -g daekimVMRG01 -n vmWithAnsible -u daekim -r daekimVaultRG01 -v daekimVault01 -s daekimPub -c dummy-init.yaml
cd ../04CommonTasks
/usr/local/bin/ansible-playbook common_tasks.yml

