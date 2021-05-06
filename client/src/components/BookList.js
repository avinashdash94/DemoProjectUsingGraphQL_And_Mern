import React, { Component } from 'react';
//To access data
import { graphql } from 'react-apollo';
//Import the queries
import { getBooksQuery } from '../queries/queries';


//components
import BookDetails from './BookDetails';

class BookList extends Component {

    constructor(props){
        super(props);
        this.state = {
            //It will keep track of book id which is selected
            selected: null
        }
    }

    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            return <div>Loading books... </div>
        }
        else{
           return  data.books.map(book => {
                return(
                    <li key={book.id} onClick={(e)=>{this.setState({selected: book.id})}}>{book.name}</li>
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
                {/* We pass the props for selected Id to show the details of book */}
                <BookDetails bookId={this.state.selected}/>
            </div>
        );
    }
}

//We bind the component with our query which will get the data and added in the props 
export default graphql(getBooksQuery)(BookList) ;