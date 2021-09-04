export const usernameValidation = (text) => {
    let regex = /^([a-z]+\s)*[a-z]+$/
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(text) === true) {
        console.log('valid')
        return text
    }
    else {
        console.log('Invalid')
        return false
    }
}
export const emailValidation = (text) => {
    // let regex=/^([a-z]+\s)*[a-z]+$/
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(text) === true) {
        console.log('valid')
        return text
    }
    else {
        console.log('Invalid')
        return false
    }
}
export const mobileValidation = (text) => {
    // let regex=/^([a-z]+\s)*[a-z]+$/
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/
    if (regex.test(text) === true) {
        console.log('valid')
        return text
    }
    else {
        console.log('Invalid')
        return false
    }
}
export const passwordValidation = (text) => {
    // let regex=/^([a-z]+\s)*[a-z]+$/
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (regex.test(text) === true) {
        console.log('valid')
        return text
    }
    else {
        console.log('Invalid')
        return false
    }
}
