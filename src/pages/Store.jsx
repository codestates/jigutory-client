import React from 'react';
import '../styles/Store.scss';
import Loading from '../components/Loading';


function Store(props) {
  return (
    <>
      {<Loading />}
      <div className="store-container">
        store
    </div>
    </>
  )
}

export default Store;
