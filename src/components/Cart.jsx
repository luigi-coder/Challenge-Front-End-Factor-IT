import { useState } from 'react';

export const Cart = ({ carrito, eliminarProducto, cliente, vaciarCarrito }) => {

    console.log(cliente);

    //const [cliente, setCliente] = useState('comun');
    // Esto tiene que venir de la base de datos de una tabla con el historial de compras del cliente
    const gastoMesAnterior = 12000;

    // Elimina los productos duplicados del carrito
    const carritoUnico = [...new Set(carrito)];

    let totalAPagar = carritoUnico.reduce((total, producto) => {
        const cantidad = carrito.filter((p) => p.id === producto.id).length;
        return total + producto.precio * cantidad;
    }, 0);

    // Función para calcular el total a pagar
    const calcularTotal = () => {
        //const productosUnicos = [...new Set(carrito.map((p) => p.id))];
        const cantidadProductos = carrito.length;

        if (cantidadProductos === 4) {
            return totalAPagar * 0.75; // Aplica el descuento del 25%
        }else if(cantidadProductos > 10){

            let descuento = 0;
            // Si el gastó el mes anterior fue mayor a 10000, aplica el descuento de $500
            if(cliente === 'VIP'){
                descuento = 500;
            }else if(cliente === 'Promocional'){
                descuento = 300;
            }
            return totalAPagar - descuento;
        }

        return totalAPagar; // Si no se cumple la condición, devuelve el total sin descuento
    }


    return (
        <div>
            <div style={{
                width: '40%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
            }}>
                <h2>Carrito de Compras</h2>
                <button
                    onClick={vaciarCarrito}
                >Vaciar el carrito</button>
            </div>
            {carritoUnico.length > 0 ? (
                <ul>
                    {carritoUnico.map((producto) => {
                        const cantidad = carrito.filter((p) => p.id === producto.id).length;
                        return (
                            <li key={producto.id + '_' + Math.random()}>
                                {producto.nombre} - ${producto.precio}
                                <p>{cantidad}</p>
                                <button onClick={() => eliminarProducto(producto)}>Eliminar</button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>El carrito está vacío.</p>
            )}
            <p>Total a pagar con descuento: ${calcularTotal()}</p>
            <p>Total a pagar sin descuento ${totalAPagar}</p>
            <br />
            <button>PAGAR</button>
        </div>
    );
};

