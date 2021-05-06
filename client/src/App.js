import React, { Component } from 'react';
//Used to interact with graphQl
import ApolloClient from 'apollo-boost';
//React-apollo binds the react app with apollo
//It will wrap the our app and enject data we recive from server into our app
import{ ApolloProvider } from 'react-apollo';
//components 
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

//apollo client setup to interact with GraphQL which is runing on server side
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

class App extends Component {

  render() {
      return (
        // ApolloProvider take data from the url and inject in our app
        <ApolloProvider client={client}>
          <div id="main">
            <BookList />
            <AddBook/>
          </div>
       </ApolloProvider>
      );
  }
}


export default App;
