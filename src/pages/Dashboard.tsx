import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Landmark,
  MoreHorizontal,
  Plus,
  Send,
  Sparkles,
  Wallet,
} from "lucide-react"
import { accounts, transactions } from "../data"
import {
  Badge,
  Button,
  Card,
  IconButton,
  PageHeader,
  StatCard,
} from "../components/ui"

export default function Dashboard({ onTransfer }: { onTransfer: () => void }) {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Thursday, June 20"
        title="Good morning, Alex"
        description="Your money and quality signals are in one place. Everything looks healthy today."
        actions={
          <>
            <Button variant="secondary">
              <Plus size={16} /> Add account
            </Button>
            <Button onClick={onTransfer}>
              <Send size={16} /> Send money
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.45fr_0.75fr]">
        <Card className="card-gradient relative min-h-52 overflow-hidden border-white/10 p-6 text-white md:p-8">
          <div className="relative z-10 max-w-sm">
            <Badge tone="info">Smart insights</Badge>
            <h2 className="mt-5 max-w-xs font-display text-3xl font-bold leading-tight">
              Monitor your expenses with clarity
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
              You spent 8.1% less than your monthly target. Keep the momentum.
            </p>
            <Button className="mt-5 bg-white text-sidebar hover:bg-white/90">
              View insights <ArrowRight size={15} />
            </Button>
          </div>
          <div className="absolute -bottom-20 -right-10 size-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute right-16 top-8 size-24 rotate-12 rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md" />
          <div className="absolute bottom-8 right-8 grid size-20 -rotate-6 place-items-center rounded-full bg-warning text-2xl font-bold text-sidebar shadow-2xl">
            €
          </div>
        </Card>
        <Card className="panel-highlight flex min-h-52 flex-col justify-between overflow-hidden p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Your wallet
              </p>
              <p className="mt-2 text-sm text-muted">Available balance</p>
            </div>
            <div className="grid size-10 place-items-center rounded-full bg-accent text-white shadow-lg shadow-accent/30">
              <Wallet size={18} />
            </div>
          </div>
          <div>
            <p className="font-display text-4xl font-bold tracking-tight">
              €48,362.18
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Badge tone="success">+2.8%</Badge>
              <span className="text-xs text-muted">this month</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total balance"
          value="€48,362"
          detail="+€1,245 this month"
          icon={Wallet}
        />
        <StatCard
          label="Monthly income"
          value="€7,840"
          detail="12.6% vs last month"
          icon={ArrowDownLeft}
          tone="blue"
        />
        <StatCard
          label="Monthly spent"
          value="€3,216"
          detail="8.1% below budget"
          icon={ArrowUpRight}
          tone="amber"
        />
        <StatCard
          label="Active accounts"
          value="3"
          detail="All accounts healthy"
          icon={Landmark}
          tone="purple"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line p-5 md:p-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Cash flow
              </h2>
              <p className="mt-1 text-xs text-muted">
                Income and expenses · Last 6 months
              </p>
            </div>
            <select className="rounded-lg border border-line bg-panel-raised px-3 py-2 text-xs font-semibold text-ink outline-none">
              <option>6 months</option>
              <option>12 months</option>
            </select>
          </div>
          <div className="p-5 md:p-6">
            <div className="flex items-end gap-6">
              <div>
                <p className="text-xs font-semibold text-muted">
                  Net cash flow
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">
                  +€4,624.20
                </p>
              </div>
              <Badge tone="success">+18.4%</Badge>
            </div>
            <div className="mt-7 flex h-52 items-end gap-3 border-b border-line">
              {[48, 62, 54, 74, 66, 88].map((income, index) => (
                <div
                  key={income}
                  className="flex h-full flex-1 items-end justify-center gap-1"
                >
                  <div
                    className="w-2/5 rounded-t-md bg-ink transition hover:bg-ink-soft"
                    style={{ height: `${income}%` }}
                  />
                  <div
                    className="w-2/5 rounded-t-md bg-accent transition hover:bg-accent-strong"
                    style={{ height: `${[30, 42, 36, 44, 46, 38][index]}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-6 text-center text-[10px] font-semibold text-muted">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
            <div className="mt-5 flex gap-5 text-xs font-semibold text-muted">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-ink" /> Income
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent" /> Expenses
              </span>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-sidebar p-6 text-white">
          <div className="absolute -right-16 -top-20 size-56 rounded-full border-[28px] border-white/5" />
          <div className="relative flex h-full min-h-96 flex-col">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-sidebar-muted">
                  Main card
                </p>
                <p className="mt-2 font-display text-xl font-semibold">
                  Everyday Debit
                </p>
              </div>
              <CreditCard className="text-accent" size={25} />
            </div>
            <div className="mt-14">
              <p className="font-mono text-lg tracking-[0.2em]">
                4821 •••• •••• 8392
              </p>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-sidebar-muted">
                    Card holder
                  </p>
                  <p className="mt-1 text-sm font-semibold">ALEX LEWIS</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-sidebar-muted">
                    Expires
                  </p>
                  <p className="mt-1 text-sm font-semibold">09/28</p>
                </div>
              </div>
            </div>
            <div className="mt-auto rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-sidebar-muted">
                    Available to spend
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold">
                    €8,420.60
                  </p>
                </div>
                <Sparkles size={20} className="text-accent" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-line p-5 md:px-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Recent activity
              </h2>
              <p className="mt-1 text-xs text-muted">
                Latest movements across your accounts
              </p>
            </div>
            <Button variant="ghost">
              View all <ArrowRight size={15} />
            </Button>
          </div>
          <div className="divide-y divide-line">
            {transactions.slice(0, 4).map((item) => (
              <div
                key={item.merchant}
                className="flex items-center gap-3 px-5 py-4 md:px-6"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-canvas text-xs font-bold text-ink">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {item.merchant}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {item.category} · {item.date}
                  </p>
                </div>
                <p
                  className={`text-sm font-bold ${
                    item.positive ? "text-success" : "text-ink"
                  }`}
                >
                  {item.amount}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Your accounts
              </h2>
              <p className="mt-1 text-xs text-muted">3 currencies connected</p>
            </div>
            <IconButton label="Account options">
              <MoreHorizontal size={18} />
            </IconButton>
          </div>
          <div className="divide-y divide-line px-5">
            {accounts.map((account, index) => (
              <div key={account.name} className="flex items-center gap-3 py-4">
                <div
                  className={`grid size-10 place-items-center rounded-xl ${
                    index === 0
                      ? "bg-mint text-accent-strong"
                      : index === 1
                        ? "bg-info-soft text-info"
                        : "bg-purple-soft text-purple"
                  }`}
                >
                  <Landmark size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {account.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {account.currency} {account.number}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ink">
                    {account.balance}
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold text-success">
                    {account.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
