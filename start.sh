#!/bin/bash
read -p "Run in PRODUCTION mode? [y/n] -> " answer

while true
do
  case $answer in
   [yY]* ) forever start -o ./log/output.log -e ./log/error.log -a --minUptime 1000 --spinSleepTime 3000 ./log_fisher.js
           break;;

   [nN]* ) forever -l ./log/forever_prc.log -o ./log/output.log -e ./log/error.log --minUptime 1000 --spinSleepTime 3000 ./log_fisher.js
           exit;;

   * )     echo "Dude, just enter Y or N, please."; break ;;
  esac
done