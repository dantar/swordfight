#!/bin/bash
#set -v # do not expand variables
set -x # output
set -e # stop on error
set -u # stop if you use an uninitialized variable

TODAY=`date +%Y-%m-%d-%H-%M-%S`
echo $TODAY

HACKGIT=~/hack/git

export JAVA_HOME=/usr/lib/jvm/java-8-oracle

REMOTE="ssh dantar "

cd $HACKGIT/swordfight
ng build --base-href=./ --prod

rsync --delete -varzh $HACKGIT/swordfight/dist/swordfight/* dantar:/home/daniele/html/swordfight/

