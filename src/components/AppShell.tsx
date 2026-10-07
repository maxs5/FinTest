import {
  Activity,
  Bell,
  BookOpenCheck,
  Boxes,
  Bug,
  ChevronDown,
  CircleGauge,
  Code2,
  CreditCard,
  FileCheck2,
  FlaskConical,
  Globe2,
  Landmark,
  Menu,
  PanelLeftClose,
  ReceiptText,
  Rocket,
  Search,
  Send,
  Settings,
  ShieldCheck,
  TestTube2,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react"
import { useState, type ReactNode } from "react"
import { IconButton } from "./ui"

export type PageId = "overview" | "accounts" | "activity" | "transfer" | "cards" | "payments" | "exchange" | "qa-dashboard" | "requirements" | "test-cases" | "test-runs" | "bugs" | "releases" | "api" | "environments" | "reports"

type NavItem = {
  id: PageId
  label: string
  icon: LucideIcon
}

const bankNav: NavItem[] = [
  { id: "overview", label: "Overview", icon: CircleGauge },
  { id: "accounts", label: "Accounts", icon: Landmark },
  { id: "activity", label: "Transactions", icon: ReceiptText },
  { id: "transfer", label: "Transfer money", icon: Send },
  { id: "cards", label: "Cards", icon: CreditCard },
  { id: "payments", label: "Payments", icon: WalletCards },
  { id: "exchange", label: "Exchange", icon: Activity },
]

const qaNav: NavItem[] = [
  { id: "qa-dashboard", label: "QA overview", icon: FlaskConical },
  { id: "requirements", label: "Requirements", icon: BookOpenCheck },
  { id: "test-cases", label: "Test cases", icon: FileCheck2 },
  { id: "test-runs", label: "Test runs", icon: TestTube2 },
  { id: "bugs", label: "Bugs", icon: Bug },
  { id: "releases", label: "Releases", icon: Rocket },
  { id: "api", label: "API playground", icon: Code2 },
  { id: "environments", label: "Environments", icon: Globe2 },
  { id: "reports", label: "Reports", icon: Boxes },
]

function Brand() {
  return (
    <div className="flex items-center gap-3 px-3">
      <div className="relative grid size-9 place-items-center rounded-xl bg-accent text-sidebar">
        <span className="font-display text-lg font-black">F</span>
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-sidebar bg-accent" />
      </div>
      <div>
        <p className="font-display text-lg font-bold tracking-tight text-white">
          FinTest
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
          QA banking lab
        </p>
      </div>
    </div>
  )
}

function NavGroup({
  title,
  items,
  active,
  onSelect,
}: {
  title: string
  items: NavItem[]
  active: PageId
  onSelect: (id: PageId) => void
}) {
  return (
    <div>
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-sidebar-muted">
        {title}
      </p>
      <nav className="space-y-1">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
              active === id
                ? "border border-white/10 bg-white/12 text-white shadow-sm"
                : "border border-transparent text-sidebar-text hover:bg-white/7 hover:text-white"
            }`}
          >
            <Icon size={18} strokeWidth={active === id ? 2.4 : 1.8} />
            <span className="flex-1">{label}</span>
            {id === "bugs" && (
              <span className="rounded-full bg-danger px-2 py-0.5 text-[10px] font-bold text-white">
                5
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

export function AppShell({
  active,
  onSelect,
  onSignOut,
  children,
}: {
  active: PageId
  onSelect: (id: PageId) => void
  onSignOut: () => void
  children: ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const select = (id: PageId) => {
    onSelect(id)
    setMobileOpen(false)
  }

  return (
    <div className="min-h-screen bg-canvas/75 text-ink">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/8 bg-sidebar/90 px-4 py-5 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Brand />
          <button
            onClick={() => setMobileOpen(false)}
            className="grid size-9 place-items-center rounded-xl text-sidebar-text hover:bg-white/10 lg:hidden"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-2">
          <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-white hover:bg-white/5">
            <div className="grid size-8 place-items-center rounded-lg bg-accent/20 text-accent">
              <ShieldCheck size={17} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">FinTest Core</p>
              <p className="text-[10px] text-sidebar-muted">v1.8.0 · Preview</p>
            </div>
            <ChevronDown size={15} className="text-sidebar-muted" />
          </button>
        </div>

        <div className="scrollbar-hide mt-6 flex-1 space-y-6 overflow-y-auto pb-5">
          <NavGroup
            title="Digital bank"
            items={bankNav}
            active={active}
            onSelect={select}
          />
          <NavGroup
            title="QA workspace"
            items={qaNav}
            active={active}
            onSelect={select}
          />
        </div>

        <button
          onClick={onSignOut}
          className="mt-auto flex items-center gap-3 rounded-xl border border-white/10 p-2 text-left transition hover:bg-white/5"
        >
          <div className="grid size-9 place-items-center rounded-lg bg-purple-soft font-display text-xs font-bold text-purple">
            AL
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              Alex Lewis
            </p>
            <p className="truncate text-[10px] text-sidebar-muted">QA Lead</p>
          </div>
          <Settings size={16} className="text-sidebar-muted" />
        </button>
      </aside>

      {mobileOpen && (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-sidebar/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="lg:pl-72">
        <div className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-white/80 px-4 backdrop-blur-2xl md:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="grid size-10 place-items-center rounded-xl border border-line bg-panel text-muted lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div className="hidden flex-1 items-center gap-2 text-muted md:flex">
            <Search size={18} />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              placeholder="Search accounts, tests, bugs…"
              aria-label="Global search"
            />
            <span className="rounded-md border border-line bg-panel px-2 py-1 text-[10px] font-semibold">
              ⌘ K
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full bg-success-soft px-3 py-2 text-xs font-bold text-success sm:flex">
              <span className="size-1.5 rounded-full bg-success" />
              All systems operational
            </div>
            <IconButton label="Notifications" className="relative">
              <Bell size={18} />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-danger" />
            </IconButton>
            <IconButton label="Collapse sidebar" className="hidden lg:grid">
              <PanelLeftClose size={18} />
            </IconButton>
          </div>
        </div>
        <main className="mx-auto max-w-screen-2xl px-4 py-7 md:px-8 md:py-9">
          {children}
        </main>
      </div>
    </div>
  )
}
