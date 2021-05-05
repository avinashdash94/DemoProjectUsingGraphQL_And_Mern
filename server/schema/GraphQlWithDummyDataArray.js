//**This file will tell us how our schema (ghaphical repersentaion of data) will look
const graphql = require("graphql");
//Added lodash: It allows us to find data, chnage data from array
const _ = require('lodash');

//We destruture GraphQLObjectType from graphql
const {GraphQLObjectType,
     GraphQLString, 
     GraphQLSchema,
     GraphQLID,
     GraphQLInt,
     GraphQLList
} = graphql;

//Dummy data of type books
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

//dummy data of type author
var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

//Creating our object Type(Schema) which we use
//For this it is a Book type object 
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ 
        id: {type: GraphQLID}, // we define we want id field of Graphql Id type Which means not need to be string  it could be integer
        name: {type: GraphQLString}, // GraphQl string type
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){  //Is responsible for looking at the actual data and return what is needed
            //In parent all the parent data is availble here for us it is Book
                console.log(parent)
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

//For this it is a Author type object 
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({ 
        id: {type: GraphQLID}, // we define we want id field of Graphql Id type Which means not need to be string  it could be integer
        name: {type: GraphQLString}, // GraphQl string type
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType), // it is a list of Book type as author can have many books
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})// filter books having parent Id = authors id fro  AuthorsType
            }
        }

    })
})

//Defining Requeries how to get initially graph data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType, //We define the type as BookType which we defined above
            args: {id: {type: GraphQLID}}, //I want to query of book  type based on Id which is of Id type Which means not need to be string  it could be integer
            resolve(parent, args){//In this funtion we write the code to get data from db/other source
                console.log(typeof(args.id));
                return  _.find(books,{id:args.id}); //find book with id 
            }
        },
        
        author: { //If we want specific type author
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return  _.find(authors,{id:args.id});
            }
        },

        books:{ //To find all books
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        
        authors:{ //To find all authours data
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }

    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})
