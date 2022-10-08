################################################################################
## using node image to install node dependencies
################################################################################

FROM node:16-slim AS frontend_node


################################################################################
## setup container
################################################################################

WORKDIR /code/

################################################################################
## React app
################################################################################
RUN apt-get update -qq

COPY frontend /code/frontend


RUN yarn config set "strict-ssl" false -g
RUN cd frontend && yarn install && yarn build


################################################################################
## using python image to install django app
################################################################################

FROM python:3.9 AS backend_py

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt docker/requirements-prod.txt /code/
RUN pip install -r requirements-prod.txt
COPY . /code/

RUN mkdir -p /etc/supervisor/conf.d && mkdir -p /var/log/supervisor && mkdir -p /var/log/app_logs
RUN ln -sf /code/docker/supervisord.app.conf /etc/supervisor/conf.d/app.conf
RUN ln -sf /code/docker/supervisord.conf /etc/supervisor/supervisord.conf

RUN chmod +x /code/docker/*.sh
RUN /code/docker/pg-client-install.sh
RUN rm -rf frontend/src
COPY --from=frontend_node /code/frontend/static /code/frontend/static

ENTRYPOINT ["/code/docker/entrypoint.sh"]
CMD ["start"]
