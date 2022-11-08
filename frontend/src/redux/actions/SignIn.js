export const SignIn = (event) => ({
    type: "SIGN_IN_USER",
    payload: event.target.value
})