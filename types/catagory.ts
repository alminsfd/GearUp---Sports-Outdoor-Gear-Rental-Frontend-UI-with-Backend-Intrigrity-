import { IGear } from "./gear";

// Single Category with populated gears list
export interface ICategoryDetail {
     id: string;
     name: string;
     description: string;
     icon: string;
     createdAt: string;
     updatedAt: string;
     gears: IGear[];
}

// Category item inside the list with aggregate count
export interface ICategoryListItem {
     id: string;
     name: string;
     description: string;
     icon: string;
     createdAt: string;
     updatedAt: string;
     _count: {
          gears: number;
     };
}

// API Response Wrappers
export interface ICategoryDetailResponse {
     success: boolean;
     statusCode: number;
     message: string;
     data: ICategoryDetail;
}

export interface ICategoryListResponse {
     success: boolean;
     statusCode: number;
     message: string;
     data: ICategoryListItem[];
}