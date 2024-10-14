import { FormImputLable, Input, Group} from "./form-input.styles";

export const FormInput = ({label, inputOptions}) => {
  return (
    <Group>
      <Input {...inputOptions}/>
      {label && (
        <FormImputLable shrink={inputOptions.value.length}>
          {label}
        </FormImputLable>
      )}
    </Group>
  )
}

export default FormInput;