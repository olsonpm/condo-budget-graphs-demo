#! /usr/bin/env sh

. ./.env

version=$(jq -r .version < package.json)
imgUri="${docker_package_url}:v${version}"
docker manifest inspect "${imgUri}" > /dev/null 2>&1
if [ $? = 0 ]; then
  echo "version v${version} already exists! not tagging" 1>&2
  exit 1
fi

pnpm build
if [ $? != 0 ]; then
  echo "pnpm build failed.  Exiting" 1>&2
  exit 1
fi

rm -rf ./container

libDir=./container/usr/lib/condo-budget-graphs

mkdir -p "${libDir}"

cp -r package.json pnpm-lock.yaml .nvmrc dist "${libDir}"

docker build --tag "${docker_package_url}:latest" .
docker tag "${docker_package_url}:latest" "${imgUri}"
