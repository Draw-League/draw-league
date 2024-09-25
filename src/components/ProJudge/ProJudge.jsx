import React from 'react';
import './ProJudge.css';



function ProJudge() {
  return (
    <div className="container">
          <div className='judge-title'>
            <h2 className='jtitle-style'> JUDGE</h2>
          </div>
          <section className="judge-info">
          
                {/* <div key={judge.id}>  */}
                
       
                  <div className='judge-image'>
                   <p> JUDGE IMAGE</p>
                  </div>
    
                  <div className='judge-name'>
                    <p>JUDGE NAME</p>
                  </div>

                  
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
                {/* </div> */}
   
          </section>
        </div>
      );
    }

export default ProJudge;
