
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export const LoadingSpinner = ({ className, size = "md" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="text-center">
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-blue-200 border-t-blue-500 mx-auto mb-4",
            sizeClasses[size],
            className
          )}
        />
        <p className="text-blue-200">Loading...</p>
      </div>
    </div>
  )
}
