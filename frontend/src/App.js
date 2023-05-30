import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container className='py-3'>
          <h2>Welcome to AddisShop</h2>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
