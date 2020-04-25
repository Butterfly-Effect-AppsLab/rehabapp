# pull base image
FROM python:3

#set working directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#install dependencies
RUN pip install --upgrade pip
COPY requirements.txt ./
RUN pip install -r requirements.txt

# copy project
COPY app ./app

WORKDIR /usr/src/app/app

ENV PYTHONPATH="$PYTHONPATH:/usr/src/app/app"

EXPOSE 8080