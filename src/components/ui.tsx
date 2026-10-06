import type { ButtonHTMLAttributes, ReactNode } from "react"
import { ArrowUpRight, type LucideIcon } from "lucide-react"

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost" | "danger"
}) {
  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent/85 shadow-sm shadow-accent/20",
    secondary: "border border-line bg-panel text-ink hover:bg-panel-raised",
    ghost: "text-muted hover:bg-white/5 hover:text-ink",
    danger: "bg-danger-soft text-danger hover:bg-danger-soft/70",
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-mint/40 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function IconButton({
  label,
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
}) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`grid size-10 place-items-center rounded-xl border border-line bg-panel text-muted transition hover:border-line-strong hover:bg-panel-raised hover:text-ink focus:outline-none focus:ring-4 focus:ring-mint/40 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-2xl border border-line bg-panel shadow-card ${className}`}
    >
      {children}
    </section>
  )
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: "success" | "warning" | "danger" | "info" | "neutral" | "purple"
}) {
  const tones = {
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    danger: "bg-danger-soft text-danger",
    info: "bg-info-soft text-info",
    neutral: "bg-canvas text-muted",
    purple: "bg-purple-soft text-purple",
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-strong">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted md:text-base">
          {description}
        </p>
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </header>
  )
}

export function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "mint",
}: {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  tone?: "mint" | "blue" | "amber" | "purple"
}) {
  const tones = {
    mint: "bg-mint text-accent-strong",
    blue: "bg-info-soft text-info",
    amber: "bg-warning-soft text-warning",
    purple: "bg-purple-soft text-purple",
  }
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {value}
          </p>
        </div>
        <div
          className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}
        >
          <Icon size={19} strokeWidth={2} />
        </div>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-muted">
        <ArrowUpRight size={14} className="text-success" />
        {detail}
      </p>
    </Card>
  )
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
    </label>
  )
}

export const inputClass =
  "w-full rounded-xl border border-line bg-panel-raised px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-mint/40"

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
      <div className="grid size-12 place-items-center rounded-2xl bg-mint text-accent-strong">
        <Icon size={22} />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-sm leading-6 text-muted">
        {description}
      </p>
    </div>
  )
}
