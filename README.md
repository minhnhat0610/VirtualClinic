# Virtual Clinic
## Introduction
This is an studying project for Javascript Class with Code Louisville (2021) \
Virtual Clinic is a an online web-app to monitor blood pressure. Users can store their statistics information into personal account secured by their credential (using email and password). The app can be suite for monitoring blood pressure at home as personal use or healthcare professional. 

## Usage
- Link to project: http://ec2-3-137-194-135.us-east-2.compute.amazonaws.com/
- ***Testing account:***
Email: testacc1@test.com
Password: test123
- ***Main Console***: use to navigate through different app's features
- ***Blood Pressure Monitor***: user may enter their blood pressure record through this page
- ***Statistics***: display blood pressure chart and generate average report
- ***Account settings***: manage account information


## Technology Stack
**Front end:** HTML, CSS, Javascript, Jquery \
**Back end:** PHP \
**Database:** MySQL \
**Cloud & Web Hosting:** AWS, GitHub

## App Function

 - Provide an account log-in system which allow every user to store and manage their private information easily. All information will be stored in cloud database.
 - Allow user to enter and review blood pressure statistics including Systolic (mmHg), Diastolic (mmHg), Pulse (bpm). The app will calculate and display blood pressure result base on user's input data.
 - Generate report including statistic chart and average blood pressure report.
 - Allow users to manage their personal account including the ability to change password or personal information

## Project Reflection
 - The project is built in 10 weeks. The project goal is to practice using Javascript and working with PHP as well as familiar myself with project documentation
 - The development follow Agile methodology of *software development life cycle*
 - This project continue to improve and reinforce my fundamental programming knowledge while expose to new material like:
    * Working with AJAX request, fetching and sending data to API under JSON format 
    * Using promises for asynchronous tasks
    * Organize code into separated module
    * Create CRUD actions and communicate to cloud database with PDO (PHP)
    *  Store user login data to browser using session

## Project Requirements
 -  Retrieve data from an cloud database and display data in your app (such as with fetch() or with AJAX)
 - Create a form and save the values (on click of Submit button) to an cloud database
 - Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application
- Create and use a function that accepts two or more values (parameters), calculates or determines a new value based on those inputs, and returns a new value
- Implement a log that records errors, invalid inputs, successful event and display it to client
- Implement a regular expression (regex) to ensure a field either a phone number or an email address is always stored and displayed in the same format
- Build a conversion tool that converts user input to another type and displays it
- Calculate and display data based on an external factor
- Visualize data in a graph, chart, or other visual representation of data
- Create a web server with at least one route and connect to it from your application using PHP

## Project Screenshots
#### Login Page
![Login Page](https://i.postimg.cc/zfr58w6B/Project7-image1.png)

#### Main Console
![Main Console](https://i.postimg.cc/W1nZGS5y/Screenshot-2021-10-26-213735.png)

#### Blood Pressure Monitor Page
![BP Monitor page](https://i.postimg.cc/4dcSdjcR/Project7-image2.png)

#### Statistics Page
![Stastics Page](https://i.postimg.cc/76SKD0vx/Project7-image3.png)

#### Account Settings Page
![Account Settings](https://i.postimg.cc/4yhCwmrv/test.png)