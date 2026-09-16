export interface ICategory {
     id: string;
     name: string;
     description: string;
     icon: string;
     createdAt: string;
     updatedAt: string;
     _count?: {
          gears: number;
     };
}

// API Response Object
export interface ICategoryDetailResponse {
     success: boolean;
     statusCode: number;
     message: string;
     data: ICategory[];
}