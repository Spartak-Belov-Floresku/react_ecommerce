import './form-input.styles.scss'

export const FormInput = ({label, ...otherFields}) => {
    return(
        <div className="group">
            <input className="form-input" {...otherFields} />
            {label && (<label className={`${otherFields.value.length? 'shrink': null} form-input-label`}>{label}</label>)}
        </div>
    )
}