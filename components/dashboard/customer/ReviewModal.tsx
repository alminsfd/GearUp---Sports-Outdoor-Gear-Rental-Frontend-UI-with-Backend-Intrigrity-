'use client'

import { useState } from 'react'
import { Star, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewModalProps {
     gearTitle: string
     onClose: () => void
}

export default function ReviewModal({ gearTitle, onClose }: ReviewModalProps) {
     const [rating, setRating] = useState(5)
     const [reviewComment, setReviewComment] = useState('')

     const handleReviewSubmit = (e: React.FormEvent) => {
          e.preventDefault()
          alert(`Review submitted for ${gearTitle}! Rating: ${rating} Stars`)
          setReviewComment('')
          onClose()
     }

     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
               <div className="glass-panel w-full max-w-md rounded-3xl border bg-card p-6 shadow-2xl relative space-y-4">
                    <button
                         onClick={onClose}
                         className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                    >
                         <X className="size-5" />
                    </button>

                    <div>
                         <span className="text-xs font-bold text-secondary uppercase">Returned Gear</span>
                         <h3 className="text-lg font-bold">Leave a Review</h3>
                         <p className="text-xs text-muted-foreground">{gearTitle}</p>
                    </div>

                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                         <div>
                              <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">
                                   Rating
                              </label>
                              <div className="flex gap-2">
                                   {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                             key={star}
                                             type="button"
                                             onClick={() => setRating(star)}
                                             className="text-amber-400 hover:scale-110 transition-transform"
                                        >
                                             <Star
                                                  className={cn(
                                                       'size-7',
                                                       star <= rating ? 'fill-amber-400' : 'text-muted'
                                                  )}
                                             />
                                        </button>
                                   ))}
                              </div>
                         </div>

                         <div>
                              <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">
                                   Your Feedback
                              </label>
                              <textarea
                                   rows={4}
                                   required
                                   value={reviewComment}
                                   onChange={(e) => setReviewComment(e.target.value)}
                                   placeholder="How was the equipment condition and experience?"
                                   className="w-full rounded-2xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                         </div>

                         <div className="flex justify-end gap-2 pt-2">
                              <button
                                   type="button"
                                   onClick={onClose}
                                   className="rounded-xl px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted"
                              >
                                   Cancel
                              </button>
                              <button
                                   type="submit"
                                   className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-md hover:opacity-90"
                              >
                                   Submit Review
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     )
}