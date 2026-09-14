'use client'

import { ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

interface CopyIdButtonProps {
     id: string
}

export function CopyIdButton({ id }: CopyIdButtonProps) {
     const handleCopy = async () => {
          try {
               await navigator.clipboard.writeText(id)
               toast.success('User ID copied to clipboard!')
          } catch (err) {
               toast.error('Failed to copy ID')
          }
     }

     return (
          <button
               type="button"
               onClick={handleCopy}
               className="flex items-center gap-1 font-mono text-[11px] font-bold text-primary transition-all hover:underline"
               title="Click to copy ID"
          >
               <span className="max-w-30 truncate">{id}</span>
               <ExternalLink className="size-3 shrink-0" />
          </button>
     )
}