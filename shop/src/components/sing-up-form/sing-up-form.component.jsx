import { useState } from "react";

import { FormInput } from "../form-input/form-input.component";

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SingUpForm = () => {

    const [formField, setFormField] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formField;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password != confirmPassword){
            alert("Password doesn't match!");
            return;
        }
        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            setFormField(defaultFormFields);
        }catch(error){
            if(error.code == 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use.')
            }
            console.log(error.message)
        }
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setFormField({...formField, [name]: value})
    }

    return(
        <div>
            <h1>Sing up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <button type="submit">Sing Up</button>
            </form>
        </div>
    )
}

export default SingUpForm;