import { useState } from "react";

import { FormInput } from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import './sing-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SingInForm = () => {

    const [formField, setFormField] = useState(defaultFormFields);
    const { email, password } = formField;

    const singInWithGoogle = async () => { await signInWithGooglePopup() }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setFormField(defaultFormFields);
        }catch(error){
            switch(error.code){
                case "auth/wrong-password":
                    alert('incorrect password for email!');
                    break;
                case "auth/user-not-found":
                    alert('no user associated with this email!');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setFormField({...formField, [name]: value})
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sing in with your email and password</span>
            <form onSubmit={handleSubmit}>

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
                <div className="buttons-container">
                    <Button type="submit">Sing In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={singInWithGoogle}>Google Sing In</Button>
                </div>
            </form>
        </div>
    )
}

export default SingInForm;