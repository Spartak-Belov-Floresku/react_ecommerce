import { Group, Input, FormInputLabel } from "./form-input.styles";

export const FormInput = ({label, ...otherFields}) => {
    return(
        <Group>
            <Input {...otherFields} />
            {label && (<FormInputLabel shrink={otherFields.value.lenght}>{label}</FormInputLabel>)}
        </Group>
    )
}