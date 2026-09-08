'use server'

import { GearFilterParams } from "@/types/gear"



export async function getGears(params: GearFilterParams) {
     try {
          const queryParams = new URLSearchParams()
          if (params.category) queryParams.set('category', params.category)
          if (params.minPrice) queryParams.set('minPrice', params.minPrice)
          if (params.maxPrice) queryParams.set('maxPrice', params.maxPrice)
          if (params.brand) queryParams.set('brand', params.brand)
          if (params.search) queryParams.set('search', params.search)

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/gears?${queryParams.toString()}`, {
               next: { revalidate: 60 },
          })

          if (!res.ok) throw new Error('Failed to fetch gears')
          return await res.json()
     } catch (error) {
          console.error('Error fetching gears:', error)
          return { success: false, data: [] }
     }
}

export async function getGearById(id: string) {
     try {
          const res = await fetch(`${process.env.BACKEND_API_URL}/api/gears/${id}`, {
               next: { revalidate: 60 },
          })
          if (!res.ok) throw new Error('Failed to fetch gear detail')
          return await res.json()
     } catch (error) {
          console.error('Error fetching gear details:', error)
          return { success: false, data: null }
     }
}