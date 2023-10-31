export const getVipClientsVip = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/shopping');
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de clientes VIP');
        }

        const clientes = await response.json();
        const vipClients = clientes.filter(cliente => cliente.totalAmount > 10000);
        const names = vipClients.map(cliente => cliente.username);
        const namesWithoutEmail = names.map(name => name.split('@')[0]);
        return namesWithoutEmail;
    } catch (error) {
        console.error("Error al obtener clientes VIP:", error);
        throw error;
    }
};
