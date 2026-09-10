'use server'

import { GearFilterParams } from "@/types/gear"

export async function getGears(params: GearFilterParams) {
     try {
          const queryParams = new URLSearchParams()

          // Filter Parameters
          if (params.category) queryParams.set('category', params.category)
          if (params.minPrice) queryParams.set('minPrice', params.minPrice)
          if (params.maxPrice) queryParams.set('maxPrice', params.maxPrice)
          if (params.brand) queryParams.set('brand', params.brand)
          if (params.searchTerm) queryParams.set('searchTerm', params.searchTerm)
          if (params.isAvailable) queryParams.set('isAvailable', params.isAvailable)

          // Sorting Parameters — backend expects sortBy (field name) + sortOrder (asc/desc)
          if (params.sortBy) queryParams.set('sortBy', params.sortBy)
          if (params.sortOrder) queryParams.set('sortOrder', params.sortOrder)

          // Pagination
          queryParams.set('page', String(params.page || 1))
          queryParams.set('limit', String(params.limit || 15))

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear?${queryParams.toString()}`, {
               cache: "no-store"
          })

          if (!res.ok) {
               console.warn(`Backend returned status ${res.status}: ${res.statusText}`)
               return {
                    success: false,
                    data: [],
                    meta: { page: 1, limit: 15, total: 0, totalPage: 1 }
               }
          }
          return await res.json()
     } catch (error) {
          console.error('Error fetching gears:', error)
          return {
               success: false,
               data: [],
               meta: { page: 1, limit: 15, total: 0, totalPage: 1 }
          }
     }
}

export async function getGearById(id: string) {
     try {
          const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
               next: { revalidate: 60 },
          })
          if (!res.ok) {
               console.warn(`Backend returned status ${res.status} for gear details`)
               return { success: false, data: null }
          }
          return await res.json()
     } catch (error) {
          console.error('Error fetching gear details:', error)
          return { success: false, data: null }
     }
}



