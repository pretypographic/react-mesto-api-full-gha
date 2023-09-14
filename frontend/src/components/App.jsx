import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// реакт
import '../index.css';
// стили
import {
  getProfileInfo,
  patchProfileInfo,
  patchProfileAvatar,
  getInitialCards,
  postNewCard,
  deleteCard,
  putLike,
  deleteLike,
  errorMessege,
} from '../front-api';
import { authorize, register, getContent } from '../auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// операции
import { ProtectedRoute } from './ProtectedRoute';
// НОС
import { Register } from './Register';
import { Login } from './Login';
import { InfoTooltip } from './InfoTooltip';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddLocationPopup } from './AddLocationPopup';
import { ImagePopup } from './ImagePopup';
import { PopupError } from './PopupError';
// компоненты

function App() {
  const [token, setToken] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true)
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [InfoTooltipText, setInfoTooltipText] = React.useState('');
  const [InfoTooltipState, setInfoTooltipState] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddLocationPopupOpen, setAddLocationPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUserProfile, setCurrentUserProfile] = React.useState({});
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();
  let location = useLocation();

  function handleRegistration(form) {
    register(form)
      .then(() => {
        navigate('/sign-in', { replace: true });
        setInfoTooltipState(true);
        setInfoTooltipText('Вы успешно зарегистрировались!');
        setInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipState(false);
        setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipOpen(true);
      });
  };
  // регистрация

  function handleLogin(form, resetChange) {
    if (!form.email || !form.password) {
      return;
    }
    authorize(form)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          handleTokenCheck();
        }
        navigate('/', { replace: true });
        resetChange();
      })
      .catch((err) => console.log(err));
  };
  // вход

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const thisToken = localStorage.getItem('token');
      setToken(thisToken);
      getContent(thisToken)
        .then((data) => {
          if (data) {
            setEmail(data.email);
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        })
    } else {
      setIsLoading(false);
    }
  };
  // проверка жетона

  function logOut() {
    localStorage.removeItem('token');
    setToken('');
    setLoggedIn(false);
    handleTokenCheck();
  };
  // выход

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };
  function handleUpdateProfile(profile) {
    patchProfileInfo(token, profile)
      .then((updatedProfile) => {
        setCurrentUserProfile(updatedProfile);
        closeAllPopups();
      })
      .catch(errorMessege);
  };
  // редактирование профиля

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };
  function handleUpdateAvatar({ link }) {
    patchProfileAvatar(token, link)
      .then((updatedProfile) => {
        setCurrentUserProfile(updatedProfile);
        closeAllPopups();
      })
      .catch(errorMessege);
  };
  // редактирование аватара

  function handleAddLocationClick() {
    setAddLocationPopupOpen(true);
  };
  function handleAddLocation(card) {
    postNewCard(token, card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(errorMessege);
  };
  // добавление карточки

  function closeAllPopups() {
    setInfoTooltipOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddLocationPopupOpen(false);
    setSelectedCard({});
  };
  // закрытие всплывающих окон

  function handleCardClick(card) {
    setSelectedCard(card);
  };
  // открытие карточки

  function handleCardLike(card) {
    if (!card.isLiked) {
      putLike(token, card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(errorMessege);
    } else {
      deleteLike(token, card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(errorMessege);
    }
  };
  function handleDelete(card) {
    deleteCard(token, card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(errorMessege);
  };
  // возможности карточки

  function handleOptionsClick() {
    setOptionsOpen(!optionsOpen);
  }

  React.useEffect(() => {
    handleTokenCheck(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // проверить жетон

  React.useEffect(() => {
    Promise.all([getProfileInfo(token), getInitialCards(token)])
      .then(([profile, cards]) => {
        setCurrentUserProfile(profile);
        setCards(cards);
      })
      .catch(errorMessege);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])
  // загрузить пользовательские данные

  if (isLoading) {
    return (
      <div className='loading'>
        <p className='loading__indicator'></p>
      </div>
    )
  }

  return (
    <CurrentUserContext.Provider value={currentUserProfile}>
      <div className='root'>
        <Header
          loggedIn={loggedIn}
          optionsOpen={optionsOpen}
          email={email}
          handleLinkClick={logOut}
          onOptionsClick={handleOptionsClick}
        />

        <Routes>
          <Route path='/' element={<ProtectedRoute
            element={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddLocation={handleAddLocationClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onDelete={handleDelete}
          />} />
          <Route path='/sign-up' element={<Register handleRegistration={handleRegistration} />} />
          <Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
        </Routes>
        {/* разворот */}

        {location.pathname === '/' && <Footer />}
        {/* нижний колонтитул */}

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          title={InfoTooltipText}
          state={InfoTooltipState}
          onClose={closeAllPopups}
        />
        {/* предупреждение */}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateProfile={handleUpdateProfile}
          onClose={closeAllPopups}
        />
        {/* форма профиля */}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        {/* форма обновления аватара */}

        <AddLocationPopup
          isOpen={isAddLocationPopupOpen}
          onAddLocation={handleAddLocation}
          onClose={closeAllPopups}
        />
        {/* форма добавления элемента в альбом */}

        <PopupWithForm
          title='Вы уверены?'
          name='confirmDelete'
          type='popup__container_type_delete'
          button='Да'
          onClose={closeAllPopups}
        />
        {/* окно удаления */}

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        {/* режим просмотра */}

        <PopupError />
        {/* ошибка */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
