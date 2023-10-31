export const getPreviousMonth = async (user) => {
    try {
        const resp = await fetch('http://localhost:8080/api/shopping');
        const data = await resp.json();

        const previousMonth = data.filter(item => item.username === user); // Cambio de nombre de la variable para evitar ambigüedad
        const previousMonthAmount = previousMonth.map(cliente => cliente.totalAmount);

        return previousMonthAmount;
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo realizar la petición');
    }
};
