import React from 'react';
import './ProBest.css';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProBest() {

  const winners = useSelector((store) => store.adminDashReducer);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch({ type: 'FETCH_WINNERS' });
  }, [dispatch]);

  return (
    <div className="container">
      <div>
        <p>This the projector best drawing</p>
        <section className="ref-info">
        {winners.map((winner) => ( 
            <div key={winner.id}> 
              <div className='ref-image'>
               <p> {winner.location_name}</p>
              </div>
            </div>
          ))
        }
      </section>
        <p>This will get</p>
      </div>
    </div>
  );
}

export default ProBest;
