export interface LoginApiData {
    message: string,
    token: string,
    user: {
        _id: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        role: string,
        isVerified: boolean,
        createdAt: string
    }
}

export interface LoginRes {
    message: string,
    token: string,
    userEmail: string,
    userName: string
}

export interface forgetPassApiData {
    message: string,
    info: string
}
export interface forgetPassRes {
    message: string,
    info: string
}

export interface verifyCodeApiData {
    resetCode: string
}
export interface verifyCodeRes {
    // status: string,
    resetCode: string
}

export interface resetPassApiData {
    email: string,
    newPassword: string
}
export interface resetPassRes {
    // message: string,
    // token: string,
    email: string
}
