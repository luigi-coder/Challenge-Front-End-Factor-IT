import React from 'react';

const url = "https://jumboargentina.vtexassets.com/arquivos/ids";
const url_final = "width=1200&height=auto&aspect=true";

const IMG = [
  `${url}/785391-1200-auto?v=638224401724370000&${url_final}`,
  `${url}/650829-800-auto?v=637595827005770000${url_final}`,
  `${url}/775568-1200-auto?v=638163166382270000&${url_final}`,
  `${url}/583079-1200-auto?v=637234676563270000&${url_final}`,
  `${url}/583176-1200-auto?v=637234676944900000&${url_final}`,
  `${url}/669159-1200-auto?v=637686238873700000&${url_final}`,
  `${url}/650830-1200-auto?v=637595827012200000&${url_final}`,
  `${url}/771561-1200-auto?v=638132062494330000&${url_final}`,
  `${url}/339834-1200-auto?v=636439394855070000&${url_final}`,
  `${url}/785407-1200-auto?v=638224401806200000&${url_final}`,
  `${url}/339730-1200-auto?v=636439391281970000&${url_final}`
]

export const ProductList = ({ productos, agregarAlCarrito }) => {
  return (
    <>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap', 
        gap: '20px', 
        justifyContent: 'space-between',
        marginTop: '50px'
      }}>
        {productos.map((producto, index) => (
          <div key={producto.id} style={{
            width: '300px', 
            border: '1px solid #ccc', 
            padding: '10px',
          }}>
            <img
              src={`${IMG[index]}`}
              alt={producto.name}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <div>
              <p>{producto.name} - ${producto.price}</p>
              <button onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

