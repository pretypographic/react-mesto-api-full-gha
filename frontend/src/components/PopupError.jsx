function PopupError() {
    return (
        <section className="popup" id="error">
          <div className="popup__container popup__container_type_short">
              <button aria-label="Закрыть." className="close-button"></button>
              <h2 className="popup__title">Атас, дух машины одержим демоном!</h2>
              <p className="popup__text">Сохраняйте спокойствие! На невидимом фронте отряды бесстрашных 
                  программистов самоотверженно сопротивляются этому нашествию. 
                  Перезагрузите страницу или обратитесь за помощью к специально обученному 
                  экзорцисту.</p>
          </div>
        </section>
    )
};

export { PopupError }