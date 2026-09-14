
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
     Mail,
     Phone,
     MapPin,
     Calendar,
     ShieldCheck,
     UserCheck,
} from 'lucide-react'
import { getMe } from '@/service/getMe'
import { IUser } from '@/types/user'
import { CopyIdButton } from '@/components/dashboard/CopyIdButton'



export default async function ProfilePage() {
     const profileResponse: IUser = await getMe()
     const profile = profileResponse?.data?.profile

     if (!profile) {
          return (
               <div className="container mx-auto max-w-5xl px-4 py-12 text-center">
                    <p className="text-sm font-bold text-destructive">Profile not found.</p>
               </div>
          )
     }

     const formattedJoinedDate = new Date(profile.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
     })

     return (
          <div className="container mx-auto max-w-5xl px-4 py-8 space-y-6">
               {/* 1. Header & Banner Design */}
               <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
                    <div className="h-32 bg-linear-to-r from-primary/20 via-primary/10 to-transparent sm:h-40" />

                    <div className="relative px-6 pb-6 pt-0 sm:px-8">
                         <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between -mt-14 sm:-mt-16">
                              <div className="flex items-end gap-4">
                                   <Avatar className="size-24 rounded-2xl border-4 border-card shadow-md sm:size-28">
                                        <AvatarImage src={profile.profileImage} alt={profile.name} className="object-cover" />
                                        <AvatarFallback className="rounded-2xl text-xl font-bold bg-primary/10 text-primary">
                                             {profile.name.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                   </Avatar>

                                   <div className="space-y-1 mb-1">
                                        <div className="flex items-center gap-2">
                                             <h1 className="text-xl font-black text-foreground sm:text-2xl">{profile.name}</h1>
                                             <Badge variant="outline" className="gap-1 rounded-full border-primary/30 bg-primary/10 text-xs font-bold text-primary">
                                                  <ShieldCheck className="size-3" />
                                                  {profile.role}
                                             </Badge>
                                        </div>
                                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                             <Mail className="size-3.5" />
                                             {profile.email}
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* 2. Main Details Grid UI Design */}
               <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Side Info Cards */}
                    <div className="lg:col-span-2 space-y-6">
                         <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm space-y-6">
                              <h2 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                                   Personal Details
                              </h2>

                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                   <div className="flex items-start gap-3 rounded-2xl bg-muted/30 p-4 border border-border/40">
                                        <div className="rounded-xl bg-primary/10 p-2 text-primary">
                                             <Phone className="size-4" />
                                        </div>
                                        <div>
                                             <p className="text-[11px] font-semibold text-muted-foreground">Phone Number</p>
                                             <p className="text-xs font-bold text-foreground mt-0.5">{profile.phone || 'N/A'}</p>
                                        </div>
                                   </div>

                                   <div className="flex items-start gap-3 rounded-2xl bg-muted/30 p-4 border border-border/40">
                                        <div className="rounded-xl bg-primary/10 p-2 text-primary">
                                             <MapPin className="size-4" />
                                        </div>
                                        <div>
                                             <p className="text-[11px] font-semibold text-muted-foreground">Address</p>
                                             <p className="text-xs font-bold text-foreground mt-0.5">{profile.address || 'N/A'}</p>
                                        </div>
                                   </div>

                                   <div className="flex items-start gap-3 rounded-2xl bg-muted/30 p-4 border border-border/40">
                                        <div className="rounded-xl bg-primary/10 p-2 text-primary">
                                             <Calendar className="size-4" />
                                        </div>
                                        <div>
                                             <p className="text-[11px] font-semibold text-muted-foreground">Joined RentNest</p>
                                             <p className="text-xs font-bold text-foreground mt-0.5">{formattedJoinedDate}</p>
                                        </div>
                                   </div>

                                   <div className="flex items-start gap-3 rounded-2xl bg-muted/30 p-4 border border-border/40">
                                        <div className="rounded-xl bg-primary/10 p-2 text-primary">
                                             <UserCheck className="size-4" />
                                        </div>
                                        <div>
                                             <p className="text-[11px] font-semibold text-muted-foreground">Account Status</p>
                                             <Badge variant="outline" className="mt-1 rounded-md border-emerald-500/30 bg-emerald-500/10 text-[10px] font-bold text-emerald-600">
                                                  {profile.status}
                                             </Badge>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Right Side Metadata Card */}
                    <div className="space-y-6">
                         <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
                              <h2 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                                   Account Metadata
                              </h2>

                              <div className="space-y-3 text-xs">
                                   <div className="flex justify-between items-center border-b border-border/40 pb-2">
                                        <span className="text-muted-foreground font-medium">User ID</span>
                                        {/* Client Button for Copy */}
                                        <CopyIdButton id={profile.id} />
                                   </div>

                                   <div className="flex justify-between items-center border-b border-border/40 pb-2">
                                        <span className="text-muted-foreground font-medium">Role</span>
                                        <span className="font-bold text-foreground">{profile.role}</span>
                                   </div>

                                   <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground font-medium">Last Updated</span>
                                        <span className="font-bold text-foreground">
                                             {new Date(profile.updatedAt).toLocaleDateString()}
                                        </span>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}