import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Paginator = () => {
  const { paginator } = useSelector((state) => state.ui);

  const ref = useRef([]);

  let desde = Math.min(Math.max(1, paginator.number - 4), paginator.pages - 5);
  let hasta = Math.max(Math.min(paginator.pages, paginator.number + 4), 6);
  if (paginator.pages > 5) {
    ref.current = new Array(hasta - desde + 1)
      .fill(0)
      .map((valor, indice) => indice + desde);
  } else {
    ref.current = new Array(paginator.pages)
      .fill(0)
      .map((valor, indice) => indice + 1);
  }

  return (
    <div>
      <ul className='pagination nav nav-pills'>
        {/* {paginator.number > 0 && ( */}
        <li className={`page-item ${paginator.number <= 0 && 'disabled'}`}>
          <Link
            className='page-link'
            to={`/clientes/page/${paginator.number - 1}`}>
            &laquo;
          </Link>
        </li>
        {/* )} */}

        <li className={`page-item ${paginator.number === 0 && 'disabled'}`}>
          <Link className='page-link ' to={`/clientes/page/0`}>
            Primera
          </Link>
        </li>

        {ref.current.map((p, x) => (
          <li key={x} className='page-item '>
            <Link className='page-link ' to={`/clientes/page/${p - 1}`}>
              {p}
            </Link>
          </li>
        ))}

        <li
          className={`page-item ${
            paginator.number === paginator.pages - 1 && 'disabled'
          }`}>
          <Link
            className='page-link '
            to={`/clientes/page/${paginator.pages - 1}`}>
            Ultima
          </Link>
        </li>

        {/* {paginator.number < paginator.pages - 1 && ( */}
        <li
          className={`page-item ${
            paginator.number >= paginator.pages - 1 && 'disabled'
          }`}>
          <Link
            className='page-link'
            to={`/clientes/page/${paginator.number + 1}`}>
            &raquo;
          </Link>
        </li>
        {/* )} */}
      </ul>
    </div>
  );
};
