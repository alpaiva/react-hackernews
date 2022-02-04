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
      {list.map(item => {
        return (
          <div>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        )
      })
      }
    </div>
  )
}

export default App;
