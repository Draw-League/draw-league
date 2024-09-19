import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css';

function RegisterForm() {
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [refJob, setRefJob] = useState('');
  const [refFact, setRefFact] = useState('');
  const [artMedium, setArtMedium] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [refImg, setRefImg] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();


    dispatch({
      type: 'REGISTER',
      payload: {
        userRole: userRole,
        username: username,
        password: password,
        fullName: fullName,
        refJob: refJob,
        refFact: refFact,
        artMedium: artMedium,
        phoneNum: phoneNum,
        refImg: refImg,
        

      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
            <div className="role-selection">
              Select a role:
              <br />
        <button
          type="button"
          className={`role-button ${userRole === 'admin' ? 'selected' : ''}`}
          onClick={() => setUserRole('admin')}
        >
          ADMIN
        </button>
        <button
          type="button"
          className={`role-button ${userRole === 'ref' ? 'selected' : ''}`}
          onClick={() => setUserRole('ref')}
        >
          REF
        </button>
      </div>
     
      <div>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            value={username}
            placeholder='USERNAME (EMAIL)'
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            value={password}
            placeholder='PASSWORD'
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="fullName">
          <input
            type="text"
            name="fullName"
            value={fullName}
            placeholder='FULL NAME'
            required
            onChange={(event) => setFullName(event.target.value)}
          />
        </label>
      </div>
    

      {userRole === 'ref' && (
        <div>
<div>
        <label htmlFor="refJob">
          <input
            type="text"
            name="refJob"
            value={refJob}
            placeholder='OCCUPATION'
            required
            onChange={(event) => setRefJob(event.target.value)}
          />
        </label>
        </div>
        <div>
        <label htmlFor="refFact">
          <input
            type="text"
            name="refFact"
            value={refFact}
            placeholder='FUN FACT'
            required
            onChange={(event) => setRefFact(event.target.value)}
          />
        </label>
      </div>
        <div>
        <label htmlFor="artMedium">
          <input
            type="text"
            name="artMedium"
            value={artMedium}
            placeholder='ART MEDIUM'
            required
            onChange={(event) => setArtMedium(event.target.value)}
          />
        </label>
        </div>
  
      <div>
        <label htmlFor="phoneNum">
          <input
            type="text"
            name="phoneNum"
            value={phoneNum}
            placeholder='PHONE NUMBER'
            required
            onChange={(event) => setPhoneNum(event.target.value)}
          />
        </label>
      </div>
        </div>
      )}

<div>
        <label htmlFor="refImg">
          <input
            type="text"
            name="refImg"
            value={refImg}
            placeholder='REF IMG'
            onChange={(event) => setRefImg(event.target.value)}
          />
        </label>
      </div>
      
    


      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
