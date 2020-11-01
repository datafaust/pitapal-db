# pitapal-db

Includes a node server and mysql database. Table schema is created automatically based on the `init.sql file`. To run:

1. clone the repo
2. make sure you have docker and docker-compose installed
3. to run locally, change the host in the node `server.js` file to your ip address
4. go into the root directory of the repo
5. run `docker-compose run -d` 
6. once the process is complete you can run `docker ps` to check the status
7. then connect with workbench using your ip address as the host


You can always destroy and respin the services. Lets say you want to redeploy the `mysql` container with new additions to the init.sql file then run:

`docker-stop mysql`
`docker-rm mysql`
`docker rmi mysql`
`docker-compose up -d`


