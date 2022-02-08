import { Component } from "react";
import TableResult from "./TableResult";
import Search from './Search'

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

class AppContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list,
            searchTerm: ''
        }

        this.onDismiss = this.onDismiss.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
    
    }

    render() {
        const { searchTerm, list } = this.state
        return (
            <div>
                <Search value={searchTerm} onChange={this.onSearchChange} />               
                <TableResult 
                    list = {list}
                    pattern = {searchTerm}
                    onDismiss = {this.onDismiss} />
            </div>
        )
    }

    onDismiss(id) {
        const filteredList = this.state.list.filter(item => item.objectID !== id)
        this.setState({ list: filteredList })
    }

    onSearchChange(event) {
     
        this.setState({searchTerm : event.target.value})
    }

    
}

export default AppContainer