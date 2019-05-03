Setup containers

    docker logout
    docker run --name mongodb -p 27017:27017 -e AUTH=no  mongo:3.4.20
    docker run --name redis -p 6379:6379 -d -t redis:al

Run server

    yarn start

http://localhost:3333

Endpoints in Api Rest Node.postman_collection.json
