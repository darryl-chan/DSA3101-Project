FROM python:3.11

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/* && apt-get install -y curl

WORKDIR /home/app

COPY requirements.txt /home/app

RUN pip install --no-cache-dir -r requirements.txt

COPY . /home/app

EXPOSE 5000

CMD ["python", "main.py"]