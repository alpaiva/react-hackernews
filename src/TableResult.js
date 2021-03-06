import { Table, Button } from 'react-bootstrap'


const TableResult = props => {

    const { list, onDismiss } = props

    return (

        <Table reponsive='sm' striped bordered hover size='sm'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Comments</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {list
                    .map(item =>
                        <tr key={item.objectID}>
                            <td>
                                <a href={item.url}>{item.title}</a>
                            </td>
                            <td>{item.author}</td>
                            <td>{item.num_comments}</td>
                            <td>{item.points}</td>
                            <td>
                                <Button variant='secondary' size='sm'
                                    onClick={() => onDismiss(item.objectID)} >
                                    Dismiss
                                </Button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>

    )

}

export default TableResult