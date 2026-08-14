

export type OrderStatus =
     | "PLACED"
     | "CONFIRMED"
     | "PAID"
     | "PICKED_UP"
     | "RETURNED"
     | "CANCELLED";

interface BadgeProps {
     status: OrderStatus;
}

const statusStyles: Record<OrderStatus, string> = {
     PLACED:
          "bg-[hsl(var(--status-placed-bg))] text-[hsl(var(--status-placed-text))] border-[hsl(var(--status-placed-border))]",
     CONFIRMED:
          "bg-[hsl(var(--status-confirmed-bg))] text-[hsl(var(--status-confirmed-text))] border-[hsl(var(--status-confirmed-border))]",
     PAID:
          "bg-[hsl(var(--status-paid-bg))] text-[hsl(var(--status-paid-text))] border-[hsl(var(--status-paid-border))]",
     PICKED_UP:
          "bg-[hsl(var(--status-picked-bg))] text-[hsl(var(--status-picked-text))] border-[hsl(var(--status-picked-border))]",
     RETURNED:
          "bg-[hsl(var(--status-returned-bg))] text-[hsl(var(--status-returned-text))] border-[hsl(var(--status-returned-border))]",
     CANCELLED:
          "bg-[hsl(var(--status-cancelled-bg))] text-[hsl(var(--status-cancelled-text))] border-[hsl(var(--status-cancelled-border))]",
};

export function RentalStatusBadge({ status }: BadgeProps) {
     return (
          <span
               className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-colors ${statusStyles[status]}`}
          >
               <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
               {status.replace("_", " ")}
          </span>
     );
}