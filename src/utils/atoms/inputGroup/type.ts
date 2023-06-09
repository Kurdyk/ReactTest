export type FormInputProps = {
    value?: string,
    type?: string,
    error?: boolean,
    helperText?: string,
    required: boolean,
    placeholder: string,
    onChange: (input:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

export type InputGroupProps = {
    inputsPropsList: FormInputProps[],
    inputLabel: string,
}