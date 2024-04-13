FROM mongo

# ENV MONGO_DB_USERNAME = admin \
#     MONGODB_PWD = password

WORKDIR /home/app

COPY . /home/app

EXPOSE 27017

CMD ["mongod"]