# NodeJS - Angular Demo

###### A DEMO APPLICATION FOR VERIZON PROJECT BY SREENIVASA RAJIV

__live application:__ [https://verizon-payoda-demo.herokuapp.com/](https://verizon-payoda-demo.herokuapp.com/)

__source repository:__ [https://github.com/sreenivasarajiv/verizon-payoda-demo](https://github.com/sreenivasarajiv/verizon-payoda-demo)

__video demo:__ [https://www.loom.com/share/ced917fd2cf5434c99f0c908de718be9](https://www.loom.com/share/ced917fd2cf5434c99f0c908de718be9)

### Steps:
1. clone the project.
`git clone https://github.com/sreenivasarajiv/verizon-payoda-demo`
2. Install angular dependencies.
`cd front-end && npm install`
3. Install express dependencies.
`cd back-end && npm install`
4. Make sure a Mongo DB instance is running in local and listening to port __27017__.
5. Seed the database with data using following database script.
`node back-end/mongo-scripts/seed-database.js`
6. To run server,
`cd back-end && npm run start-dev`
7. To run web application,
`cd front-end && ng serve`
8. Open browser and navigate to [http://localhost:4200](http://localhost:4200)
9. Use Post Man to interact with API [http://localhost:3000](http://localhost:3000)
10. Example: to get All Created Profiles
```
curl "http://localhost:3000/api/profile"
```