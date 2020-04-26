
if [ "$1" = "docker" ]
then
    if [ "$2" = "build" ]
    then
        cd apps && docker-compose build --no-cache && docker-compose up
    elif [ "$2" = "up" ]
    then
        cd apps && docker-compose up
    fi
elif [ "$1" = "install" ]
then
    cd apps/node-server && yarn install
    cd .. && cd web-client && yarn install
    cd .. && cd rtmp-server && yarn install
fi
 
