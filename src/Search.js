import { Component } from 'react'
import { Form } from 'react-bootstrap'

class Search extends Component {

    render() {
        const { value, onChange } = this.props
        return (
            <Form>
                <Form.Control className="mb-2" placeholder="Input filter"
                    onChange={onChange}
                    value={value} />
            </Form>

        )
    }
}

export default Search