function ImagePopup({ card, onClose }) {
    return (
        <section
            className={`popup popup_type_behold ${card.link && `popup_condition_opened`}`}
            name="behold-gallery"
            id="beholdGallery"
        >
          <div className="behold markup">
              <img
                className="behold__image"
                src={card.link}
                alt={`Изображение: ${card.name}.`}
            />
              <p className="behold__name">{card.name}</p>
              <button
                className="close-button"
                aria-label="Закрыть."
                onMouseDown={onClose}
            ></button>
          </div>
        </section>
    )
};

export { ImagePopup }