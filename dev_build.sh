docker build . -t "iexalt/runescrape-static" &
docker stop runescrape-static &
sleep 2
docker rm runescrape-static &
wait
docker run -d --name runescrape-static -p 80:80 iexalt/runescrape-static
