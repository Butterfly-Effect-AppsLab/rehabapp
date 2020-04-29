# pull base image
FROM python:3

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#install dependencies
RUN pip install --upgrade pip
COPY requirements.txt ./usr/src/app/
RUN pip install -r /usr/src/app/requirements.txt

# copy project
COPY app ./usr/src/app/app

WORKDIR /usr/src/app/app

ENV PYTHONPATH="$PYTHONPATH:/usr/src/app/app"

EXPOSE 8080

CMD ["gunicorn", "main:api", "-b", ":8080"]