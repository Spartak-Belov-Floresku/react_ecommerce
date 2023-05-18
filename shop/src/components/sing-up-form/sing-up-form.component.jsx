import { useState } from "react";

import { FormInput } from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from "./sing-up-form.styles";

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
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sing up with your email and password</span>
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

                <Button type="submit">Sing Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SingUpForm;