import { Form, Button } from 'react-bootstrap'

const Search = props => {

    const { value, onChange, onSubmit } = props
    return (

        <Form onSubmit={onSubmit}>
            <Form.Control className="mb-2" placeholder="Input filter"
                onChange={onChange}
                value={value} />
            <Button className='mb-2' variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    )
}

export default Search