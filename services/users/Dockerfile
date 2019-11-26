# base image
FROM python:3.8.0-alpine

# dependencies
RUN apk update && \
    apk add --virtual build-deps gcc python-dev musl-dev && \
    apk add postgresql-dev && \
    apk add netcat-openbsd

# working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# environment
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

# requirements
RUN pip install --upgrade pip && \
    pip install pipenv
COPY ./Pipfile /usr/src/app/Pipfile
RUN pipenv install --skip-lock --deploy --system

# add entrypoint.sh
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh