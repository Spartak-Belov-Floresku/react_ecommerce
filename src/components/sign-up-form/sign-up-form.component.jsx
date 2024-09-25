import { useState } from "react";

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.style.scss'

const defultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = (value) => {

    const [formFields, setFormFields] = useState(defultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const handelChange = event => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value });
    }

    const handlSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            alert("Passwords don't match!");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            setFormFields(defultFormFields);
            user.displayName = displayName;
            await createUserDocumentFromAuth(user);
        }catch(err){
            console.log(`Error: ${err}`);
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handlSubmit}>
                <FormInput
                    label="Dispaly Name"
                    inputOptions = {{
                        type: "text",
                        onChange: handelChange,
                        name: "displayName",
                        value: displayName,
                        required: true,
                    }}
                />

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

                <FormInput
                    label="Confirm password"
                    inputOptions = {{
                        type: "password",
                        onChange: handelChange,
                        name: "confirmPassword",
                        value: confirmPassword,
                        required: true,
                    }}
                />

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
