#!/bin/bash
basever=$(cat VERSION | xargs semver)
gitver=$(git rev-parse --short HEAD)

printf "export const VERSION = '%s+%s'" $basever $gitver > index.ts