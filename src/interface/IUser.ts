export interface IUserRegister {
    name: string,
    email: string,
    password: string,
    role: 'user' | 'author' | 'admin'
}

export interface IUserLogin {
    email: string,
    password: string,
}

export interface IUser {
    name: string,
    email: string,
    role: 'user' | 'author' | 'admin'
}
