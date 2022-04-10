import { useState, useEffect } from "react";
import TableResult from "./TableResult";
import Search from './Search'
import { Pagination } from "react-bootstrap";
import axios from 'axios'

export default function AppContainerHook(props) {
    const DEFAULT_QUERY = 'redux'
    const PATH_BASE = 'https://hn.algolia.com/api/v1';
    const PATH_SEARCH = '/search';
    const PARAM_SEARCH = 'query=';
    const PARAM_PAGE = 'page='
    
    let [results, setResults] = useState(null)
    let [searchKey, setSearchKey] = useState(DEFAULT_QUERY)
    let [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY)
    let [error, setError] = useState(null)

    useEffect(() => {
        fetchSearchTopStories(searchTerm)
    }, [])
    
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
            {(
                <div>
                    <Search value={searchTerm}
                        onChange={onSearchChange}
                        onSubmit={onSearchSubmit} />
                    <TableResult
                        list={list}
                        onDismiss={onDismiss} />
                    <Pagination>
                        <Pagination.Next onClick={() => fetchSearchTopStories(searchKey, page + 1)} />
                    </Pagination>
                </div>
            )}
        </div>
    )

    function fetchSearchTopStories(searchTerm, page = 0) {
        const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
        axios(url)
            .then(result => setSearchTopStories(result.data))
            .catch(error => setError({ error }));
    }

    function setSearchTopStories(result) {
        const { hits, page } = result
        const oldHits = results && results[searchTerm] ? results[searchTerm].hits : []
        const updatedHits = [...oldHits, ...hits]
        const updatedResults = { [searchTerm]: { hits: updatedHits, page } } 
        setSearchKey(searchTerm)
        setResults(updatedResults)
    }

    function onDismiss(id) {
        const { hits, page } = results[searchKey]
        const filteredList = hits.filter(item => item.objectID !== id)

        const updatedResults = {
            ...results,
            [searchKey]: { hits: filteredList, page }
        }

        setResults(updatedResults)
    }

    function onSearchChange(event) {
        setSearchTerm(event.target.value)
    }

    function onSearchSubmit(event) {
        event.preventDefault()
        if (needsToSearchTopStories(searchTerm)) {
            fetchSearchTopStories(searchTerm);
        }
    }

    function needsToSearchTopStories(searchTerm) {
        return !results[searchTerm]
    }
}