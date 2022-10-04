FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt docker/requirements-prod.txt /code/
# RUN sed -i "s/psycopg2-binary/psycopg2/" requirements.txt
RUN pip install -r requirements-prod.txt
COPY . /code/

RUN mkdir -p /etc/supervisor/conf.d && mkdir -p /var/log/supervisor && mkdir -p /var/log/app_logs
RUN ln -sf /code/docker/supervisord.app.conf /etc/supervisor/conf.d/app.conf
RUN ln -sf /code/docker/supervisord.conf /etc/supervisor/supervisord.conf

RUN chmod +x /code/docker/*.sh
# RUN /code/docker/pg-client-install.sh

ENTRYPOINT ["/code/docker/entrypoint.sh"]
CMD ["start"]
