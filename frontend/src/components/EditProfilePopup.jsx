import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupWithForm } from './PopupWithForm';

function EditProfilePopup({ isOpen, onUpdateProfile, onClose }) {
  const [ name, setName ] = useState('');
  const [ about, setAbout ] = useState('');
  const currentUserProfile = useContext(CurrentUserContext);

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeAbout(event) {
    setAbout(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateProfile({ name, about });
  }

  useEffect(() => {
    setName(currentUserProfile.name);
    setAbout(currentUserProfile.about);
  }, [currentUserProfile, isOpen]); 

  return (
    <PopupWithForm
      isOpen={isOpen}
      title='Редактировать профиль'
      name='profileSettings'
      type={false}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        className="popup__input"
        placeholder="Напишите имя"
        name="name"
        id="profileName"
        value={name}
        type="text"
        maxLength="40"
        minLength="2"
        onChange={onChangeName}
        required />
      <span className="popup__input-warning profileName-warning"></span>
      <input
        className="popup__input"
        placeholder="Напишите миссию"
        name="about"
        id="profileMission"
        value={about}
        type="text"
        maxLength="200"
        minLength="2"
        onChange={onChangeAbout}
        required
      />
      <span className="popup__input-warning profileMission-warning"></span>
    </PopupWithForm>
  )
};

export { EditProfilePopup }