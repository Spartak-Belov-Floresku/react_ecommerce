import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import SingUpForm from '../../components/sing-up-form/sing-up-form.component';

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return(
        <div>
            <h1>SIGN IN PAGE</h1>
            <button onClick={logGoogleUser}>
                Sing in with Goole Popup
            </button>
            <SingUpForm />
        </div>
    )
}

export default SignIn