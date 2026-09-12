export interface RentalData {
     id: string
     status: "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED"
     createdAt: string
}



export interface CheckRentalStatusApiResponse {
     success: boolean
     statusCode: number
     message: string
     data: {
          rentalData: RentalData
     }
}