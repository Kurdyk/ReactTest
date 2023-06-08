export const computeDisplay = (requiredLogin:boolean|undefined) => {
    if (requiredLogin! === true) { // can only be seen while logged in
        if (sessionStorage.getItem("token") !== null) {
            return "block !important";
        } else {
            return "none !important";
        }
    }
    if (requiredLogin! === false) { // can only be seen before login
        if (sessionStorage.getItem("token") === null) {
            return "block !important";
        } else {
            return "none !important";
        }
    }
    return "block !important";
}