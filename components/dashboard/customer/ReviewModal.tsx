'use client'

import { useState } from 'react'
import { Star, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { postReviews } from '../../../app/dashboard/_action/customar_action'
import { toast } from 'sonner'

interface ReviewModalProps {
     gearItemId: string
     gearTitle: string
     onClose: () => void
}

export default function ReviewModal({ gearTitle, gearItemId, onClose }: ReviewModalProps) {
     const [rating, setRating] = useState(5)
     const [hoverRating, setHoverRating] = useState(0)
     const [reviewComment, setReviewComment] = useState('')
     const [isSubmitting, setIsSubmitting] = useState(false)

     const handleReviewSubmit = async (e: React.FormEvent) => {
          e.preventDefault()

          if (!reviewComment.trim()) {
               toast.error('Please enter a feedback comment.')
               return
          }

          setIsSubmitting(true)

          try {
               const result = await postReviews({
                    gearItemId,
                    rating,
                    comment: reviewComment,
               })

               if (result?.success) {
                    setReviewComment('')
                    toast.success(result?.message || 'Review submitted successfully!')
                    onClose()
               } else {
                    // Show error message via toast if user already reviewed or server action failed
                    toast.error(result?.message || 'Failed to submit review')
               }
          } catch (error) {
               toast.error('An unexpected error occurred. Please try again.')
               console.error(error)
          } finally {
               setIsSubmitting(false)
          }
     }

     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
               <div className="glass-panel w-full max-w-md rounded-3xl border bg-card p-6 shadow-2xl relative space-y-4">
                    <button
                         type="button"
                         onClick={onClose}
                         disabled={isSubmitting}
                         className="absolute right-4 top-4 text-muted-foreground hover:text-foreground disabled:opacity-50"
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
                                             disabled={isSubmitting}
                                             onClick={() => setRating(star)}
                                             onMouseEnter={() => setHoverRating(star)}
                                             onMouseLeave={() => setHoverRating(0)}
                                             className="text-amber-400 hover:scale-110 transition-transform disabled:opacity-50"
                                        >
                                             <Star
                                                  className={cn(
                                                       'size-7 transition-colors',
                                                       star <= (hoverRating || rating)
                                                            ? 'fill-amber-400 text-amber-400'
                                                            : 'text-muted-foreground/30'
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
                                   disabled={isSubmitting}
                                   value={reviewComment}
                                   onChange={(e) => setReviewComment(e.target.value)}
                                   placeholder="How was the equipment condition and experience?"
                                   className="w-full rounded-2xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                              />
                         </div>

                         <div className="flex justify-end gap-2 pt-2">
                              <button
                                   type="button"
                                   onClick={onClose}
                                   disabled={isSubmitting}
                                   className="rounded-xl px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted disabled:opacity-50"
                              >
                                   Cancel
                              </button>
                              <button
                                   type="submit"
                                   disabled={isSubmitting}
                                   className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-md hover:opacity-90 disabled:opacity-50 cursor-pointer"
                              >
                                   {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
                                   {isSubmitting ? 'Submitting...' : 'Submit Review'}
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     )
}