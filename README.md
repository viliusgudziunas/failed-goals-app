# Goals App

### Bash Aliases

```
source ~/.bashrc
```

- dc='docker-compose'
- dm='docker-machine'

### Tests

```
dc exec client npm test -- --verbose
sh test.sh client
sh test.sh e2e
sh test.sh local
```

### Logs

```
dc logs -f
docker container logs -f <container_name>
```
