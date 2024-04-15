FROM python:alpine

WORKDIR /home/app

COPY requirements.txt /home/app

RUN pip install --no-cache-dir -r requirements.txt

COPY data/ /home/app/data

COPY . /home/app

CMD ["python", "main.py"]