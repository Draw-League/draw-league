import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './ProRef.css';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProRef() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ref = useSelector(store => store.projectionReducer);
  // const history = useHistory(); 

  useEffect(() => {
    dispatch({ type: "FETCH_REF", payload: id });
  }, [id, dispatch]);

  return (
<div className="container">
      <div className='ref-title'>
        <h2 className='ref-title-style'> REFEREE</h2>
      </div>
      <section className="ref-info">
        {/* {refDetails.map((ref) => (  */}
            <div key={ref.id}> 
              <div className='ref-image'>
               <p> {ref.ref_img}</p>
              </div>

              <div className='ref-name'>
                <p>{ref.full_name}</p>
              </div>

              <div className='ref-facts'>
                <p className='ref-style'>{ref.ref_job}</p>
                <p className='ref-style'>{ref.fact}</p>
                <p className='ref-style'>{ref.art_medium}</p>
              </div>
            </div>
          {/* ))
        } */}
      </section>
    </div>
  );
}

export default ProRef;
