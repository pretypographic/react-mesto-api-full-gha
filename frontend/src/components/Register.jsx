import { Conductor } from "./Conductor";

function Register({ handleRegistration }) {
    return (
        <Conductor
            title='Регистрация'
            submit='Зарегистрироваться'
            link={true}
            handleSubmit={handleRegistration}
        />
    )
};

export { Register }