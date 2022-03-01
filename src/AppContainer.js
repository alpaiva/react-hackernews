import { Component } from "react";
import TableResult from "./TableResult";
import Search from './Search'
import { Pagination } from "react-bootstrap";
import axios from 'axios'


const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page='

class AppContainer extends Component {

    _isMounted = false

    constructor(props) {
        super(props)

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null
        }

        this.onDismiss = this.onDismiss.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.setSearchTopStories = this.setSearchTopStories.bind(this)
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
    }

    componentDidMount() {
        this._isMounted = true
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm })
        this.fetchSearchTopStories(searchTerm);
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        
        const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
        axios(url)
            .then(result => this._isMounted && this.setSearchTopStories(result.data))
            .catch(error => this._isMounted && this.setState({ error }));
    }

    setSearchTopStories(result) {
        const { hits, page } = result
        const { searchKey, results } = this.state
        const oldHits = results && results[searchKey] ? results[searchKey].hits : []

        const updatedHits = [...oldHits, ...hits]

        this.setState({ results: { ...results, [searchKey]: { hits: updatedHits, page } } })

    }

    render() {

        const { searchTerm, searchKey, results, error } = this.state

        const page = results && results[searchKey] && results[searchKey].page || 0
        const list = results && results[searchKey] && results[searchKey].hits || 0

        if (error) {
            return (<div><p>Something went wrong.</p></div>)
        }

        if (!list) {
            return null
        }

        return (
            <div>
                <Search value={searchTerm}
                    onChange={this.onSearchChange}
                    onSubmit={this.onSearchSubmit} />
                <TableResult
                    list={list}
                    onDismiss={this.onDismiss} />

                <Pagination>
                    <Pagination.Next onClick={() => this.fetchSearchTopStories(searchKey, page + 1)} />
                </Pagination>
            </div>
        )
    }

    onDismiss(id) {

        const { searchKey, results } = this.state
        const { hits, page } = results[searchKey]        
        const filteredList = hits.filter(item => item.objectID !== id)

        const updatedResults = {
            ...results,
            [searchKey]: { hits: filteredList, page }
        }

        this.setState({ results : updatedResults })
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value })
    }

    onSearchSubmit(event) {
        event.preventDefault()
        const { searchTerm } = this.state
        this.setState({ searchKey: searchTerm })
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        } 
    }

    needsToSearchTopStories(searchTerm) {
        const { results } = this.state
        return !results[searchTerm]
    }

}

export default AppContainer