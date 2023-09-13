import { useEffect, useState } from 'react';
import { PopupWithForm } from './PopupWithForm';

function AddLocationPopup({ isOpen, onAddLocation, onClose }) {
  const [ name, setName ] = useState('');
  const [ link, setLink ] = useState('');

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddLocation({ name, link });
  };

  useEffect(() => {
    setName('');
    setLink('');
  }, [onClose]);

  return (
    <PopupWithForm 
      isOpen={isOpen} 
      title='Новое место' 
      name='newLocation' 
      type={false} 
      button='Создать' 
      onSubmit={handleSubmit} 
      onClose={onClose}
    >
      <input
        className="popup__input"
        placeholder="Название"
        name="name"
        id="locationName"
        value={name}
        type="text"
        maxLength="30"
        minLength="2"
        onChange={onChangeName}
        required
      />
      <span className="popup__input-warning locationName-warning"></span>
      <input 
        className="popup__input"
        placeholder="Ссылка на картинку"
        name="link"
        id="locationLink"
        value={link}
        type="url"
        onChange={onChangeLink}
        required />
      <span className="popup__input-warning locationLink-warning"></span>
    </PopupWithForm>
  );
};

export { AddLocationPopup }