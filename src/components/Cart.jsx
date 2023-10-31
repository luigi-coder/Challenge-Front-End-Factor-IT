import { useEffect, useState } from "react";

export const Cart = ({ carrito, eliminarProducto, cliente, vaciarCarrito, user }) => {

    const [timer, settimer] = useState(null);

    // STARTTIMER con los 4 useEffects destruyen el carrito a las 24hs de inactividad en el carrito

    // Función para iniciar el temporizador
    const startTimer = () => {

        const timerId = setTimeout(() => {
            vaciarCarrito();
        }, 2 * 60 * 60 * 1000);

        settimer(timerId);
    }

    // Defino un estado timer que inicie un temporizador cuando se monte el componente
    useEffect(() => {
        startTimer();
    }, [])


    // Efecto que reinicia el temporizador cada vez que el cliente realiza una accion en el carrito
    useEffect(() => {
        startTimer();
    }, [carrito, vaciarCarrito]);

    // Efecto que limpia el temporizador cuando el componente se desmonta para evitar memory leaks o fugas de memoria
    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonta
            }
        };
    }, [timer]);


    // Elimina los productos duplicados del carrito
    const carritoUnico = [...new Set(carrito)];

    let totalAPagar = carritoUnico.reduce((total, producto) => {
        const cantidad = carrito.filter((p) => p.id === producto.id).length;
        return total + producto.price * cantidad;
    }, 0);

    const calcularTotal = () => {
        const cantidadProductos = carrito.length;

        if (cantidadProductos === 4) {
            return totalAPagar * 0.75;
        } else if (cantidadProductos > 10) {

            let descuento = 0;

            if (cliente === 'vip') {
                descuento = 500;
            } else if (cliente === 'promocional') {
                descuento = 300;
            }
            return totalAPagar - descuento;
        }

        return totalAPagar;
    }

    const handlePagarClick = () => {

        const carritoUnico = [...new Set(carrito)];

        const cantidadPorProducto = {};

        const totalPorProducto = {};

        carritoUnico.forEach((productoUnico) => {
            const cantidad = carrito.filter((p) => p.id === productoUnico.id).length;
            cantidadPorProducto[productoUnico.id] = cantidad;
            totalPorProducto[productoUnico.id] = cantidad * productoUnico.price;
        });


        const total = Object.values(totalPorProducto).reduce((total, precio) => total + precio, 0);

        const compra = {
            isVip: cliente,
            lastPurchaseDate: new Date().toISOString(),
            username: user,
            totalAmount: total,
        }
        registrarCompra(compra);

        vaciarCarrito();
    };

    const registrarCompra = async (compra) => {

        try {
            const response = await fetch('http://localhost:8080/api/shopping/add', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compra),
            });

            if (response.ok)
                alert('La compra se registró correctamente.');

            if (response.status === 400)
                alert('No se pudo registrar la compra.');

        } catch (error) {
            alert('No se pudo registrar la compra.');
        }
    }

    return (
        <div
            style={{
                marginBottom: '3rem',
            }}
        >
            <div style={{
                width: '40%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                marginTop: '2rem',
            }}>
                <h2>Carrito de Compras {cliente}</h2>

                <button
                    onClick={vaciarCarrito}
                >Vaciar el carrito</button>
            </div>
            {carritoUnico.length > 0 ? (
                <table style={{ width: '100%', border: '4px solid red' }}>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carritoUnico.map((producto) => {
                            const cantidad = carrito.filter((p) => p.id === producto.id).length;
                            return (
                                <tr
                                style={{
                                    textAlign: 'center',
                                }} 
                                key={producto.id + '_' + Math.random()}>
                                    <td>{producto.name}</td>
                                    <td>${producto.price}</td>
                                    <td>{cantidad}</td>
                                    <td>
                                        <button onClick={() => eliminarProducto(producto)}>Eliminar</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>El carrito está vacío.</p>
            )}
            <p>Total a pagar con descuento: ${calcularTotal().toFixed(2)}</p>
            <p>Total a pagar sin descuento ${totalAPagar.toFixed(2)}</p>
            <br />
            <button
                onClick={() => handlePagarClick()}
            >PAGAR</button>
        </div>
    );
};





