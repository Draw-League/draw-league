import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './ProRef.css';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProRef() {
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const refDetails = useSelector(store => store.projectionReducer);
  // const history = useHistory(); 

  // useEffect(() => {
  //   dispatch({ type: "FETCH_REFS", payload: id });
  // }, [id, dispatch]);


  return (
<div className="container">
      <div className='ref-title'>
        <h2 className='ref-title-style'> REFEREE</h2>
      </div>
      <div className="ref-info">
        {/* {refDetails.map((ref) => (  */}
            {/* <div key={ref.id}>  */}
              <div className='ref-image'>
               {/* <p> {ref.ref_img}</p> */}
               <img alt="placeholder image" 
                   src ='https://images.unsplash.com/photo-1565194637906-8f45f3351a5d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
              
              </div>

              <div className='ref-name'>
                {/* <p>{ref.full_name}</p> */}
                <p className='rname-style'>ref name</p>
              </div>

              <div className='ref-facts'>
              <p className='ref-style'>ref facts</p>
                {/* <p className='ref-style'>{ref.ref_job}</p>
                <p className='ref-style'>{ref.fact}</p>
                <p className='ref-style'>{ref.art_medium}</p> */}
              </div>
            {/* </div> */}
          {/* ))
        } */}
       
      </div> 
      

    </div>
  );
}

export default ProRef;
