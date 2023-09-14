import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Card } from './Card';

function Main({ cards, onEditProfile, onAddLocation, onEditAvatar, onCardClick, onCardLike, onDelete }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main markup">
            <section className="profile">
                <div className="profile__field">
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt="Аватар профиля."
                    />
                    <button
                        className="profile__avatar-edit"
                        aria-label="Изменить аватар."
                        onMouseDown={onEditAvatar}
                    ></button>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button"
                            aria-label="Редактировать профиль."
                            onMouseDown={onEditProfile}
                        ></button>
                        <p className="profile__mission">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    className="profile__add-button"
                    aria-label="Добавить изображение."
                    onMouseDown={onAddLocation}
                ></button>
            </section>
            {/* профиль */}

            <section className="elements">
                {cards.map((card, i) => (
                    <Card
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onDelete={onDelete}
                        key={card._id}
                    />
                ))}
                {/* элемент альбома */}
            </section>
            {/* альбом */}
        </main>
    )
};

export { Main }