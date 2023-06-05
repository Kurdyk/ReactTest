export type FormInputProps = {
    value?: any,
    required: boolean,
    placeholder: string,
    onChange: (input:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

export type InputGroupProps = {
    inputsPropsList: FormInputProps[],
    inputLabel: string,
}