import { Conductor } from "./Conductor";

function Login({ handleLogin }) {
    return (
        <Conductor
            title='Вход'
            submit='Войти'
            handleSubmit={handleLogin}
        />
    )
};

export { Login }