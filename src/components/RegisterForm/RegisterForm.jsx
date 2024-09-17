import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [refFact, setRefFact] = useState('');
  const [artMedium, setArtMedium] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        fullName: fullName,
        occupation: occupation,
        refFact: refFact,
        artMedium: artMedium,
        phoneNum: phoneNum,

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
      <div>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            value={username}
            placeholder='EMAIL'
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
      <div>
        <label htmlFor="occupation">
          <input
            type="text"
            name="occupation"
            value={occupation}
            placeholder='OCCUPATION'
            required
            onChange={(event) => setOccupation(event.target.value)}
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
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
