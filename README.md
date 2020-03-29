## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Links](#links)
* [Screens](#screen-grabs)
* [Sources](#sources)
* [Issues](#issues)

## General info
This is a full stack, MongoDB application that can be used for tracking one's own exercise regiment.  It'll permit a new workout input each day.  Users can add as many exercise to the workout as they wish.  the NoSQL database will keep track of their daily details such as # of reps, sets, the distance, the elapsed time and more. The data sets vary depending on whether the exercise is cardio or weight.  The dashboard uses several types of visual aids in the form of charts and graphs to help users 
monitor their progress.   

## Technologies
* Node.js
* Mongoose
* express
* charts.js


	
## Setup
To run this project locally using npm cli:
```
$ type: npm install.
$ run mongoDB server.
$ type: npm start.
$ Or See deployed website.  
```



## Links:

Github Repo: https://github.com/drthisguy/14-Fitness-Tracker

Deployed Website: https://fittrace.herokuapp.com


## Screen Grabs:
![image](https://user-images.githubusercontent.com/48693333/77839847-91756880-714e-11ea-8a91-a550fc8771e3.png)


![image](https://user-images.githubusercontent.com/48693333/77839868-dac5b800-714e-11ea-83a3-9bcaed28832c.png)



## Sources
https://docs.mongodb.com/manual/introduction
https://mongoosejs.com/docs/guides.html

## Issues & Contact

The chart labels for the deployed Heroku page are currently undefined.  
The issue can't be reproduced on localhost so it's taking some time troubleshoot.  