#!/bin/bash

fails=""

inspect() {
  if [ $1 -ne 0 ]; then
    fails="${fails} $2"
  fi
}

# run unit and integration tests
docker-compose up -d --build
docker-compose exec client react-scripts test --coverage --watchAll=false
inspect $? client

# run e2e tests
./node_modules/.bin/cypress run
inspect $? e2e
docker-compose down

# return proper code
if [ -n "${fails}" ]; then
  echo "Tests failed: ${fails}"
  exit 1
else
  echo "Tests passed!"
  exit 0
fi