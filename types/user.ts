export type IUser = {
     success: boolean
     message: string
     data: {
          profile: {
               id: string,
               name: string,
               email: string,
               phone: string,
               activeStatus: string,
               role: "CUSTOMER" | "PROVIDER" | "ADMIN",
               createdAt: string,
               profileImage: string,
               status: "ACTIVE" | "SUSPENDED",
               updatedAt: string
          }
     }
}
