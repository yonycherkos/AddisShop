import { Container, Row, Col } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import products from './products';
import Product from './components/Product';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container className='py-3'>
          <h2>Latest Products</h2>
          <Row>
            {products.map((product, index) => {
              return (
                <Col key={index} sm={12} md={9} lg={6} xl={3} className='py-3'>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
