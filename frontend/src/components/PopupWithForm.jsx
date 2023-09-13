function PopupWithForm({ isOpen, name, type, title, button, onSubmit, onClose, children }) {
  return (
    <section
      className={`popup ${isOpen && `popup_condition_opened`}`}
      id={name}
    >
      <div className={`popup__container ${type}`}>
        <button
          className="close-button"
          aria-label="Закрыть."
          onMouseDown={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name="profile-form"
          id={`${name}Form`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__save-button"
            type="submit"
          >{button || 'Сохранить'}</button>
        </form>
      </div>
    </section>
  )
};

export { PopupWithForm }