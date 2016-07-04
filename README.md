## 5 day weather app

The app displays the highest temperature for each day. Get more details by moving a mouse over the day.

It is a prototype and as such has been built to run from a simple webserver e.g. Apache. As such it calls most of its libraries and dependencies externally when loaded in a browser. This is only for ease of use in this context. To run it locally either download the zip or the clone repo and add the files to a directory in your local webserver.
Considerations for a production release and other improvements
###UX

A fuller set of user criteria e.g. user stories
If it were being designed for production, it would firstly be more fully featured e.g. 
 * You would be able to achieve from a list of cities or be able to search for a city in order to view its weather. And it would be better styles both for an improved aesthetic and for display on a range of different devices and screens.
 * Other visual elements such as maps or charts can be added to graphically show the weather 
 * Ability to personalise the weather

###Build and QA
In order to better control the performance and general quality of the app, a build and deploy process would be beneficial. This includes:
Automated QA, dependency management using something Gulp
Automated testing including, unit testing, acceptance tests etc.
Code standards and style checking using a Linting tool 
##Frameworks and Micro Architectures
Consideration could be given to delivering the code from a micro-architecture such as Node. 
The data set from the weather api could then be normalised to better suit the requirements of this particular app.

