'use client'

import { useState } from 'react'
import { IUserProfile } from '@/types/user'
import { Button } from '@/components/ui/button'
import { Edit3, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { updateMe } from '@/service/getMe'


interface ProfileOverviewProps {
     profile: IUserProfile
}

export function ProfileOverview({ profile }: ProfileOverviewProps) {
     const [isEditing, setIsEditing] = useState(false)
     const [formData, setFormData] = useState({
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
          url: profile.profileImage,
     })

     const handleCopyId = () => {
          navigator.clipboard.writeText(profile.id)
          toast.success('User ID copied to clipboard!')
     }

     const handleFormSubmit = async (e: React.FormEvent) => {
          e.preventDefault()
          try {
               // 1. Server Action Call
               const res = await updateMe(formData)
               // 2. Check response status
               if (res?.success) {
                    toast.success(res?.message || 'Profile details updated successfully!')
                    setIsEditing(false)
               } else {
                    toast.error(res?.message || 'Failed to update profile!')
               }
          } catch (error) {
               console.error('Update Profile Error:', error)
               toast.error('Something went wrong. Please try again.')
          }

     }

     return (
          <div className="space-y-6">
               {/* Top Action Toggle */}
               <div className="flex justify-end">
                    <Button
                         type="button"
                         onClick={() => setIsEditing(!isEditing)}
                         className="rounded-xl text-xs font-bold gap-1.5"
                         variant={isEditing ? 'secondary' : 'default'}
                    >
                         <Edit3 className="size-3.5" />
                         {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </Button>
               </div>

               {/* Edit Form Modal/Box */}
               {isEditing && (
                    <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
                         <h2 className="text-xs font-black uppercase tracking-wider text-foreground">
                              Edit Personal Information
                         </h2>
                         <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                              <div>
                                   <label className="font-bold text-muted-foreground">Full Name</label>
                                   <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-border bg-muted/50 px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                                   />
                              </div>
                              <div>
                                   <label className="font-bold text-muted-foreground">Phone Number</label>
                                   <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-border bg-muted/50 px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                                   />
                              </div>
                              <div>
                                   <label className="font-bold text-muted-foreground">Phone Number</label>
                                   <input
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-border bg-muted/50 px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                                   />
                              </div>
                              <div>
                                   <label className="font-bold text-muted-foreground">Address</label>
                                   <textarea
                                        rows={3}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-border bg-muted/50 px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                                   />
                              </div>
                              <div className="flex justify-end gap-2 pt-2">
                                   <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setIsEditing(false)}
                                        className="rounded-xl text-xs font-bold"
                                   >
                                        Cancel
                                   </Button>
                                   <Button type="submit" className="rounded-xl text-xs font-bold">
                                        Save Changes
                                   </Button>
                              </div>
                         </form>
                    </div>
               )}

               {/* Copy ID Button Hook */}
               <div className="hidden">
                    <button id="copy-id-btn" onClick={handleCopyId} type="button">
                         Copy
                    </button>
               </div>
          </div>
     )
}

// Copy Action Button Component (পেইজের যেকোনো জায়গায় বসাতে পারবেন)
export function CopyIdButton({ id }: { id: string }) {
     const handleCopy = () => {
          navigator.clipboard.writeText(id)
          toast.success('User ID copied!')
     }

     return (
          <button
               type="button"
               onClick={handleCopy}
               className="font-mono text-[11px] font-bold text-primary flex items-center gap-1 hover:underline truncate max-w-35"
          >
               {id}
               <ExternalLink className="size-3" />
          </button>
     )
}