#!/bin/bash

type=$1
fails=""

inspect() {
  if [ $1 -ne 0 ]; then
    fails="${fails} $2"
  fi
}

# run server-side tests
server() {
  docker-compose up -d --build
  docker-compose exec users pytest "project/tests"
  inspect $? server
  docker-compose down
}

# run client-side tests
client() {
  docker-compose up -d --build
  docker-compose exec client react-scripts test --coverage --watchAll=false
  inspect $? client
  docker-compose down
}

# run e2e tests
e2e() {
  docker-compose up -d --build
  e2e_type=$1
  if [[ ("${e2e_type}" == "local") || ("${e2e_type}" == "") ]]; then
    ./node_modules/.bin/cypress run
  elif [[ "${e2e_type}" == "ci" ]]; then
    ./node_modules/.bin/cypress run --config baseUrl=http://localhost:3007
  fi
  inspect $? e2e
  docker-compose down
}

# run appropriate tests
if [[ "${type}" == "server" ]]; then
  echo "\n"
  echo "Running server-side tests!\n"
  server
elif [[ "${type}" == "client" ]]; then
  echo "\n"
  echo "Running client-side tests!\n"
  client
elif [[ "${type}" == "e2e" ]]; then
  echo "\n"
  echo "Running e2e tests!\n"
  e2e "local"
elif [[ ("${type}" == "local") || ("${type}" == "ci") ]]; then
  echo "\n"
  echo "Running all tests with ${type} settings!"
  server
  client
  e2e ${type}
else
  echo "\n"
  echo "This type is not supported - ${type}"
  exit 1
fi

# return proper code
if [ -n "${fails}" ]; then
  echo "Tests failed: ${fails}"
  exit 1
else
  echo "Tests passed!"
  exit 0
fi