import React, { Component } from 'react';
//To access data
//compose allow us to use multiple queries to be use with one component
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
//Import the queries which we will use 
//1.getAuthorsQuery: to get the author data     2.addBookMutation to add new Book
//getBooksQuer: IS used to re fetch the book data after nwe book added and show in ui
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
constructor(props){
    super(props);
    this.state = { //in this we keep track of different value of add book form
        name: '',
        genre: '',
        authorId: ''
    }
}

   displayAuthors(){
       var data = this.props.getAuthorsQuery;
        //console.log(this.props.getAuthorsQuery);
       if(data.loading){
           return <option>Loading Authors...</option>
       }
       else{
           return data.authors.map(author => {
               return <option key={author.id} value={author.id}>{author.name}</option>
           })
       }
   }

   submitForm(e){
       e.preventDefault();
       //console.log(this.state);
       //We use the props attr to get the Mutaion variable and add the new book data
       this.props.addBookMutation({
           variables:{
               name: this.state.name,
               genre: this.state.genre,
               authorId: this.state.authorId
           },
           //Re fetch the book data ato show the Added new book in UI without refresh
           refetchQueries:[{query:getBooksQuery}]
       })
   }

    render() {
        console.log(this.props)
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) =>{this.setState({name: e.target.value})}} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text"  onChange={(e) =>{this.setState({genre: e.target.value})}} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select  onChange={(e) =>{this.setState({authorId: e.target.value})}} >
                    <option>Select author</option>
                    { this.displayAuthors() }
                </select>
            </div>
            <button>+</button>

        </form>
        );
    }
}

//We bind the component with our query which will get the data and added in the props 
//Used when we have only one query
// export default graphql(getAuthorsQuery)(AddBook) ;
//Used to combine multiple queries with our component
export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
    )(AddBook) ;
