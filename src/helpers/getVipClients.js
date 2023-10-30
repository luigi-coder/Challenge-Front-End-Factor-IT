export const getVipClients = async (compra_anterior) => {
    const response = await fetch('http://localhost:3000/compras')
    const compras = await response.json()
    const clientes = compras.forEach(element => {
        // filtrame todos los clientes que tengas una compra anterior mayor a 300000
        console.log(element.filter(compra => compra.total > compra_anterior))
    });
    return clientes;
} 