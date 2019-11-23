# Goals App

### Bash Aliases

```
source ~/.bashrc
```

- dc='docker-compose'
- dm='docker-machine'

### Tests

```
./node_modules/.bin/cypress run
dc exec client npm test -- --verbose
dc exec client react-scripts test --coverage --watchAll=false
```

To run all tests:

```
sh test.sh
```

### Logs

```
dc logs -f
docker container logs -f <container_name>
```
