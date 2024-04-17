FROM busybox

RUN mkdir /app

COPY *.csv /app

VOLUME /app

CMD ["tail", "-f", "/dev/null"]