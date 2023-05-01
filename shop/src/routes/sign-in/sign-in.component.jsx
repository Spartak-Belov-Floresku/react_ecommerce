import {
    signInWithGooglePopup,
    craeteUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        console.log(user)
        const userDocRef = await craeteUserDocumentFromAuth(user)
    }

    return(
        <div>
            <h1>SIGN IN PAGE</h1>
            <button onClick={logGoogleUser}>
                Sing in with Goole Popup
            </button>
        </div>
    )
}

export default SignIn