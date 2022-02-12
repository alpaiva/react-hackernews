import { Component } from "react";
import TableResult from "./TableResult";
import Search from './Search'


const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class AppContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY
        }

        this.onDismiss = this.onDismiss.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.setSearchTopStories = this.setSearchTopStories.bind(this)
    }

    componentDidMount() {
        const { searchTerm } = this.state;

        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result.hits))
            .catch(error => error);
    }

    setSearchTopStories(result) {
        this.setState({ result })
    }

    render() {
       
        const { searchTerm, result } = this.state
        
        if (!result) {
            return null
        }
        return (
            <div>
                <Search value={searchTerm} onChange={this.onSearchChange} />
                <TableResult
                    list={result}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss} />
            </div>
        )
    }

    onDismiss(id) {
        const filteredList = this.state.result.filter(item => item.objectID !== id)
        this.setState({ result: filteredList })
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value })
    }


}

export default AppContainer