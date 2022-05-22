
import './App.css';
import Formulario from './Components/Formulario';
import Lista from './Components/Lista';
import { useState } from 'react';

function App() {

  const [ruta,setRuta] = useState(null);
  const [cantidad,setCantidad] = useState(1);

  const cambiarRuta = (ruta) => {
    setRuta(ruta);
  }

  return (
    <div className="App">
      <Formulario cambiarRuta={cambiarRuta}/>
      <Lista cantidad={cantidad} setCantidad={setCantidad} ruta={ruta} setRuta={setRuta}/>
    </div>
  );
}

export default App;
