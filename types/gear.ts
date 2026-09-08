export interface GearFilterParams {
     category?: string
     minPrice?: string
     maxPrice?: string
     brand?: string
     search?: string
     startDate?: string
     endDate?: string
}

export interface Category {
     id: string;
     name: string;
}

export interface Provider {
     id: string;
     name: string;
     email: string;
}

export interface IGear {
     id: string;
     title: string;
     description: string;
     pricePerDay: number;
     brand: string;
     stock: number;
     isAvailable: boolean;
     images: string[];
     createdAt: string;
     updatedAt: string;
     categoryId: string;
     providerId: string;
     category: Category;
     provider: Provider;
}