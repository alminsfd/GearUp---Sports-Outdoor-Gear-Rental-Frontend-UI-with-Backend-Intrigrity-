'use server'

export async function getCatagoryall() {
     try {
          const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
               next: { revalidate: 60 },
          })
          if (!res.ok) {
               console.warn(`Backend returned status ${res.status} for catagory details`)
               return { success: false, data: null }
          }
          return await res.json()
     } catch (error) {
          console.error('Error fetching catagory details:', error)
          return { success: false, data: null }
     }
}
export async function getCatagoryById(id: string) {
     try {
          const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/${id}`, {
               next: { revalidate: 60 },
          })
          if (!res.ok) {
               console.warn(`Backend returned status ${res.status} for catagory details`)
               return { success: false, data: null }
          }
          return await res.json()
     } catch (error) {
          console.error('Error fetching catagory details:', error)
          return { success: false, data: null }
     }
}