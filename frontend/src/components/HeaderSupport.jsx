import { Link } from 'react-router-dom';

function HeaderSupport({ email, src, handleClick, linkName, type }) {
    return (
        <div className={`header__support ${type && `header__support_type_${type}`}`}>
            {email && <p className='header__text'>{email}</p>}
            <Link to={src} className='header__link' onClick={handleClick}>{linkName}</Link>
        </div>
    )
};

export { HeaderSupport }