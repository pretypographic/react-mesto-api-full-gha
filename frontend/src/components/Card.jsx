import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
    `element__reaction-button ${isLiked && 'element__reaction-button_active'}` 
    );

    function handleClick() {
        onCardClick({ link: card.link, name: card.name });
    }

    function handleLikeClick () {
        onCardLike({ _id: card._id, isLiked });
    }

    function handleDeleteClick() {
        onDelete({ _id: card._id })
    }

    return (
        <div className="element">
            <img
                className="element__img"
                src={card.link}
                alt={`Изображение: ${card.name}.`}
                onClick={handleClick}
            />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <button
                    className={cardLikeButtonClassName}
                    aria-label="Одобрить."
                    onMouseDown={handleLikeClick}
                >
                    {card.likes.length}</button>
            </div>
            {isOwn && <button 
                className='element__trash-button'
                aria-label="Удалить."
                onClick={handleDeleteClick}
            />}
        </div>
    )
};

export { Card }