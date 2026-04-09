#!/bin/bash

PLATFORM=$(uname)
CONFIG=$(dirname $0)/.development/docker-compose.yml

export VIRTUAL_IP=10.10.20.10
export COMPOSE_PROJECT_NAME=iivineri

create_domain_name_mapping() {
  EXISTS=$(ifconfig -a | grep $VIRTUAL_IP)

  IS_MAC=$(uname -a | grep -i "Darwin Kernel Version" | awk '{print $1}')
  if [[ "$IS_MAC" != "" && "$EXISTS" = "" ]]; then
    echo "Adding $VIRTUAL_IP to lo0 interface"
    sudo sh -c "ifconfig lo0 alias $VIRTUAL_IP"
    EXISTS=$(ifconfig -a | grep $VIRTUAL_IP)
  fi

  if [[ "$EXISTS" = "" ]]; then
    echo "Creating virtual interface"
    CN=$(echo $VIRTUAL_IP | cut -d . -f 4)
    sudo sh -c "ifconfig docker0:ng_$CN $VIRTUAL_IP"
  fi

}

opts=""
case "$1" in
"build")
  args="--build-arg PLATFORM=$PLATFORM"
  ;;
"up")
  create_domain_name_mapping
  ;;
"*") ;;

esac

docker compose --env-file .env --file $CONFIG $opts $@ $args
