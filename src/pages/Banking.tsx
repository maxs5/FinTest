import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Eye,
  Filter,
  Landmark,
  Lock,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Snowflake,
  WalletCards,
} from "lucide-react"
import { useState } from "react"
import { accounts, transactions } from "../data"
import {
  Badge,
  Button,
  Card,
  Field,
  IconButton,
  inputClass,
  PageHeader,
} from "../components/ui"

export function AccountsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Personal banking"
        title="Accounts"
        description="Manage balances across currencies and keep every account state visible."
        actions={
          <Button>
            <Plus size={16} /> Open account
          </Button>
        }
      />
      <Card className="overflow-hidden bg-sidebar p-6 text-white md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sidebar-muted">
              Combined balance
            </p>
            <p className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              €48,362.18
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-accent">
              <ArrowUpRight size={17} /> €1,245.20 this month
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {["EUR · 87%", "USD · 11%", "GBP · 2%"].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-white/10 px-4 py-3 text-xs font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-3">
        {accounts.map((account, index) => (
          <Card
            key={account.name}
            className="p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div
                className={`grid size-11 place-items-center rounded-xl ${
                  index === 0
                    ? "bg-mint text-accent-strong"
                    : index === 1
                      ? "bg-info-soft text-info"
                      : "bg-purple-soft text-purple"
                }`}
              >
                <Landmark size={20} />
              </div>
              <IconButton label="Account menu">
                <MoreHorizontal size={18} />
              </IconButton>
            </div>
            <p className="mt-7 text-sm font-semibold text-muted">
              {account.name}
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-ink">
              {account.balance}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
              <span className="text-xs font-semibold text-muted">
                {account.currency} {account.number}
              </span>
              <Badge tone={index === 2 ? "warning" : "success"}>
                {index === 2 ? "Review" : "Active"}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function TransactionsPage() {
  const [query, setQuery] = useState("")
  const filtered = transactions.filter((item) =>
    item.merchant.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Money movement"
        title="Transactions"
        description="Search, filter, and inspect every movement across all connected accounts."
        actions={<Button variant="secondary">Export CSV</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Money in", "€7,840.00", "This month", ArrowDownLeft, "success"],
          ["Money out", "€3,215.80", "This month", ArrowUpRight, "danger"],
          ["Net flow", "+€4,624.20", "+18.4%", ArrowLeftRight, "info"],
        ].map(([label, value, detail, Icon, tone]) => (
          <Card key={String(label)} className="flex items-center gap-4 p-5">
            <div
              className={`grid size-11 place-items-center rounded-xl ${
                tone === "success"
                  ? "bg-success-soft text-success"
                  : tone === "danger"
                    ? "bg-danger-soft text-danger"
                    : "bg-info-soft text-info"
              }`}
            >
              <Icon size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted">
                {label as string}
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-ink">
                {value as string}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold text-muted">
                {detail as string}
              </p>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 text-muted" size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={`${inputClass} pl-10`}
              placeholder="Search merchant or category"
            />
          </div>
          <Button variant="secondary">
            <Filter size={16} /> Filters
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-2xl text-left">
            <thead>
              <tr className="border-b border-line text-[10px] uppercase tracking-widest text-muted">
                <th className="px-6 py-4 font-bold">Transaction</th>
                <th className="px-4 py-4 font-bold">Date</th>
                <th className="px-4 py-4 font-bold">Account</th>
                <th className="px-4 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((item) => (
                <tr
                  key={item.merchant}
                  className="transition hover:bg-canvas/70"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-lg bg-canvas text-[10px] font-bold">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.merchant}</p>
                        <p className="text-xs text-muted">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted">{item.date}</td>
                  <td className="px-4 py-4 text-sm text-muted">•• 4821</td>
                  <td className="px-4 py-4">
                    <Badge tone="success">Completed</Badge>
                  </td>
                  <td
                    className={`px-6 py-4 text-right text-sm font-bold ${
                      item.positive ? "text-success" : "text-ink"
                    }`}
                  >
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export function TransferPage() {
  const [sent, setSent] = useState(false)
  if (sent) {
    return (
      <div className="mx-auto max-w-xl py-12">
        <Card className="p-8 text-center md:p-12">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-success-soft text-success">
            <Check size={30} />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold text-ink">
            Transfer scheduled
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            €850.00 is on its way to Morgan Chen. Reference FT-829104.
          </p>
          <div className="mt-8 rounded-2xl bg-canvas p-5 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Amount</span>
              <strong>€850.00</strong>
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-muted">Fee</span>
              <strong>€0.00</strong>
            </div>
            <div className="mt-3 flex justify-between border-t border-line pt-3 text-sm">
              <span className="text-muted">Arrives</span>
              <strong>Today</strong>
            </div>
          </div>
          <Button className="mt-7 w-full" onClick={() => setSent(false)}>
            Make another transfer
          </Button>
        </Card>
      </div>
    )
  }
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Secure transfer"
        title="Send money"
        description="Fast, protected transfers with live validation and zero hidden fees."
      />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6 md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="From account">
              <select className={inputClass}>
                <option>Everyday account · €24,680.40</option>
                <option>Savings vault · €18,200.00</option>
              </select>
            </Field>
            <Field label="Recipient">
              <select className={inputClass}>
                <option>Morgan Chen · DE•• 1842</option>
                <option>Jordan Davis · FR•• 9201</option>
              </select>
            </Field>
          </div>
          <div className="mt-6">
            <Field label="Amount" hint="Available today: €24,680.40">
              <div className="relative">
                <span className="absolute left-4 top-3 font-display text-lg font-semibold">
                  €
                </span>
                <input
                  className={`${inputClass} pl-9 text-lg font-semibold`}
                  defaultValue="850.00"
                />
              </div>
            </Field>
          </div>
          <div className="mt-6">
            <Field label="Reference">
              <input
                className={inputClass}
                placeholder="What is this payment for?"
                defaultValue="Design system consultation"
              />
            </Field>
          </div>
          <div className="mt-6 grid gap-3 rounded-2xl bg-success-soft p-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-success">Transfer fee</p>
              <p className="mt-1 text-sm font-bold text-success">Free</p>
            </div>
            <div>
              <p className="text-xs text-success">Estimated arrival</p>
              <p className="mt-1 text-sm font-bold text-success">Today</p>
            </div>
            <div>
              <p className="text-xs text-success">Protection</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-bold text-success">
                <ShieldCheck size={14} /> Verified
              </p>
            </div>
          </div>
          <Button onClick={() => setSent(true)} className="mt-7 w-full py-3.5">
            <Send size={17} /> Review and send €850.00
          </Button>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            Transfer summary
          </p>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-xl bg-mint text-accent-strong">
                <Landmark size={20} />
              </div>
              <p className="mt-2 text-xs font-semibold">You</p>
            </div>
            <div className="flex-1 px-4">
              <div className="h-px bg-line" />
              <div className="mx-auto -mt-4 grid size-8 place-items-center rounded-full border border-line bg-white">
                <ArrowRight size={15} />
              </div>
            </div>
            <div className="text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-xl bg-purple-soft font-display text-sm font-bold text-purple">
                MC
              </div>
              <p className="mt-2 text-xs font-semibold">Morgan</p>
            </div>
          </div>
          <div className="mt-8 space-y-4 border-t border-line pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">You send</span>
              <strong>€850.00</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">They receive</span>
              <strong>€850.00</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Exchange rate</span>
              <strong>Same currency</strong>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export function CardsPage() {
  const [frozen, setFrozen] = useState(false)
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Card controls"
        title="Your cards"
        description="Spend confidently with instant controls, clear limits, and real-time protection."
        actions={
          <Button>
            <Plus size={16} /> New virtual card
          </Button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div
          className={`relative min-h-72 overflow-hidden rounded-3xl p-7 text-white shadow-xl transition ${
            frozen ? "bg-slate-500" : "bg-sidebar"
          }`}
        >
          <div className="absolute -right-16 -top-24 size-64 rounded-full border-[36px] border-white/5" />
          <div className="relative flex h-full flex-col">
            <div className="flex justify-between">
              <p className="font-display text-xl font-bold">FinTest</p>
              <CreditCard size={28} className="text-accent" />
            </div>
            <p className="mt-auto font-mono text-xl tracking-[0.18em]">
              4821 •••• •••• 8392
            </p>
            <div className="mt-6 flex justify-between text-xs">
              <div>
                <p className="text-sidebar-muted">CARD HOLDER</p>
                <p className="mt-1 font-bold">ALEX LEWIS</p>
              </div>
              <div>
                <p className="text-sidebar-muted">EXPIRES</p>
                <p className="mt-1 font-bold">09/28</p>
              </div>
            </div>
            {frozen && (
              <div className="absolute inset-0 grid place-items-center">
                <Badge tone="neutral">
                  <Snowflake size={13} /> Frozen
                </Badge>
              </div>
            )}
          </div>
        </div>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">
                Everyday Debit
              </h2>
              <p className="mt-1 text-sm text-muted">Physical · Visa</p>
            </div>
            <Badge tone={frozen ? "warning" : "success"}>
              {frozen ? "Frozen" : "Active"}
            </Badge>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <Button variant="secondary">
              <Eye size={16} /> Show details
            </Button>
            <Button
              variant={frozen ? "primary" : "secondary"}
              onClick={() => setFrozen(!frozen)}
            >
              {frozen ? <Lock size={16} /> : <Snowflake size={16} />}
              {frozen ? "Unfreeze" : "Freeze card"}
            </Button>
          </div>
          <div className="mt-7">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Monthly card limit</span>
              <strong>€3,240 / €5,000</strong>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-canvas">
              <div className="h-full w-2/3 rounded-full bg-accent" />
            </div>
          </div>
          <div className="mt-7 space-y-1 border-t border-line pt-4">
            {[
              "Card security",
              "Spending limits",
              "Online payments",
              "Connected subscriptions",
            ].map((item) => (
              <button
                key={item}
                className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-sm font-semibold hover:bg-canvas"
              >
                <span>{item}</span>
                <ChevronRight size={16} className="text-muted" />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export function PaymentsPage() {
  return (
    <GenericBankPage
      title="Payments"
      eyebrow="Bills & merchants"
      description="Manage scheduled bills, merchant payments, and recurring subscriptions."
      icon={WalletCards}
      action="New payment"
      rows={[
        "Figma Professional",
        "Cloudbase Infrastructure",
        "Nordic Energy",
        "Workspace Insurance",
      ]}
    />
  )
}

export function ExchangePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Live rates"
        title="Currency exchange"
        description="Convert instantly between your balances with transparent rates."
      />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6 md:p-8">
          <Field label="You sell">
            <div className="flex gap-3">
              <input
                className={`${inputClass} text-xl font-semibold`}
                defaultValue="1,000.00"
              />
              <select className={`${inputClass} w-32 font-bold`}>
                <option>EUR</option>
              </select>
            </div>
          </Field>
          <div className="my-4 flex justify-center">
            <IconButton label="Swap currencies">
              <ArrowLeftRight size={18} />
            </IconButton>
          </div>
          <Field label="You receive">
            <div className="flex gap-3">
              <input
                className={`${inputClass} text-xl font-semibold`}
                defaultValue="1,073.42"
              />
              <select className={`${inputClass} w-32 font-bold`}>
                <option>USD</option>
              </select>
            </div>
          </Field>
          <div className="mt-6 rounded-xl bg-canvas p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Live rate</span>
              <strong>€1 = $1.07342</strong>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-muted">Fee</span>
              <strong>€0.00</strong>
            </div>
          </div>
          <Button className="mt-6 w-full">Review exchange</Button>
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold">Market rates</h2>
          <div className="mt-5 divide-y divide-line">
            {[
              ["EUR / USD", "1.07342", "+0.34%"],
              ["EUR / GBP", "0.84612", "−0.08%"],
              ["GBP / USD", "1.26865", "+0.41%"],
            ].map(([pair, rate, move]) => (
              <div key={pair} className="flex items-center py-4">
                <div className="grid size-10 place-items-center rounded-xl bg-info-soft text-info">
                  <CircleDollarSign size={18} />
                </div>
                <p className="ml-3 flex-1 text-sm font-bold">{pair}</p>
                <div className="text-right">
                  <p className="text-sm font-bold">{rate}</p>
                  <p
                    className={`text-xs font-semibold ${
                      move.startsWith("+") ? "text-success" : "text-danger"
                    }`}
                  >
                    {move}
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

function GenericBankPage({
  title,
  eyebrow,
  description,
  icon: Icon,
  action,
  rows,
}: {
  title: string
  eyebrow: string
  description: string
  icon: typeof WalletCards
  action: string
  rows: string[]
}) {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <Button>
            <Plus size={16} /> {action}
          </Button>
        }
      />
      <Card>
        <div className="border-b border-line p-5">
          <h2 className="font-display text-lg font-semibold">
            Upcoming and recent
          </h2>
        </div>
        <div className="divide-y divide-line">
          {rows.map((row, index) => (
            <div key={row} className="flex items-center gap-4 p-5">
              <div className="grid size-11 place-items-center rounded-xl bg-mint text-accent-strong">
                <Icon size={19} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{row}</p>
                <p className="mt-1 text-xs text-muted">
                  {index < 2 ? "Recurring monthly" : "One-time payment"}
                </p>
              </div>
              <Badge tone={index === 2 ? "warning" : "success"}>
                {index === 2 ? "Due soon" : "Active"}
              </Badge>
              <p className="w-24 text-right text-sm font-bold">
                −€{[15, 89, 124, 42][index]}.00
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
