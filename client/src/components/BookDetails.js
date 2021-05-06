import React, { Component } from 'react';
//To access data
import { graphql } from 'react-apollo';
//Import the queries
import { getBookQuery } from '../queries/queries';


class BookDetails extends Component {   
     //console.log(this.props)
     displayBookDetails(){
        const{book} = this.props.data;
        if(book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All Books by this authors:</p>
                    <ul className="other-books">
                        {book.author.books.map(item=>{
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        }else{
            return(
                <div>No book selected...</div>
            )
        }
    }
    render() {
       
        return (
            <div id='book-details'>
                <p>Book details go here</p>
                {this.displayBookDetails()}
            </div>
        );
    }
}

//We bind the component with our query which will get the data and added in the props 
export default graphql(getBookQuery,{ //This second Prameter says if there is props then get the book details for particular Id
    options:(props)=>{
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails) ;
