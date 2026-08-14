// components/rental-status-badge.tsx

export type OrderStatus =
     | "PLACED"
     | "CONFIRMED"
     | "PAID"
     | "PICKED_UP"
     | "RETURNED"
     | "CANCELLED";

interface BadgeProps {
     status: OrderStatus;
     className?: string;
}

const statusStyles: Record<OrderStatus, string> = {
     PLACED: "bg-status-placed-bg text-status-placed-text border-status-placed-border",
     CONFIRMED: "bg-status-confirmed-bg text-status-confirmed-text border-status-confirmed-border",
     PAID: "bg-status-paid-bg text-status-paid-text border-status-paid-border",
     PICKED_UP: "bg-status-picked-bg text-status-picked-text border-status-picked-border",
     RETURNED: "bg-status-returned-bg text-status-returned-text border-status-returned-border",
     CANCELLED: "bg-status-cancelled-bg text-status-cancelled-text border-status-cancelled-border",
};

export function RentalStatusBadge({ status, className = "" }: BadgeProps) {
     const currentStyle = statusStyles[status] || "bg-muted text-muted-foreground border-border";

     const formattedStatus = status
          ? status
               .toLowerCase()
               .split("_")
               .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
               .join(" ")
          : "Unknown";

     return (
          <span
               className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors ${currentStyle} ${className}`}
          >
               <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
               {formattedStatus}
          </span>
     );
}