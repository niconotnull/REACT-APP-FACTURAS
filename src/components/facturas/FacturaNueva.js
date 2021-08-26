import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { startBillSave, startProductos } from '../../actions/factura';
import { useForm } from '../../hooks/useForm';

export const FacturaNueva = () => {
  const dispatch = useDispatch();
  const { clientActive } = useSelector((state) => state.client);
  const [autoCompleteProductos, setAutoCompleteProductos] = useState([]);
  const [items, setItems] = useState([]);
  const [granTotal, setGranTotal] = useState(0);

  const [formValues, handleFormValuesChange] = useForm({
    descripcion: '',
    observacion: '',
  });

  const { descripcion, observacion } = formValues;

  const handleInputChange = async (event, value) => {
    if (value !== '') {
      const response = await dispatch(startProductos(value));

      if (!!response) {
        setAutoCompleteProductos(response);
      }
    }
  };

  const handleChangeProducto = (value) => {
    console.log('value ', value);
    if (!!value && value !== '') {
      if (items.length === 0) {
        value.cantidad = 1;
        value.total = value.precio;
        value.producto = { id: value.id };
        setItems([value, ...items]);
      } else {
        buscarActualizarProducto(value);
      }
    }
  };

  const buscarActualizarProducto = (producto) => {
    const pro = items.find((e) => e.id === producto.id);

    if (!!pro) {
      pro.cantidad += 1;
      pro.total = pro.cantidad * pro.precio;
      items.filter((e) => (e.id === producto.id ? pro : e));
      setItems([...items]);
    } else {
      producto.cantidad = 1;
      producto.total = producto.precio;
      producto.producto = { id: producto.id };
      setItems([producto, ...items]);
    }
  };

  const handleChangeCantidad = ({ target }, id) => {
    const cantidad = target.value;
    const pro = items.find((e) => e.id === id);
    if (!!pro) {
      console.log('cantidi es ceror ', cantidad);
      if (parseInt(cantidad) === 0) {
        setItems([...items.filter((p) => p.id !== id)]);
      } else {
        pro.cantidad = cantidad;
        pro.total = cantidad * pro.precio;
        items.filter((e) => (e.id === id ? pro : e));
        setItems([...items]);
      }
    }
  };

  useEffect(() => {
    let total = 0;

    items.forEach((i) => (total += i.cantidad * i.precio));

    setGranTotal(total);
  }, [items]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    setItems([...items.filter((p) => p.id !== id)]);
  };

  const handleSaveFactura = (e) => {
    e.preventDefault();

    const save = {
      cliente: {
        apellido: clientActive.apellido,
        createAt: clientActive.createAt,
        email: clientActive.email,
        id: clientActive.id,
        nombre: clientActive.nombre,
        urlFoto: clientActive.urlFoto,
        urlFoto2: clientActive.urlFoto2,
      },
      createAt: new Date().getTime(),
      descripcion: formValues.descripcion,
      id: 0,
      items: [...items],
      observacion: formValues.observacion,
      total: 0,
    };

    if (
      formValues.descripcion.length === 0 ||
      formValues.observacion.length === 0
    ) {
      Swal.fire(
        'Error',
        'No puede ir vacia la Descripción y/o la Observación de la factura!',
        'error'
      );
    } else {
      dispatch(startBillSave(save));
    }
  };

  return (
    <div className='card bg-light'>
      <div className='card-header bg-success mb-3 '>Titulo: Nueva factura</div>
      <div className='card-body'></div>
      <form onSubmit={handleSaveFactura}>
        <div className='form-group row'>
          <label className='col-sm-2  col-fomr-label'>Cliente</label>
          <div className='col-sm-6'>
            <input
              type='text'
              name='cliente'
              value={`${clientActive.nombre} ${clientActive.apellido}`}
              className='form-control'
              disabled
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2  col-fomr-label'>Descripción</label>
          <div className='col-sm-6'>
            <input
              type='text'
              name='descripcion'
              value={descripcion}
              onChange={handleFormValuesChange}
              className='form-control'
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2  col-fomr-label'>Observacion</label>
          <div className='col-sm-6'>
            <textarea
              name='observacion'
              value={observacion}
              onChange={handleFormValuesChange}
              className='form-control'></textarea>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-sm-6'>
            <Autocomplete
              id='combo-box-demo'
              options={autoCompleteProductos}
              getOptionLabel={(option) => option.nombre}
              getOptionSelected={(option, value) => option.nombre}
              style={{ width: 250 }}
              onChange={(event, value) => handleChangeProducto(value)}
              onInputChange={handleInputChange}
              renderInput={(params) => (
                <TextField {...params} label='Productos' variant='outlined' />
              )}
            />
          </div>
        </div>
        {items.length === 0 ? (
          <div className='alert alert-info'>
            No hay líneas asignadas para la factura. Debe agregar por lo menos
            una!
          </div>
        ) : (
          <>
            <table className='table  table-striped table-hover table-bordered my-3'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {items.map((e) => {
                  return (
                    <tr key={e.id}>
                      <td>{e.nombre}</td>
                      <td>{e.precio}</td>
                      <td>
                        <input
                          type='number'
                          value={e.cantidad}
                          className='form-control col-sm-4'
                          onChange={(event) =>
                            handleChangeCantidad(event, e.id)
                          }
                        />
                      </td>
                      <td>{e.total}</td>
                      <td>
                        <button
                          className='btn btn-danger  btn-sm'
                          onClick={(event) => handleDelete(event, e.id)}>
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h5 className='float-right'>
              Gran total:
              <span className='badge badge-secondary'>{granTotal}</span>
            </h5>
          </>
        )}
        <div className='form-group row'>
          <div className='col-sm-6'>
            <button type='submit' className='btn btn-secondary'>
              Crear Factura
            </button>
          </div>
        </div>
        `
      </form>
    </div>
  );
};
