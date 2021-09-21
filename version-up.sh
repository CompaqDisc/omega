#!/bin/bash
basever=$(cat VERSION | xargs semver --preid alpha -i pre$1)
printf "%s" $basever > VERSION