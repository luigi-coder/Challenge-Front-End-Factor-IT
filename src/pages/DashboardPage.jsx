import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { Cart } from "../components/Cart"
import { ProductList } from "../components/ProductList";
import { getVipClientsVip } from "../helpers/getVipClientsVip";
import { getPreviousMonth } from "../helpers/getPreviousMonth";

const DashboardPage = () => {


    const { state } = useLocation();
    const [productos, setProductos] = useState([]);
    const [cliente, setCliente] = useState('comun');
    const fechaEspecial = new Date();
    const [clientesVip, setClientesVip] = useState([]);
    const [mostrarClientesVip, setMostrarClientesVip] = useState(false);

    const ocultarClientes = () => {
        setMostrarClientesVip(false);
    };

    const useFetchClientsVip = async () => {
        const clientsVip = await getVipClientsVip();
        setClientesVip(clientsVip);
        setMostrarClientesVip(true);
    }

    const getProductFetch = async () => {

        try {

            const resp = await fetch('http://localhost:8080/api/products');
            const data = await resp.json();
            setProductos(data);

        } catch (error) {
            console.log(error);
            throw new Error('No se pudo realizar la petición');
        }
    }

    useEffect(() => {
        getProductFetch();
    }, [])

    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };

    const eliminarProducto = (producto) => {
      
        const index = carrito.findIndex((p) => p.id === producto.id);

        if (index !== -1) {
           
            const nuevoCarrito = [...carrito];
            
            nuevoCarrito.splice(index, 1);

            setCarrito(nuevoCarrito);
        }
    }

    const vaciarCarrito = () => {
        setCarrito([]);
    }

    useEffect(() => {
        // Verificar si es el 24 de diciembre
        if (fechaEspecial.getDate() === 32 && fechaEspecial.getMonth() === 9) {
            setCliente('Promocional');
        }
    }, [fechaEspecial]);

    useEffect(() => {
        const fetchDataForPreviousMonth = async (user) => {
            try {
                console.log("Obteniendo datos del mes anterior...");
                console.log("Usuario:", state?.user);
                const previousMonthData = await getPreviousMonth(user);
                
                if(previousMonthData[0] > 10000){
                    setCliente('vip');
                }else {
                    setCliente('comun');
                }
              


            } catch (error) {
                console.error("Error al obtener los datos del mes anterior:", error);
            }
        };

        fetchDataForPreviousMonth(state?.user);
    }, []); 

    return (
        <>
            <div>
            <h1>Ecommerce Challenge Factor IT</h1>
            <div style={{
                width: '40%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <button
                    onClick={useFetchClientsVip}
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '10px',
                        border: 'none'
                    }}
                >Clientes VIP</button>
                <button onClick={ocultarClientes}>❌</button>
            </div>
            {
                mostrarClientesVip && clientesVip.length > 0 && (
                    <div>
                        <h3>Clientes VIP</h3>
                        <ul>
                            {
                                clientesVip.map((cliente, index) => (
                                    <li
                                        style={{ textTransform: 'capitalize' }}
                                        key={index}>{cliente}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }

            <h2>Productos Disponibles</h2>
            
            <ProductList 
            style={{
                width: '100%',
                marginLeft: '100px',
                
            }}
            productos={productos} 
            agregarAlCarrito={agregarAlCarrito} />

            <Cart
                carrito={carrito}
                eliminarProducto={eliminarProducto}
                cliente={cliente}
                vaciarCarrito={vaciarCarrito}
                user={state?.user}
            />
            </div>
            
        </>
    )
}

export default DashboardPage;