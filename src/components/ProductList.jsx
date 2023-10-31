import React from 'react';

export const ProductList = ({ productos, agregarAlCarrito }) => {
  return (
    <div>
      <h2>Productos Disponibles</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.name} - ${producto.price}
            <button onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

