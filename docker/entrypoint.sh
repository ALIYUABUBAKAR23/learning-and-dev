#!/usr/bin/env bash

function prepare_db {
    local MAX_RETRIES=15
    local retries=1
    until pg_isready -q; do
        >&2 echo "Waiting for postgres... $retries host = $PGHOST"

        ((retries++))
        if [[ $retries -gt $MAX_RETRIES ]]; then
            echo "It was not possible to connect to postgres host = $PGHOST"
            exit 1
        fi
        sleep 1
    done
}

function setup_db {
    prepare_db

    if psql -c "" $DB_NAME; then
        echo "$DB_NAME database exists!"
    else
        createdb -e $DB_NAME -e ENCODING=UTF8
        echo "$DB_NAME database created!"
    fi

    # migrate data model if needed
    ./manage.py migrate --noinput
}

function collect_static {
    ./manage.py collectstatic --noinput --clear --verbosity 0
}

function setup_django {
    setup_db
    collect_static
}

export STATIC_URL=${STATIC_URL:-/static/}
export STATIC_ROOT=${STATIC_ROOT:-/var/www/static/}

export DJANGO_SETTINGS_MODULE=${DJANGO_SETTINGS_MODULE:-rigshare.settings}
export DEBUG=${DEBUG:-false}

case "$1" in

    bash )
        bash
    ;;

    manage )
        ./manage.py "${@:2}"
    ;;

    start )
        setup_django
        supervisord -c /etc/supervisor/supervisord.conf
    ;;

    * )
        show_help
    ;;
esac
