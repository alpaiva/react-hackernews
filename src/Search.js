import { Form } from 'react-bootstrap'

const Search = props => {

    const { value, onChange } = props
    return (
    
            <Form>
                <Form.Control className="mb-2" placeholder="Input filter"
                    onChange={onChange}
                    value={value} />
            </Form>

    )
}

export default Search