import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../images/__logo.svg';
import { HeaderSupport } from './HeaderSupport';

function Header({ loggedIn, optionsOpen, email, handleLinkClick, onOptionsClick }) {
  let location = useLocation();
  const [src, setSrc] = useState('');
  const [linkName, setLinkName] = useState('');

  useEffect(() => {
    if (location.pathname === '/sign-in') {
      setSrc('/sign-up');
      setLinkName('Регистрация');
    }
    if (location.pathname === '/sign-up') {
      setSrc('/sign-in');
      setLinkName('Войти');
    }
    if (location.pathname === '/') {
      setSrc('/sign-in');
      setLinkName('Выйти');
    }
  }, [location])

  return (
    <>
      {optionsOpen && <HeaderSupport
        email={email}
        src={src}
        linkName={linkName}
        handleClick={handleLinkClick}
        type='mobile'
      />}
      <header className="header markup">
        <img
          className="header__logo"
          src={logo}
          alt="Mesto. Россия."
        />
        {loggedIn && <HeaderSupport
          email={email}
          src={src}
          linkName={linkName}
          handleClick={handleLinkClick}
          type='wide'
        />}
        {!loggedIn
          ? <HeaderSupport
            email={email}
            src={src}
            linkName={linkName}
            handleClick={handleLinkClick}
          />
          : <button
            className={`header__button ${optionsOpen && 'header__button_pressed'}`}
            onClick={onOptionsClick}
          ></button>}
      </header>
    </>
  )
};

export { Header }