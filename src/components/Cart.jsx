import { useEffect, useState } from "react";

export const Cart = ({ carrito, eliminarProducto, cliente, vaciarCarrito, user }) => {

    const [timer, settimer] = useState(null);

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

    // Función para calcular el total a pagar
    const calcularTotal = () => {
        const cantidadProductos = carrito.length;

        if (cantidadProductos === 4) {
            return totalAPagar * 0.75; // Aplica el descuento del 25%
        } else if (cantidadProductos > 10) {

            let descuento = 0;
            // Si el gastó el mes anterior fue mayor a 10000, aplica el descuento de $500
            if (cliente === 'vip') {
                descuento = 500;
            } else if (cliente === 'promocional') {
                descuento = 300;
            }
            return totalAPagar - descuento;
        }

        return totalAPagar; // Si no se cumple la condición, devuelve el total sin descuento
    }

    const handlePagarClick = () => {
        // Obtener el carrito único con productos únicos
        const carritoUnico = [...new Set(carrito)];

        // Crear un objeto para rastrear la cantidad de cada producto en la compra
        const cantidadPorProducto = {};

        const totalPorProducto = {};

        // Recorrer el carrito único y contar la cantidad de cada producto
        carritoUnico.forEach((productoUnico) => {
            const cantidad = carrito.filter((p) => p.id === productoUnico.id).length;
            cantidadPorProducto[productoUnico.id] = cantidad;
            totalPorProducto[productoUnico.id] = cantidad * productoUnico.price;
        });

        // Calcular el total de la compra sumando el total de cada producto
        const total = Object.values(totalPorProducto).reduce((total, precio) => total + precio, 0);

        // Crear una lista de productos con sus cantidades
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
        <div>
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
                <ul>
                    {carritoUnico.map((producto) => {
                        const cantidad = carrito.filter((p) => p.id === producto.id).length;
                        return (
                            <li key={producto.id + '_' + Math.random()}>
                                {producto.name} - ${producto.price}
                                <p>{cantidad}</p>
                                <button onClick={() => eliminarProducto(producto)}>Eliminar</button>
                            </li>
                        );
                    })}
                </ul>
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





