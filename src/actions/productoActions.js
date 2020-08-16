import Swal from 'sweetalert2';

import clienteAxios from '../config/axios';

import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,

    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTO_ERROR,

    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,

    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
} from '../types'

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() );

        try {
            // Insertar en la API
            const resultado = await clienteAxios.post('/productos', producto);

            // Si todo sale bien actualizar el state
            dispatch( agregarProductoExito(resultado.data) );

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            // Si hay un error cambiar el state
            dispatch( agregarProductoError(true) );

            // Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intentálo de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

// Si el producto se guarda en la BD
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// Si hubo un error
const agregarProductoError = ( estado ) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado,
})



// Función que descarga los productos del API
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa(respuesta.data) );
        } catch (error) {
            dispatch( descargaProductosError() );
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTO_ERROR,
    payload: true
});




// Selecciona y elimina producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );
            
            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se eliminó correctamente',
                'success'
            )
        } catch (error) {
            dispatch( eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id,
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true,
})




// Colocar producto en edición
export function obtenerProductoEditar (producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) );
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto());

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            dispatch(editarProductoError());
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = producto =>  ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto,
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
})