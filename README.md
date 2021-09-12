This repo consists of cypress test code for some test cases created for this page : https://www.morressier.com/event/5e733c5acde2b641284a7e27


To run the test code

1. Have node and npm installed

2. Clone the repo by first navigating to the the folder on your terminal that you want to create the project then run


   		git clone https://github.com/tobi-legan/event-page-assignment.git
	 
   
3. cd into the project directory and run the command : 


   		npm install
		
   
4. To run the tests in GUI mode run command. :  

    	npm run cypress
   
   To run the tests in command line mode run command. : 
	 
    	npm run test



Little Breakdown of the project structure


The test folder is located in the integrations folder under the cypress folder

The page objects folder is located under the cypress folder

There is also an api intercepts folder for the intercepted request functions

Also I have some applitools eyes visual tests in the code, to see the results of the UI test you can update the API key in the applitools.config.js file before running the tests





