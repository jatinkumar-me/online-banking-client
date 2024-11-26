export interface LoginRequest {
  email: string,
  password: string,
}

export interface RegisterRequest {
  name: string,
  email: string,
  password: string,
  address: string,
  phoneNumber: string
}

export interface User extends RegisterRequest {
  userId: number,
  role: "ADMIN" | "USER",
  createdAt: Date,
}

export interface LoginResponse {
  user: User
  token: string
}

