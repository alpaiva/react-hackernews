import { Component } from "react";
import TableResult from "./TableResult";
import Search from './Search'
import { Pagination } from "react-bootstrap";


const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page='

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
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
    }

    componentDidMount() {
        const { searchTerm } = this.state;

        this.fetchSearchTopStories(searchTerm);
    }

    fetchSearchTopStories(searchTerm, page = 0) {

        const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
        fetch(url)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
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
        const page = result.page || 0
        return (
            <div>
                <Search value={searchTerm}
                    onChange={this.onSearchChange}
                    onSubmit={this.onSearchSubmit} />
                <TableResult
                    list={result.hits}
                    onDismiss={this.onDismiss} />

                <Pagination>
                    <Pagination.Next onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)} />
                </Pagination>
            </div>
        )
    }

    onDismiss(id) {
        const filteredList = this.state.result.hits.filter(item => item.objectID !== id)

        const result = { ...this.state.result, hits: filteredList }

        this.setState({ result })
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value })
    }

    onSearchSubmit(event) {
        event.preventDefault()
        const { searchTerm } = this.state
        this.fetchSearchTopStories(searchTerm);
    }


}

export default AppContainer