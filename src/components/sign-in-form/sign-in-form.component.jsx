import { useState } from "react";
import { useDispatch } from "react-redux";

// import {
//     signInWithGooglePopup,
//     signInAuthUserWithEmailAndPassword
// } from '../../utils/firebase/firebase.utils';

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import './sign-in-form.style.scss'

const defultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {

    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defultFormFields);
    const { email, password } = formFields;

    const handelChange = event => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value });
    }

    // const signInWithGoogle = async () => {
    //     await signInWithGooglePopup();
    // }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    // const handlSubmit = async (event) => {
    //     event.preventDefault();
    //     try{
    //         await signInAuthUserWithEmailAndPassword(email, password);
    //         setFormFields(defultFormFields);
    //     }catch{
    //         alert('Email or password is incorrect!')
    //     }
    // }

    const handlSubmit = async (event) => {
        event.preventDefault();
        try{
            dispatch(emailSignInStart(email, password));
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
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={ signInWithGoogle }
                    >Google sign in</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;
