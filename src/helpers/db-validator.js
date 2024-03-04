import Producto from '../producto/producto.model.js';

export const existenteProductoById = async (id = '') => {
    const existenteProducto = await Producto.findOne({ id });

    if(existenteProducto){
        throw new Error(`El producto ${id} ya fue registrado`);
    }
}
