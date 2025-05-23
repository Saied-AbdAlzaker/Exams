export interface LoginData {
    email: string,
    password: string
}

export interface registerData {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rePassword: string,
    phone: string
}
export interface forgetPasswordData {
    email: string,
}
export interface verifyCodeData {
    resetCode: string,
}
export interface resetPasswordData {
    email: string,
    newPassword:string
}