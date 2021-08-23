import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import validator from 'validator';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiStartCloseModal, uiStartUploadImage } from '../../actions/ui';
import icono from '../../assets/images/usuario-upload.jpg';
import {
  clientsActive,
  clientStartSave,
  clientStartUpdate,
} from '../../actions/client';

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-10%',
    transform: 'translate(-50%, -50%)',
  },
};

const initEvent = {
  nombre: '',
  apellido: '',
  email: 'prueba@hotmail.com',
  urlFoto: null,
  urlFoto2: null,
};

Modal.setAppElement('#root');

export const ClienteModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { clientActive } = useSelector((state) => state.client);

  const [formValues, setFormValues] = useState(initEvent);

  const [emailValid, setEmailValid] = useState(true);

  const { nombre, apellido, email, urlFoto } = formValues;

  useEffect(() => {
    if (clientActive) {
      setFormValues(clientActive);
    } else {
      setFormValues(initEvent);
    }
  }, [setFormValues, clientActive]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      if (clientActive) {
        console.log('formValues ', formValues);
        dispatch(clientStartUpdate(formValues));
      } else {
        dispatch(clientStartSave(formValues));
      }

      const message = clientActive
        ? 'Se actualizo correctamente'
        : 'Se guardo correctamente';
      Swal.fire('Correcto', message, 'success');
    }
  };

  const isValidForm = () => {
    if (!validator.isEmail(email)) {
      setEmailValid(false);
      return false;
    } else {
      setEmailValid(true);
    }

    return true;
  };

  const closeModal = () => {
    dispatch(uiStartCloseModal());
    // setFormValues(initEvent);
  };

  const afterOpenModal = () => {
    dispatch(clientsActive(null));
  };

  const handlePinctureClick = () => {
    // dispatch(clientsActive(c));
    document.querySelector('#fileSelector1').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uiStartUploadImage({ file, url: '' }));
      readFile(e);
    }
  };

  const readFile = (e) => {
    var selectedFile = e.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById('myimage');
    imgtag.title = selectedFile.name;

    reader.onload = function (e) {
      imgtag.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <Modal
      isOpen={modalOpen}
      onAfterClose={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel='Example Modal'
      className='modal'
      overlayClassName='modal-fondo'>
      <input
        id='fileSelector1'
        type='file'
        name='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <img
        id='myimage'
        onClick={() => handlePinctureClick()}
        src={urlFoto !== null ? urlFoto : icono}
        className='pointer img-thumbanail img-circle float-sm-right  '
        alt='nass'
      />
      {clientActive ? <h1> Actualizar Cliente </h1> : <h1> Nuevo Cliente </h1>}

      <hr />
      <form className='container' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Nombre</label>
          <input
            type='text'
            className='form-control'
            placeholder='Nombre'
            autoComplete='off'
            name='nombre'
            value={nombre}
            onChange={handleInputChange}
          />
        </div>

        <div className='form-group'>
          <label>Apellido</label>
          <input
            type='text'
            className='form-control'
            placeholder='Apellido'
            autoComplete='off'
            name='apellido'
            value={apellido}
            onChange={handleInputChange}
          />
        </div>

        <hr />
        <div className='form-group'>
          <label>Email</label>
          <input
            type='text'
            className={`form-control ${!emailValid && 'is-invalid'}`}
            placeholder='Email'
            autoComplete='off'
            name='email'
            value={email}
            onChange={handleInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>

          {clientActive ? <span> Actualizar</span> : <span> Guardar</span>}
        </button>
      </form>
    </Modal>
  );
};
