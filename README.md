# node-microservices

Microservices in NodeJS - Juan Carlos Del Saz (jcdelsazg)

## Using microservice architecture in NojdeJS for update a monolite App to a microservice App

- Different branches with the steps follow for create the microservice architecture and modify the app
- Prettier and eslint configuracion following the airbnb template
- vscode launch.js included for run and debug the different microservices
- Every microservice has it's own package.json, explained in how to run
- Important! You need to have rabbitmq installed in local for feedback service

## List of services

1. service-registry

- Service in charge of registry and unregistry the different microservices

2. speakers-service

- Service in charge of providing all the information about the speakers

3. conference-app

- Main app use for testing and showing the information provided by the microservices

4. feedback-service

- Service in charge of providing all the information about feedback

## HOW TO RUN

1. Enter in every microservice folder and run npm install for installing the dependencies
2. Install if you don't have it rabbit mq in your local machine(is needed for feedback service) you can enter in rabbitmq offical page and follow the instructions to getting installed.
3. If you're using visual studio code, import the entire repository and use the debug button for start the microservices,
   if you want to start using the console, open one terminal for each service and execute npm start
4. The order for start the service and avoid errors is the following:
5. registry-service
6. speakers-service
7. feedback-service
8. conference-app
9. When all the services are up and running go to the browser and enter in http://localhost:3080, this url open the conference app
   if everything is working as expected you can see the app and navigate between the different menus.
10. If you want to test separate the services you can access using the browser with the following exaples or urls:
11. registry-service: http://localhost:3000/register/"servicename"/"serviceversion"/"serviceport" choose the name version and port
12. speakers-service: http://localhost:"port"/list for the list of the speakers, for putting the port you need to check the console
    after running the service because the port for this service is choosed randomly.
