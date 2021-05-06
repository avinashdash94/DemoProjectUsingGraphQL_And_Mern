//GraphQl Looks like javascript but it is not so we have to parse it
//gql is use to parse
import {gql} from 'apollo-boost';

//It is same as we make query in graphical we use in browser
const getBooksQuery = gql`{
    books{      
        name
        id
      }
    }
`

const getAuthorsQuery = gql`{
    authors{      
        name
        id
      }
    }
`

//It is used for mutation means it will add the new book data in the DB using GraphQl
//$name: is query variable to get dynamic data and send these data to Db
//String!: means non empty type string
const addBookMutation = gql`
  mutation($name:String!, $genre:String!, $authorId:ID!){
    addBook(name:$name, genre:$genre, authorId:$authorId){
      name
      id
    }

}`;

export {getBooksQuery, getAuthorsQuery, addBookMutation}