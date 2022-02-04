import { Container, Table } from 'react-bootstrap'

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
function App() {
  const welcome = 'Welcome'
  const user = { name: 'user', lastname: 'lastname' }
  return (
    <div>
      <h1>{welcome}</h1>
      <h2>{user.lastname}</h2>
      <Container fluid='md'>
        <Table reponsive='sm' striped bordered hover size='sm' mt='20'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Comments</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => {
              return (
                <tr>
                  <td>
                    <a href={item.url}>{item.title}</a>
                  </td>
                  <td>{item.author}</td>
                  <td>{item.num_comments}</td>
                  <td>{item.points}</td>
                </tr>
              )
            })
            }
          </tbody>
        </Table>
      </Container>

    </div>
  )
}

export default App;
