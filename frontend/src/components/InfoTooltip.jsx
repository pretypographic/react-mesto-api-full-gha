import trueImg from '../images/__true.svg';
import falseImg from '../images/__false.svg';

function InfoTooltip({ isOpen, title, state, onClose }) {
    return (
        <section className={`popup ${isOpen && `popup_condition_opened`}`}>
            <div className={`popup__container`}>
                <button
                    className="close-button"
                    aria-label="Закрыть."
                    onMouseDown={onClose}
                ></button>
                <img
                    className='popup__image'
                    src={state ? trueImg : falseImg}
                    alt="Статус запроса."
                />
                <h2 className="popup__title popup__title_type_tip">{title}</h2>
            </div>
        </section>
    )
};

export { InfoTooltip }