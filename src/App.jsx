import { useEffect, useState } from "react"
import { Cart } from "./components/Cart"
import { ProductList } from "./components/ProductList";


function App() {

  const [productos, setProductos] = useState([]);
  const [cliente, setCliente] = useState('comun');
  const fechaEspecial = new Date();

  const getProductFetch = async () => {

    try {

      const resp = await fetch('http://localhost:3000/products');
      const data = await resp.json();
      setProductos(data);

      // Suponiendo que gastoMesAnterior es el valor obtenido de algún lugar por ejemplo de una base de datos
      const gastoMesAnterior = 12000;

      // Verificar si es un día especial 28 de octubre el cliente es promocional
      if (fechaEspecial.getDate() === 28 && fechaEspecial.getMonth() === 9) {
        setCliente('Promocional');
      } else {
        // Verificar si el gasto del mes anterior es mayor que 10000
        if (gastoMesAnterior > 10000) {
          setCliente('VIP'); // Actualizar el estado del cliente a "VIP"
        }
        // Si el cliente en un determinado mes no realizó compras, se le asigna el estado "comun"
        if (gastoMesAnterior === 0) {
          setCliente('comun');
        }
      }



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
    // Busca el índice del producto en el carrito
    const index = carrito.findIndex((p) => p.id === producto.id);

    if (index !== -1) {
      // Clonar el carrito para evitar mutaciones directas
      const nuevoCarrito = [...carrito];

      // Elimina el producto del carrito usando splice
      nuevoCarrito.splice(index, 1);

      // Actualiza el estado del carrito
      setCarrito(nuevoCarrito);
    }
  }

  const vaciarCarrito = () => {
    setCarrito([]);
  }

  return (
    <>
      <h1>Ecommerce Challenge Factor IT</h1>
      <h2>Carrito : {cliente}</h2>
      <ProductList productos={productos} agregarAlCarrito={agregarAlCarrito} />
      <Cart
        carrito={carrito}
        eliminarProducto={eliminarProducto}
        cliente={cliente}
        vaciarCarrito={vaciarCarrito}
      />
    </>
  )
}

export default App
