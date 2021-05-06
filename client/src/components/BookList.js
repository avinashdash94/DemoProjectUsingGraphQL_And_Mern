import React, { Component } from 'react';
//To access data
import { graphql } from 'react-apollo';
//Import the queries
import { getBooksQuery } from '../queries/queries';
//It is same as we make query in graphical we use in browser


class BookList extends Component {
    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            return <div>Loading books... </div>
        }
        else{
           return  data.books.map(book => {
                return(
                    <li key={book.id}>{book.name}</li>
                )
            });
        }
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
            </div>
        );
    }
}

//We bind the component with our query which will get the data and added in the props 
export default graphql(getBooksQuery)(BookList) ;