import { useRef } from 'react';
import { PopupWithForm } from './PopupWithForm';

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
    const linkInput = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({ link: linkInput.current.value });
    }

    return (
        <PopupWithForm 
            isOpen={isOpen}
            title='Обновить аватар'
            name='avatarSettings'
            type='popup__container_type_short'
            onSubmit={handleSubmit}
            onClose={onClose}
        >
            <input
                className="popup__input"
                placeholder="Ссылка на картинку"
                name="link"
                id="avatarSettingsLink"
                type="url"
                ref={linkInput}
                required
            />
            <span className="popup__input-warning avatarSettingsLink-warning"></span>
        </PopupWithForm>
    )
};

export { EditAvatarPopup }