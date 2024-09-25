import { useState } from "react";

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.style.scss'

const defultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defultFormFields);
    const { email, password } = formFields;

    const handelChange = event => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value });
    }

    const handlSubmit = async (event) => {
        event.preventDefault();
        try{
            await signInAuthUserWithEmailAndPassword(email, password);
            setFormFields(defultFormFields);
        }catch{
            alert('Email or password is incorrect!')
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handlSubmit}>

                <FormInput
                    label="Email"
                    inputOptions = {{
                        type: "email",
                        onChange: handelChange,
                        name: "email",
                        value: email,
                        required: true,
                    }}
                />

                <FormInput
                    label="Password"
                    inputOptions = {{
                        type: "password",
                        onChange: handelChange,
                        name: "password",
                        value: password,
                        required: true,
                    }}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button
                        type='button'
                        buttonType='google'
                        onClick={ async () => await signInWithGooglePopup() }
                    >Google sign in</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;
