export type IUser = {
     success: boolean
     message: string
     data: {
          profile: {
               id: string,
               name: string,
               email: string,
               phone: string,
               address: string,
               role: "CUSTOMER" | "PROVIDER" | "ADMIN",
               createdAt: string,
               profileImage: string,
               status: "ACTIVE" | "SUSPENDED",
               updatedAt: string
          }
     }
}

export interface IUserProfile {
     id: string
     email: string
     name: string
     phone: string
     address: string
     role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN'
     status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE'
     profileImage: string
     createdAt: string
     updatedAt: string
}

export interface IUPdateUser {
     name?: string
     phone?: string
     address?: string
     profileImage?: string

}