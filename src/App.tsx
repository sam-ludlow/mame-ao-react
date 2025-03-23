import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';


class MameMachines extends React.Component {


}

interface StateProperties {
  data: any;
}

const FeaturedProducts = () => {

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    let response: Response = await fetch('http://localhost:12380/api/machines?profile=arcade-good&limit=1024');

    let responseData: any = await response.json();

    setProducts(responseData.results);
  };

  const setActiveTab = async (e: any) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:12380/api/command?line=${encodeURIComponent(e.target.alt)}`);

   const result = await response.json();

    if (response.status !== 200)
      alert(result.message);

    console.log(e.target.alt);
  }

  return (
      <div>
        <h1>MAME Machines</h1>
        <div className='item-container'>
          {products.map((product: any) => (
            <div className='card' key={product.name}>
              
              <a href='#' onClick={setActiveTab}>
                <img src={'https://mame.spludlow.co.uk/snap/machine/' + product.name + '.jpg'} alt={product.name} />
              </a>
              
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>


      <FeaturedProducts />

    </div>
  );
}


export default App;
