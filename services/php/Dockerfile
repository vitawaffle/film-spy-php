FROM php:8.2-fpm-alpine

ARG GIT_USER_NAME
ARG GIT_USER_EMAIL
ARG HOST_GID
ARG HOST_UID

RUN apk update && apk upgrade \
    && apk add --no-cache git libpq-dev \
    && docker-php-ext-install pdo_pgsql \
    && git config --global user.name "$GIT_USER_NAME" \
    && git config --global user.email "$GIT_USER_EMAIL" \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/local/bin/composer \
    && addgroup -g ${HOST_GID} --system laravel \
    && adduser -G laravel --system -D -s /bin/sh -u ${HOST_UID} laravel

EXPOSE 9000
