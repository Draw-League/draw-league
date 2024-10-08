import React, { useState } from 'react';
import './EditEvent.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AdminNav from '../AdminNav/AdminNav';
import Select from 'react-select';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';



function EditEvent() {
  const refs = useSelector((store) => store.getRefsReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const event = useSelector((store) => store.currentGame);
  const { id } = useParams();

  
  useEffect(() => {
    dispatch({ type: "FETCH_ONE_EVENT", payload: event });
  }, []);
console.log('event from reducer:', event);

  const [newEvent, setNewEvent] = useState({
    theme: `${event.theme}`,
    promptOne: `${event.prompt_one}`,
    promptTwo: `${event.prompt_two}`,
    promptThree: `${event.prompt_three}`,
    eventDate: `${event.event_date}`,
    eventCode: `${event.event_code}`,
    locationName: `${event.location_name}`,
    locationAddress: `${event.location_address}`,
    judgeName: `${event.judge_name}`,
    judgeJob: `${event.judge_job}`,
    judgeLike: `${event.judge_like}`,
    judgeKnow: `${event.judge_know}`,
    judgeImg: `${event.judge_img}`,
    judgeCode: `${event.judge_code}`,
    refId: `${event.user_id}`,
    eventId: `${event.event_id}`
  });

  //Judge image file upload
  const [judgeImgFile, setJudgeImgFile] = useState(null);
  const fileInputRef = React.createRef();

  //Dispatches Refs saga for ref dropdown
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
  }, []);

  //populates ref dropdown
  const refOptions = refs.map((ref) => ({
    value: ref.id,
    label: ref.full_name
  }));

  console.log('refoptions', refOptions)
  const uploadImage = async () => {
    if (judgeImgFile) {
      const formData = new FormData();
      formData.append('file', judgeImgFile);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setJudgeImgFile(file);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };



  const updateEvent = async (event) => {
    event.preventDefault();

    const uploadedImgUrl = await uploadImage();

    setNewEvent((prevEvent) => ({
      ...prevEvent,
      judgeImg: uploadedImgUrl || '',
    }));

    dispatch({
      type: 'EDIT_CURRENT_GAME',
      payload: { ...newEvent, judgeImg: uploadedImgUrl || newEvent.judgeImg },
    });

    setNewEvent({
      theme: '',
      promptOne: '',
      promptTwo: '',
      promptThree: '',
      eventDate: '',
      eventCode: '',
      locationName: '',
      locationAddress: '',
      judgeName: '',
      judgeJob: '',
      judgeLike: '',
      judgeKnow: '',
      judgeImg: '',
      judgeCode: '',
      refId: '',
    });
    history.push("/admindash");
  };

  // deals with select ref
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleRefChange = (selectedOptions) => {
    setNewEvent({ ...newEvent, refId: selectedOptions[0].value });
  };

  return (
    <div className="adminnav">
      <AdminNav />
      <br />
      <br />


      <div className="container-edit-event">

        <div className="edit-event-form">
          <div className='edit-event-title'>
            <h3 className='edit-event-title-style'>Event Details</h3>
          </div>
        
          <form onSubmit={updateEvent}>
            <div className='edit-event-input-form'>
              <div className='edit-event-details'>
                <input
                  className='edit-date-box'
                  type="date"
                  
                  name="eventDate"
                  value={newEvent.eventDate}
                  onChange={(event) => setNewEvent({ ...newEvent, eventDate: event.target.value })}
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Location Name"
                  name="locationName"
                  value={newEvent.locationName}
                  onChange={(event) => setNewEvent({ ...newEvent, locationName: event.target.value })}
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Location Address"
                  name="locationAddress"
                  value={newEvent.locationAddress}
                  onChange={(event) => setNewEvent({ ...newEvent, locationAddress: event.target.value })}
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Theme"
                  name="theme"
                  value={newEvent.theme}
                  onChange={(event) => setNewEvent({ ...newEvent, theme: event.target.value })}
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Prompt One"
                  name="promptOne"
                  value={newEvent.promptOne}
                  onChange={(event) => setNewEvent({ ...newEvent, promptOne: event.target.value })}
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Prompt Two"
                  name="promptTwo"
                  value={newEvent.promptTwo}
                  onChange={(event) => setNewEvent({ ...newEvent, promptTwo: event.target.value })}
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Prompt Three"
                  name="promptThree"
                  value={newEvent.promptThree}
                  onChange={(event) => setNewEvent({ ...newEvent, promptThree: event.target.value })}
                />
                <br />
                <br />
              </div>



              <div className='edit-staff-detail'>
               
                <Select
                  className='edit-ref-select-dropdown'
                  placeholder='---SELECT REF---'
                  options={refOptions}
                  onChange={handleRefChange}
                  isMulti={true}
                />

                {selectedOptions[0] ? console.log('selectedOptions[0].value', selectedOptions[0].value) : console.log('not selected')}

                <br />
                <br />
                <input
                  type="text"
                  placeholder="Judge's Name"
                  name="judgeName"
                  value={newEvent.judgeName}
                  onChange={(event) => setNewEvent({ ...newEvent, judgeName: event.target.value })}
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Judge's Job"
                  name="judgeJob"
                  value={newEvent.judgeJob}
                  onChange={(event) => setNewEvent({ ...newEvent, judgeJob: event.target.value })}
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Judge Likes"
                  name="judgeLike"
                  value={newEvent.judgeLike}
                  onChange={(event) => setNewEvent({ ...newEvent, judgeLike: event.target.value })}
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Judge Knows"
                  name="judgeKnow"
                  value={newEvent.judgeKnow}
                  onChange={(event) => setNewEvent({ ...newEvent, judgeKnow: event.target.value })}
                />

                <div className="photo-upload-section">
                  <div className="image-preview">
                    {judgeImgFile ? (
                      <img
                        src={URL.createObjectURL(judgeImgFile)}
                        alt="Judge Preview"
                      />
                    ) : (
                      <span>Judge's Image Preview</span>
                    )}
                  </div>
                  <div className="photo-text">
                    <p>Please attach a Judge's picture</p>
                    <button type="button" onClick={handleSelectFile}>
                      UPLOAD
                    </button>
                    <br />
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />

                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className='update-event-btn'>
              <button onClick={updateEvent} type="submit" className="btn_desktop">UPDATE</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default EditEvent;