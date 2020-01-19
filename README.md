# node-microservices
Microservices in NodeJS - Juan Carlos Del Saz (jcdelsazg)

## Using microservice architecture in NojdeJS for update a monolite App to a microservice App
- Different branches with the steps follow for create the microservice architecture and modify the app
- Prettier and eslint configuracion following the airbnb template
- vscode launch.js included for run and debug the different microservices
- Every microservice has it's own package.json, explained in how to run

## List of services 

1. service-registry 
  - Service in charge of registry and unregistry the different microservices
2. speakers-service
  - Service in charge of providing all the information about the speakers
3. conference-app 
  - Main app use for testing and showing the information provided by the microservices
  

##HOW TO RUN

1. Enter in every microservice folder and run npm install for installing the dependencies 
2. If you're using visual studio code, import the entire repository and use the debug button for start the microservices, 
if you want to start using the console, open one terminal for each service and execute npm start
3. The order for start the service and avoid errors is the following: 
  1. registry-service
  2. speakers-service
  3. conference-app 
4. When all the services are up and running go to the browser and enter in http://localhost:3080, this url open the conference app
if everything is working as expected you can see the app and navigate between the different menus. 
5. If you want to test separate the services you can access using the browser with the following exaples or urls: 
  1. registry-service: http://localhost:3000/register/"servicename"/"serviceversion"/"serviceport" choose the name version and port
  2. speakers-service: http://localhost:"port"/list for the list of the speakers, for putting the port you need to check the console
  after running the service because the port for this service is choosed randomly. 
