//**This file will tell us how our schema (ghaphical repersentaion of data) will look
const graphql = require("graphql");
//Added lodash: It allows us to find data, chnage data from array
const _ = require('lodash');
//Import our created Models
const Book = require('../models/book');
const Author = require('../models/author');


//We destruture GraphQLObjectType from graphql
const {GraphQLObjectType,
     GraphQLString, 
     GraphQLSchema,
     GraphQLID,
     GraphQLInt,
     GraphQLList,
     GraphQLNonNull
} = graphql;


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
                console.log(parent);
                return Author.findById(parent.authorId)
                //return _.find(authors, {id: parent.authorId})
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
                return Book.find({authorId: parent.id})
                //return _.filter(books, {authorId: parent.id})// filter books having parent Id = authors id fro  AuthorsType
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
                return  Book.findById(args.id);
                //return  _.find(books,{id:args.id}); //find book with id 
            }
        },
        
        author: { //If we want specific type author
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id);
               // return  _.find(authors,{id:args.id});
            }
        },

        books:{ //To find all books
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({})
               // return books;
            }
        },
        
        authors:{ //To find all authours data
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({})
               // return authors;
            }
        }

    }
})



//It allows us to change our data: like edit, deleted, etc
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type:  new GraphQLNonNull(GraphQLString) },
                age: { type:  new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
