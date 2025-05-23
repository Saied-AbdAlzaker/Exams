export interface Adaptor {
    adaptSignin(data: any): any
    adaptSignup(data: any): any
    adaptForgetPassword(data: any): any
}
