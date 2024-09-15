FROM python:3.9

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE council_election.settings
RUN apt-get update && apt-get install -y \
    zbar-tools \
    libzbar-dev

# create root directory for our project in the container
RUN mkdir /app
# Set the working directory
WORKDIR /app
# Copy the current directory contents into the container 
COPY . /app/
COPY .env /app/.env

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt



RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "council_election.wsgi:application"]