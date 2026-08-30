'use server'

export type RegisterState = {
     success?: boolean
     message?: string
     data?: {
          name?: string
          email?: string
          password?: string
          phone?: string
          address?: string
          profileImage?: string
     }
}

export async function registerUser(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
     const name = formData.get('name') as string
     const email = formData.get('email') as string
     const password = formData.get('password') as string
     const phone = formData.get('phone') as string
     const address = formData.get('address') as string
     const profileImage = formData.get('profileImage') as string

     // basic validation check
     if (!name || name.length < 3) {
          return { success: false, message: 'Name must be at least 3 characters long.' }
     }

     if (!email || !email.includes('@')) {
          return { success: false, message: 'Please provide a valid email.' }
     }

     if (!password || password.length < 6) {
          return { success: false, message: 'Password must be at least 6 characters.' }
     }

     try {
          const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ name, email, password, phone, address, profileImage }),
          });

          const result = await res.json()

          return result


     } catch (error: unknown) {
          console.log("register action error for", error);
          return {
               success: false,
               message: 'Something went wrong. Please try again.',
          }
     }
}