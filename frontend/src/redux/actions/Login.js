export const SignIn = (event) => ({
    type: "SIGN_IN_USER",
    payload: event.target.value
})

export const SignUp = (event) => ({
    type: "SIGN_UP_USER",
    payload: event.target.value
})