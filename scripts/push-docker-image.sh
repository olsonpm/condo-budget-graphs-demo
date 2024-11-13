#! /usr/bin/env sh

. ./.env

version=$(jq -r .version < package.json)
imgUri="${docker_package_url}:v${version}"
docker manifest inspect "${imgUri}" > /dev/null 2>&1
if [ $? = 0 ]; then
  echo "version v${version} already exists! not tagging" 1>&2
  exit 1
fi

docker push "${docker_package_url}:latest"
docker push "${imgUri}"
