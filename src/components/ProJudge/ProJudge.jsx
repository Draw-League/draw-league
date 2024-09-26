import React from 'react';
import './ProJudge.css';



function ProJudge() {
  return (
    <div className="container">
          <div className='judge-title'>
            <h2 className='jtitle-style'> JUDGE</h2>
          </div>

          <div className="judge-info">
       
       <div className='name-info'>
                  <div className='judge-image'>
                   
                   <img alt="placeholder image" 
                   src ='https://images.unsplash.com/photo-1565194637906-8f45f3351a5d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                  </div>
    
                  <div className='judge-name'>
                  <h3 className='question-style'>JUDGE NAME</h3>
                  </div>
        </div>

           <div className ="questions">     
                  <div className='judge-question-one'>
                    <h3 className='question-style'>WHAT DO YOU DO?</h3>
                  </div>
                  <div className='judge-answer'>
                    <h3 className='answer-style'>Answer</h3>
                  </div>

                  <div className='judge-question-two'>
                    <h3 className='question-style'>WHAT DO YOU LIKE?</h3>
                  </div>
                  <div className='judge-answer-two'>
                    <h3 className='answer-style'>Answer two</h3>
                  </div>

                  <div className='judge-question-three'>
                    <h3 className='question-style'>WHAT DO YOU KNOW?</h3>
                  </div>
                  <div className='judge-answer-three'>
                    <h3 className='answer-style'>Answer three</h3>
                  </div>
                  </div>  
   
          </div>
        </div>
      );
    }

export default ProJudge;
