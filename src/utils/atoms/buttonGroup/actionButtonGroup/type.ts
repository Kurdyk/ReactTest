export type ActionButtonProps = {
    id: number,
    buttonText: string,
    value?: any,
    type?: "button" | "submit" | "reset" | undefined,
    clickHandler: () => void,
};

export type ActionButtonGroupProps = {
    actionButtonPropsList: ActionButtonProps[],
};