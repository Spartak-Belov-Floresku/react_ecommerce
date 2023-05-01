import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

const SignIn = () => {

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response)
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