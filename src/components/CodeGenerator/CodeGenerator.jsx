import React from 'react';

 
 
 function GenerateRandomString() {
    let codeLength = 4;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&?';
    let eventCode = ''; 
    let judgeCode = '';
    
    const charactersLength = characters.length;
    
    for (let i = 0; i < codeLength; i++) {
        const eventIndex = Math.floor(Math.random() * charactersLength);
        const judgeIndex = Math.floor(Math.random() * charactersLength);
        {
        eventCode += characters[eventIndex];
        judgeCode += characters[judgeIndex];
        }
    }
    
    return {eventCode, judgeCode};
     
}
console.log(GenerateRandomString());

export default GenerateRandomString;



