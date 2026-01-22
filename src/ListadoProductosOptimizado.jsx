import { useState, useCallback, useMemo } from 'react';
// Componente memo que solo re-renderiza si props cambian
const ProductoItem = ({ producto, onToggleFav }) => {
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
};
// Memorizar el componente
const ProductoItemMemo = React.memo(ProductoItem);
// Con optimización
export function ListadoProductosOptimizado({ productos }) {
  const [filtro, setFiltro] = useState('');
  const [orden, setOrden] = useState('nombre');
  const [favoritos, setFavoritos] = useState({});
  // Memoizar la función (solo se crea si favoritos cambia)
  const handleToggleFav = useCallback((id) => {
    setFavoritos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);
  // Memoizar el filtrado y ordenamiento
  const filtrados = useMemo(() => {
    console.log('Filtrando y ordenando...');
    return productos
      .filter(p => p.nombre.includes(filtro))
      .sort((a, b) => {
        if (orden === 'nombre') return 
a.nombre.localeCompare(b.nombre);
        return a.precio - b.precio;
      });
  }, [productos, filtro, orden]);
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
<ProductoItemMemo
key={p.id}
producto={p}
onToggleFav={handleToggleFav}
/>
))}
</div>
);
}