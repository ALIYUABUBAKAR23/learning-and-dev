#!/usr/bin/env bash

wget -O- https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | dd status=none of=/usr/share/keyrings/postgresql.gpg

echo deb [arch=amd64,arm64,ppc64el signed-by=/usr/share/keyrings/postgresql.gpg] http://apt.postgresql.org/pub/repos/apt/ bullseye-pgdg main | dd status=none of=/etc/apt/sources.list.d/postgresql.list

apt-get update -qq && apt install postgresql-client vim -y
