export const CartType = (products, typeUser)=>{

    const productsCount = products.length;

    if(productsCount === 4){
        return 'Descuento del 25%';
    }else if(productsCount > 10){

        if(typeUser === 'comun'){
            return 'Descuento del $100';
        }else if(typeUser === 'fechaEspecial'){
            return 'Descuento del $300';
        }else if(typeUser === 'VIP'){
            return 'Carrito VIP';
        }
    }

    return 'Carrito comun';
}