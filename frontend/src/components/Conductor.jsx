import { useCoductorForm } from '../hooks/useCoductorForm';
import { Link } from 'react-router-dom';

function Conductor({ title, submit, link, handleSubmit }) {
    const { form, handleChange, resetChange } = useCoductorForm({
        email: '',
        password: ''
    })

    function submitForm(evt) {
        evt.preventDefault();
        handleSubmit(form, resetChange);
    }

    return (
        <form className='conductor' onSubmit={submitForm}>
            <h1 className='conductor__title'>{title}</h1>
            <input
                className='conductor__input'
                placeholder='Email'
                value={form.email}
                name='email'
                type='email'
                onChange={handleChange}
                required
            />
            <input
                className='conductor__input'
                placeholder='Пароль'
                value={form.password}
                name='password'
                type='password'
                onChange={handleChange}
                required
            />
            <button
                className='conductor__button'
                type='submit'
                aria-label={submit}
            >{submit}</button>
            {link && <div className='conductor__maintenance'>
                <p className='conductor__text'>Уже зарегистрированы?&nbsp;</p>
                <Link className='conductor__link' to='/sign-in'>Войти</Link>
            </div>}
        </form>
    )
};

export { Conductor }