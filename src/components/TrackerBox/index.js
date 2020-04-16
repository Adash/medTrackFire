import React, { useState } from 'react';
import 'styled-components/macro';

const MeditationCard = ({
  thisMed,
  uid,
  inputField,
  handleNewValueChange,
  onKeyPress,
  handleSubmit,
  removeMedbox,
}) => (
  <div
    key={uid}
    className="card-body text-center"
    css={`
      background-color: #c7def9;
      width: 100%;
    `}
  >
    <h5 className="card-title">{thisMed.meditationName} </h5>
    <h6 className="card-subtitle mb-2 text-muted">{thisMed.meditationType} </h6>
    <p className="card-text">{thisMed.repetitions} </p>
    <div className="input-group mb-3">
      <input
        className="form-control"
        name="newRepetitions"
        type="text"
        value={inputField}
        onChange={(event) => handleNewValueChange(event, uid)}
        onKeyPress={(event) => onKeyPress(event, thisMed)}
      ></input>
      <div className="input-group-append">
        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={() => handleSubmit(thisMed)}
        >
          {' '}
          add mantras
        </button>
      </div>
      <button
        className="btn btn-outline-danger"
        onClick={() => removeMedbox(uid)}
      >
        remove
      </button>
    </div>
  </div>
);

const TrackerBox = ({ meditations, user, removeMedbox, addNewValue }) => {
  const [box, setBox] = useState({});

  const handleSubmit = (thisMed) => {
    addNewValue(box[thisMed.uid], thisMed, user);
  };

  const onKeyPress = (event, thisMed) => {
    if (event.key === 'Enter') {
      handleSubmit(thisMed);
    }
  };

  const handleNewValueChange = (event, uid) => {
    const value = parseInt(event.target.value, 10);
    setBox({ [uid]: value });
  };

  return (
    <div
      css={`
        grid-area: mb;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(auto-fill, 200px);
        grid-gap: 5px;
        padding: 5px;
        justify-items: right;
      `}
    >
      {meditations
        .filter((element) => element.userID === user.uid)
        .map((thisMed, index) => {
          const { uid } = thisMed;
          const inputField = box[uid] ? box[uid] : '';

          return (
            <MeditationCard
              thisMed={thisMed}
              uid={uid}
              inputField={inputField}
              handleNewValueChange={handleNewValueChange}
              onKeyPress={onKeyPress}
              handleSubmit={handleSubmit}
              removeMedbox={removeMedbox}
            />
          );
        })}
    </div>
  );
};

export default TrackerBox;
