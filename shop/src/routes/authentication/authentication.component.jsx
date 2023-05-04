import SingUpForm from '../../components/sing-up-form/sing-up-form.component';
import SingInForm from '../../components/sing-in-form/sing-in-form.component';

const Authentication = () => {

    return(
        <div>
            <h1>SIGN IN PAGE</h1>
            <SingInForm />
            <SingUpForm />
        </div>
    )
}

export default Authentication