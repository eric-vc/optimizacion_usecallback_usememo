import { useState } from 'react';
// Componente hijo que se re-renderiza siempre
function ProductoItem({ producto, onToggleFav }) {
console.log('Renderizando:', producto.nombre);
return (
<div className="producto">
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <button onClick={() => onToggleFav(producto.id)}>
        {producto.favorito ? '❤️' : ' '} Favorito
      </button>
    </div>
  );
}
// Sin optimización
export function ListadoProductos({ productos }) {
  const [filtro, setFiltro] = useState('');
  const [orden, setOrden] = useState('nombre');
  const [favoritos, setFavoritos] = useState({});
  // Se crea NUEVA función en cada render
  const handleToggleFav = (id) => {
    setFavoritos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  // Se filtra y ordena en CADA render
  const filtrados = productos
    .filter(p => p.nombre.includes(filtro))
    .sort((a, b) => {
      if (orden === 'nombre') return 
a.nombre.localeCompare(b.nombre);
      return a.precio - b.precio;
    });
  return (
    <div>
      <input
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Buscar..."
/>
<select value={orden} onChange={(e) => 
setOrden(e.target.value)}>
<option value="nombre">Nombre</option>
<option value="precio">Precio</option>
</select>
{filtrados.map(p => (
<ProductoItem
key={p.id}
producto={p}
onToggleFav={handleToggleFav}
/>
))}
</div>
);
}