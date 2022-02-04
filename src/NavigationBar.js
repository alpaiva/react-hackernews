import { Container, Navbar } from 'react-bootstrap'
function NavigationBar() {
    return (
        <Navbar bg='light' expand='lg' className='mb-5'>
            <Container>
                <Navbar.Brand href="#">React-HackerNews</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default NavigationBar