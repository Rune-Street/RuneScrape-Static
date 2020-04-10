FROM nginx:1.17.9

COPY config /etc/nginx
COPY static /usr/share/nginx/html/static
