import logo from './logo.svg';
import './App.css';
import { ListadoProductos } from './ListadoProductos.jsx';

function App() {
  return (
    <div className="App">
      <ListadoProductos productos={[
        { id: 1, nombre: 'Camisa', precio: 20, favorito: false },
        { id: 2, nombre: 'Pantalones', precio: 40, favorito: true },
        { id: 3, nombre: 'Zapatos', precio: 60, favorito: false },
        { id: 4, nombre: 'Sombrero', precio: 15, favorito: true },
        { id: 5, nombre: 'Chaqueta', precio: 80, favorito: false },
      ]} />
    </div>
  );
}

export default App;
