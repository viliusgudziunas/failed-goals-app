# Goals App

## Usefull Commands

### Bash Aliases

```
source ~/.bashrc
```

Sets:

- dc='docker-compose'
- dm='docker-machine'

### Docker Machine

```
eval $(dm env goals-app-dev)
```

### Database

```
dc exec users python manage.py recreate_db
```

## Migrations

```
dc exec users python manage.py db init
dc exec users python manage.py db migrate
dc exec users python manage.py db upgrade
```

If migration fails:

```
dc exec users python manage.py db stamp heads
dc exec users python manage.py db current
dc exec users python manage.py db migrate
dc exec users python manage.py db upgrade
```

### Tests

```
dc exec client npm test -- --verbose
sh test.sh server
sh test.sh client
sh test.sh e2e
sh test.sh local
```

### Logs

```
dc logs -f
docker container logs -f <container_name>
```
