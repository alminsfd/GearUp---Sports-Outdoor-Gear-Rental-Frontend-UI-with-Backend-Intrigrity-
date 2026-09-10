export interface GearFilterParams {
     category?: string
     minPrice?: string
     maxPrice?: string
     brand?: string
     searchTerm?: string
     page?: string | number
     limit?: string | number
     startDate?: string
     endDate?: string
     sortBy?: string
     sortOrder?: string
     isAvailable?: string
}

export interface Category {
     id: string
     name: string
     description?: string
     icon?: string
     createdAt?: string
     updatedAt?: string
}

export interface Provider {
     id: string
     name: string
     email: string
     phone?: string | null
}

export interface Customer {
     id: string
     name: string
     profileImage?: string | null
}

export interface Review {
     id: string
     rating: number
     comment: string
     createdAt: string
     updatedAt: string
     customerId: string
     gearItemId: string
     customer: Customer
}

export interface IGear {
     id: string
     title: string
     description: string
     pricePerDay: number
     brand: string
     stock: number
     isAvailable: boolean
     images: string[]
     createdAt: string
     updatedAt: string
     categoryId: string
     providerId: string
     category: Category
     provider: Provider
}

export interface IGearDetail extends IGear {
     reviews: Review[]
}