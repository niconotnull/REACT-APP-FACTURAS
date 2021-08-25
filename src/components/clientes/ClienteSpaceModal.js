import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {
  uiStartCloseModalCliente,
  uiStartProgressUpload,
} from '../../actions/ui';
import icono from '../../assets/images/usuario-upload.jpg';
import { uploadStartImageProgress } from '../../actions/upload';
import { clientsActive } from '../../actions/client';
import { FacturasScreen } from '../facturas/FacturasScreen';
import { startBillClear } from '../../actions/factura';

const customStyles = {
  content: {
    top: '40%',
    left: '60%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-10%',
    transform: 'translate(-10%, -20%)',
  },
};

const initEvent = {
  id: '',
  nombre: '',
  apellido: '',
  email: 'prueba@hotmail.com',
  createAt: '',
  urlFoto: '',
  urlFoto2: '',
};

Modal.setAppElement('#root');

export const ClienteSpaceModal = () => {
  const dispatch = useDispatch();
  const { modalOpenCliente, progress } = useSelector((state) => state.ui);
  const { clientActive } = useSelector((state) => state.client);
  const [progressValue, setProgressValue] = useState(progress);

  const [initCliente, setinitCliente] = useState(initEvent);

  const { nombre, apellido, createAt, urlFoto2 } = initCliente;
  const noteDate = moment(createAt);

  useEffect(() => {
    if (clientActive) {
      setinitCliente(clientActive);
    }
  }, [clientActive]);

  useEffect(() => {
    setProgressValue(progress);
  }, [progress, setProgressValue]);

  const handleCloseModal = () => {
    dispatch(clientsActive());
    dispatch(uiStartCloseModalCliente());
    dispatch(uiStartProgressUpload(0));
    dispatch(startBillClear());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type?.indexOf('image') < 0) {
      handleCloseModal();
      Swal.fire('Error', 'El archivo debe de ser de tipo imagen', 'error');
    } else {
      if (file) {
        // dispatch(uploadStartImage(file, clientActive));
        readFile(e);
        dispatch(uploadStartImageProgress(file, clientActive));
      }
    }
  };

  const handlePinctureClick = () => {
    document.querySelector('#fileSelector2').click();
  };

  const readFile = (e) => {
    var selectedFile = e.target.files[0];
    var reader = new FileReader();
    var imgtag = document.getElementById('imageCliente');
    imgtag.title = selectedFile.name;
    reader.onload = function (e) {
      imgtag.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <Modal
      isOpen={modalOpenCliente}
      // isOpen={true}
      // onAfterClose={afterOpenModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel='Example Modal'
      className='modalFacturas'
      overlayclassName='modal-fondo'>
      <input
        id='fileSelector2'
        type='file'
        name='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div
        className='card mb-3'
        style={{ maxWidth: '840px', maxHeight: '1040px' }}>
        <div className='row g-0'>
          <div className='col-md-4'>
            <img
              id='imageCliente'
              src={
                urlFoto2 !== null
                  ? `http://localhost:8080/api/client/upload/image/${urlFoto2}`
                  : icono
              }
              className='img-fluid rounded-start pointer'
              alt='...'
              onClick={handlePinctureClick}
            />
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title'>
                {nombre} {apellido}
              </h5>
              <FacturasScreen />
              <p className='card-text'>
                <small className='text-muted'>
                  {noteDate.format('MMMM Do YYYY, h:mm:ss a')}
                </small>
              </p>
            </div>
            {progress !== 0 && (
              <div className='progress'>
                <div
                  className='progress-bar progress-bar-striped'
                  role='progressbar'
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin='0'
                  aria-valuemax='100'>
                  {progress}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
