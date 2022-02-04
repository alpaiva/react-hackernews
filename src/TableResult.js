import { Component } from "react";
import { Table, Button } from 'react-bootstrap'
const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
]
class TableResult extends Component {

    constructor(props) {
        super(props)

        this.state = { list }

        this.onDismiss = this.onDismiss.bind(this)
        
    }

    render() {
        return (<Table reponsive='sm' striped bordered hover size='sm'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Comments</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {this.state.list.map(item =>
                    <tr key={item.objectID}>
                        
                        <td>
                            <a href={item.url}>{item.title}</a>
                        </td>
                        <td>{item.author}</td>
                        <td>{item.num_comments}</td>
                        <td>{item.points}</td>
                        <td>
                            <Button variant='secondary' size='sm'
                            onClick={() => this.onDismiss(item.objectID)} >
                                Dismiss
                            </Button>
                        </td>
                    </tr>
                )
                }
            </tbody>
        </Table>)
    }

    onDismiss(id) {
        const filteredList = this.state.list.filter(item => item.objectID !== id)
        this.setState({ list: filteredList })
    }
}

export default TableResult