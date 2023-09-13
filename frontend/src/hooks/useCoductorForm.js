import { useState } from 'react';

function useCoductorForm(initialState) {
    const [ form, setForm ] = useState(initialState);

    function handleChange(evt) {
        const { name, value } = evt.target;

        setForm({
            ...form,
            [name]: value
        })
    }

    function resetChange() {
        setForm(initialState);
    }

    return { form, handleChange, resetChange }
};

export { useCoductorForm }