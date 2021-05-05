const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const  schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');
//It is used to access the data from the client side
const cors = require('cors');


//allow corss-origin requests
app.use(cors());

mongoose.connect('mongodb+srv://Avinash:mnnoNlY5vBpNq3eJ@react-blog.ddbru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.once("open", () => {
    console.log("connected to Database");
});

//Whenever url is graphql it will call graphqlHTTP to handle graphql request
app.use('/graphql', graphqlHTTP({
    //The following defines the schema ie; the graph not data
    schema, //Same as schema: schema //If both name is same use directly
    graphiql: true //It says that we want to use graphilcal tool this url
}))

app.listen(4000, () => {
    console.log("now listening for request on port 4000");
})