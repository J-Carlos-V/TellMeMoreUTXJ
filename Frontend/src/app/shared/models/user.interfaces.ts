export type Roles = 'Admin' | 'Logueado' | 'Visitante';

export interface User{
    Email: string;
    Contrasena: string
}

export interface UserResponse {
    message: string;
    token: string;
    userId: number;
    role: Roles; 
}