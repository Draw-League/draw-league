import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
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
  const [refImg, setRefImg] = useState(null);

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const fileInputRef = React.createRef();

  useEffect(() => {
    setRefImg(null);
  }, [userRole]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setRefImg(file);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const uploadImage = async () => {
    if (refImg) {
      const formData = new FormData();
      formData.append('file', refImg);
      formData.append('upload_preset', import.meta.env.VITE_PRESET_NAME);
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, 
          formData
        );
        return response.data.secure_url;
      } catch (err) {
        console.error('Error uploading image:', err);
        return null;
      }
    }
    return null;
  };
  
  const registerUser = async (event) => {
    event.preventDefault();
  
    const uploadedUrl = userRole === 'ref' && refImg ? await uploadImage() : '';
  
    dispatch({
      type: 'REGISTER',
      payload: {
        userRole,
        username,
        password,
        fullName,
        refJob,
        refFact,
        artMedium,
        phoneNum,
        refImg: uploadedUrl,
      },
    });
  };
  
  return (
    <div className='register-form'>
      <form className="formPanel" onSubmit={registerUser}>
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}

        <div className="role-label">Select a role:</div>
        <div className="role-selection">
          <button
            type="button"
            className={`role-button ${userRole === 'ref' ? 'selected' : ''}`}
            onClick={() => setUserRole('ref')}
          >
            REFEREE
          </button>
          <button
            type="button"
            className={`role-button ${userRole === 'admin' ? 'selected' : ''}`}
            onClick={() => setUserRole('admin')}
          >
            ADMIN
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
          <>
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

            <div className="photo-upload-section">
              <div className="image-preview">
                {refImg ? (
                  <img
                    src={URL.createObjectURL(refImg)}
                    alt="Preview"
                  />
                ) : (
                  <span>Image Preview</span>
                )}
              </div>
              <div className="photo-text">
                <p>Please attach a photo</p>
                <button type="button" onClick={handleSelectFile}>
                  UPLOAD
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </>
        )}

        <div>
          <input className="btn" type="submit" name="submit" value="REGISTER" />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
