import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  Box,
  Bug,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Code2,
  Copy,
  FileCheck2,
  Filter,
  FlaskConical,
  Gauge,
  Globe2,
  MoreHorizontal,
  Play,
  Plus,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  TestTube2,
  Timer,
  TrendingUp,
  XCircle,
  type LucideIcon,
} from "lucide-react"
import { useState } from "react"
import { bugs, releases, requirements, testCases } from "../data"
import {
  Badge,
  Button,
  Card,
  IconButton,
  inputClass,
  PageHeader,
  StatCard,
} from "../components/ui"

export function QADashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Release v1.8.0 · Preview"
        title="Quality overview"
        description="A live picture of release confidence, traceability, and execution health."
        actions={
          <>
            <Button variant="secondary">
              <FileCheck2 size={16} /> View report
            </Button>
            <Button>
              <Play size={16} /> Start test run
            </Button>
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Release confidence"
          value="92%"
          detail="+6% since last run"
          icon={ShieldCheck}
        />
        <StatCard
          label="Tests passed"
          value="248"
          detail="96.1% pass rate"
          icon={CheckCircle2}
          tone="blue"
        />
        <StatCard
          label="Open defects"
          value="12"
          detail="2 blockers need review"
          icon={Bug}
          tone="amber"
        />
        <StatCard
          label="Requirements"
          value="38/40"
          detail="95% covered"
          icon={BookOpenCheck}
          tone="purple"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">
                Release readiness
              </h2>
              <p className="mt-1 text-xs text-muted">
                Quality gates for production promotion
              </p>
            </div>
            <Badge tone="success">On track</Badge>
          </div>
          <div className="mt-7 space-y-5">
            {[
              ["Critical regression", "248 / 258 passed", 96, "success"],
              ["Requirement coverage", "38 / 40 covered", 95, "info"],
              ["Defect resolution", "31 / 36 resolved", 86, "warning"],
              ["Security baseline", "18 / 18 checks", 100, "success"],
            ].map(([label, detail, value, tone]) => (
              <div key={String(label)}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{label as string}</span>
                  <span className="text-muted">{detail as string}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-canvas">
                  <div
                    className={`h-full rounded-full ${
                      tone === "success"
                        ? "bg-success"
                        : tone === "info"
                          ? "bg-info"
                          : "bg-warning"
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 flex items-center gap-3 rounded-xl bg-success-soft p-4 text-sm font-semibold text-success">
            <CheckCircle2 size={19} /> 4 of 5 release gates passed. Performance
            review remains.
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold">
            Execution results
          </h2>
          <div className="mx-auto mt-7 grid size-44 place-items-center rounded-full bg-[conic-gradient(var(--color-success)_0_78%,var(--color-warning)_78%_88%,var(--color-danger)_88%_94%,var(--color-line)_94%_100%)]">
            <div className="grid size-32 place-items-center rounded-full bg-white text-center">
              <div>
                <p className="font-display text-3xl font-semibold">258</p>
                <p className="text-xs font-semibold text-muted">total tests</p>
              </div>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3">
            {[
              ["Passed", "201", "success"],
              ["Failed", "16", "danger"],
              ["Blocked", "15", "warning"],
              ["Skipped", "26", "neutral"],
            ].map(([label, value, tone]) => (
              <div key={label} className="rounded-xl bg-canvas p-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`size-2 rounded-full ${
                      tone === "success"
                        ? "bg-success"
                        : tone === "danger"
                          ? "bg-danger"
                          : tone === "warning"
                            ? "bg-warning"
                            : "bg-muted"
                    }`}
                  />
                  <span className="text-xs text-muted">{label}</span>
                </div>
                <p className="mt-1 font-display text-lg font-semibold">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <h2 className="font-display text-lg font-semibold">
                Latest defects
              </h2>
              <p className="mt-1 text-xs text-muted">
                Highest-impact issues in the current release
              </p>
            </div>
            <Button variant="ghost">
              View all <ArrowRight size={15} />
            </Button>
          </div>
          <div className="divide-y divide-line">
            {bugs.slice(0, 4).map((bug) => (
              <div key={bug.id} className="flex items-center gap-3 p-4">
                <div className="grid size-9 place-items-center rounded-lg bg-danger-soft text-danger">
                  <Bug size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{bug.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {bug.id} · {bug.assignee}
                  </p>
                </div>
                <Badge
                  tone={
                    bug.severity === "Critical"
                      ? "danger"
                      : bug.severity === "High"
                        ? "warning"
                        : "neutral"
                  }
                >
                  {bug.severity}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">
                Recent activity
              </h2>
              <p className="mt-1 text-xs text-muted">Project timeline</p>
            </div>
            <Activity size={18} className="text-muted" />
          </div>
          <div className="mt-5 space-y-5">
            {[
              ["Test run completed", "Regression #84 · 96% passed", "12m"],
              ["BUG-0142 moved", "Ready for retest by M. Chen", "1h"],
              ["Requirement approved", "REQ-083 · Idempotent transfer", "3h"],
              [
                "Release candidate deployed",
                "v1.8.0 · Preview environment",
                "5h",
              ],
            ].map(([title, detail, time], index) => (
              <div key={title} className="flex gap-3">
                <div className="relative">
                  <span
                    className={`block size-3 rounded-full border-2 border-white ${
                      index === 0 ? "bg-success" : "bg-info"
                    }`}
                  />
                  {index < 3 && (
                    <span className="absolute left-1.5 top-3 h-12 w-px bg-line" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs text-muted">{detail}</p>
                </div>
                <span className="text-[10px] text-muted">{time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

type WorkspaceRow = {
  id: string
  title: string
  meta: string
  status: string
  priority: string
}

export function WorkspaceList({
  kind,
}: {
  kind: "requirements" | "test-cases" | "releases"
}) {
  const config = {
    requirements: {
      title: "Requirements",
      eyebrow: "Traceability",
      description:
        "Define product behavior, acceptance criteria, and release scope.",
      action: "New requirement",
      icon: BookOpenCheck,
      rows: requirements,
    },
    "test-cases": {
      title: "Test cases",
      eyebrow: "Test design",
      description:
        "Reusable scenarios with clear preconditions, steps, and expected results.",
      action: "New test case",
      icon: FileCheck2,
      rows: testCases,
    },
    releases: {
      title: "Releases",
      eyebrow: "Delivery control",
      description:
        "Plan scope, monitor quality gates, and promote with confidence.",
      action: "New release",
      icon: Rocket,
      rows: releases,
    },
  }[kind]
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        actions={
          <Button>
            <Plus size={16} /> {config.action}
          </Button>
        }
      />
      <DataWorkspace rows={config.rows} icon={config.icon} />
    </div>
  )
}

function DataWorkspace({
  rows,
  icon: Icon,
}: {
  rows: WorkspaceRow[]
  icon: LucideIcon
}) {
  const [query, setQuery] = useState("")
  const filtered = rows.filter((row) =>
    `${row.id} ${row.title}`.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <Card>
      <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3.5 top-3 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={`${inputClass} pl-10`}
            placeholder="Search by ID or title"
          />
        </div>
        <Button variant="secondary">
          <Filter size={16} /> Filter
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-2xl text-left">
          <thead>
            <tr className="border-b border-line text-[10px] uppercase tracking-widest text-muted">
              <th className="px-6 py-4">Item</th>
              <th className="px-4 py-4">Component / Link</th>
              <th className="px-4 py-4">Priority</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((row) => (
              <tr key={row.id} className="hover:bg-canvas/70">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-mint text-accent-strong">
                      <Icon size={17} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{row.title}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted">
                        {row.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-muted">{row.meta}</td>
                <td className="px-4 py-4">
                  <Badge tone="neutral">{row.priority}</Badge>
                </td>
                <td className="px-4 py-4">
                  <Badge
                    tone={
                      row.status.includes("Approved") ||
                      row.status.includes("Ready") ||
                      row.status.includes("Released")
                        ? "success"
                        : row.status.includes("review") ||
                            row.status.includes("candidate")
                          ? "warning"
                          : "info"
                    }
                  >
                    {row.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <IconButton label="More options">
                    <MoreHorizontal size={17} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export function TestRunsPage() {
  const runs = [
    ["RUN-0084", "v1.8.0 Regression", "Preview", "96%", "Completed"],
    ["RUN-0083", "Transfer hotfix retest", "Preview", "100%", "Completed"],
    ["RUN-0082", "Core banking smoke", "Development", "82%", "In progress"],
    ["RUN-0081", "Card controls regression", "PROD-SIM", "98%", "Completed"],
  ]
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Execution"
        title="Test runs"
        description="Execute test sets against a release and environment with real-time outcomes."
        actions={
          <Button>
            <Play size={16} /> Start test run
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Pass rate"
          value="96.1%"
          detail="+3.2% over 30 days"
          icon={TrendingUp}
        />
        <StatCard
          label="Avg. duration"
          value="42m"
          detail="8m faster than target"
          icon={Timer}
          tone="blue"
        />
        <StatCard
          label="Automation"
          value="68%"
          detail="176 automated cases"
          icon={Gauge}
          tone="purple"
        />
      </div>
      <Card>
        <div className="divide-y divide-line">
          {runs.map(([id, name, env, rate, status]) => (
            <div
              key={id}
              className="grid gap-4 p-5 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-info-soft text-info">
                  <TestTube2 size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {id} · {env}
                  </p>
                </div>
              </div>
              <div className="w-32">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted">Passed</span>
                  <strong>{rate}</strong>
                </div>
                <div className="h-1.5 rounded-full bg-canvas">
                  <div
                    className="h-full rounded-full bg-success"
                    style={{ width: rate }}
                  />
                </div>
              </div>
              <Badge tone={status === "Completed" ? "success" : "warning"}>
                {status}
              </Badge>
              <IconButton label="Open run">
                <ArrowRight size={17} />
              </IconButton>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export function BugsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Defect management"
        title="Bugs"
        description="Triage, investigate, and verify defects through a controlled lifecycle."
        actions={
          <Button>
            <Plus size={16} /> Report bug
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          ["Critical", "1", "danger"],
          ["High", "3", "warning"],
          ["In progress", "5", "info"],
          ["Ready for retest", "3", "success"],
        ].map(([label, value, tone]) => (
          <Card key={label} className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted">{label}</p>
              <span
                className={`size-2 rounded-full ${
                  tone === "danger"
                    ? "bg-danger"
                    : tone === "warning"
                      ? "bg-warning"
                      : tone === "info"
                        ? "bg-info"
                        : "bg-success"
                }`}
              />
            </div>
            <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>
      <Card>
        <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row">
          <div className="relative flex-1">
            <Search size={17} className="absolute left-3.5 top-3 text-muted" />
            <input
              className={`${inputClass} pl-10`}
              placeholder="Search bugs"
            />
          </div>
          <Button variant="secondary">
            <Filter size={16} /> All filters
          </Button>
        </div>
        <div className="divide-y divide-line">
          {bugs.map((bug) => (
            <div
              key={bug.id}
              className="grid gap-3 p-5 md:grid-cols-[1fr_auto_auto_auto] md:items-center"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid size-9 place-items-center rounded-lg bg-danger-soft text-danger">
                  <Bug size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{bug.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {bug.id} · Payments · {bug.age} ago
                  </p>
                </div>
              </div>
              <Badge
                tone={
                  bug.severity === "Critical"
                    ? "danger"
                    : bug.severity === "High"
                      ? "warning"
                      : "neutral"
                }
              >
                {bug.severity}
              </Badge>
              <Badge
                tone={
                  bug.status === "Verified" || bug.status === "Fixed"
                    ? "success"
                    : bug.status === "In progress"
                      ? "info"
                      : "warning"
                }
              >
                {bug.status}
              </Badge>
              <p className="text-xs font-semibold text-muted">{bug.assignee}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export function ApiPlayground() {
  const [sent, setSent] = useState(false)
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Developer tools"
        title="API playground"
        description="Explore endpoints against safe FinTest environments and inspect complete responses."
        actions={
          <Badge tone="success">
            <Circle className="fill-current" size={8} /> Preview connected
          </Badge>
        }
      />
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-line p-5 lg:border-b-0 lg:border-r">
            <div className="flex gap-2">
              <select className={`${inputClass} w-28 font-bold text-success`}>
                <option>GET</option>
                <option>POST</option>
              </select>
              <input className={inputClass} defaultValue="/api/accounts" />
            </div>
            <div className="mt-5 flex gap-4 border-b border-line text-xs font-semibold">
              <button className="border-b-2 border-ink pb-3 text-ink">
                Params
              </button>
              <button className="pb-3 text-muted">Headers</button>
              <button className="pb-3 text-muted">Body</button>
            </div>
            <div className="mt-5 space-y-3">
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <input
                  className={inputClass}
                  placeholder="Key"
                  defaultValue="status"
                />
                <input
                  className={inputClass}
                  placeholder="Value"
                  defaultValue="active"
                />
                <IconButton label="Remove parameter">
                  <XCircle size={17} />
                </IconButton>
              </div>
              <button className="text-xs font-bold text-accent-strong">
                + Add parameter
              </button>
            </div>
            <Button onClick={() => setSent(true)} className="mt-8 w-full">
              <Play size={16} /> Send request
            </Button>
          </div>
          <div className="bg-code p-5 text-sm text-code-text">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                {sent ? (
                  <Badge tone="success">200 OK</Badge>
                ) : (
                  <Badge>Ready</Badge>
                )}
                <span className="text-xs text-code-muted">
                  {sent ? "124 ms · 1.8 KB" : "Response will appear here"}
                </span>
              </div>
              <button
                className="text-code-muted hover:text-white"
                aria-label="Copy response"
              >
                <Copy size={17} />
              </button>
            </div>
            <pre className="mt-5 overflow-x-auto font-mono text-xs leading-6">
              {sent
                ? `{
  "data": [
    {
      "id": "acc_01HFT82K",
      "name": "Everyday account",
      "currency": "EUR",
      "balance": "24680.40",
      "status": "ACTIVE"
    },
    {
      "id": "acc_01HFT91M",
      "name": "Savings vault",
      "currency": "EUR",
      "balance": "18200.00",
      "status": "ACTIVE"
    }
  ],
  "meta": { "requestId": "req_84f92" }
}`
                : "// Select an endpoint and send a request."}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function EnvironmentsPage() {
  const environments = [
    ["Development", "Local / Development", "Healthy", "Latest main", "2m ago"],
    ["QA", "Vercel Preview", "Healthy", "v1.8.0-rc.3", "8m ago"],
    ["Stage", "RC Preview", "Degraded", "v1.8.0-rc.2", "14m ago"],
    ["PROD-SIM", "Vercel Production", "Healthy", "v1.7.2", "1h ago"],
  ]
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Runtime mapping"
        title="Environments"
        description="Logical FinTest environments mapped honestly to Vercel deployment targets."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {environments.map(([name, target, status, version, time], index) => (
          <Card key={name} className="p-5">
            <div className="flex items-start justify-between">
              <div
                className={`grid size-11 place-items-center rounded-xl ${
                  index === 2
                    ? "bg-warning-soft text-warning"
                    : "bg-success-soft text-success"
                }`}
              >
                <Server size={20} />
              </div>
              <Badge tone={status === "Healthy" ? "success" : "warning"}>
                {status}
              </Badge>
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold">{name}</h2>
            <p className="mt-1 text-sm text-muted">{target}</p>
            <div className="mt-5 grid grid-cols-2 border-t border-line pt-4 text-xs">
              <div>
                <p className="text-muted">Version</p>
                <p className="mt-1 font-semibold">{version}</p>
              </div>
              <div>
                <p className="text-muted">Last deploy</p>
                <p className="mt-1 font-semibold">{time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Quality intelligence"
        title="Reports"
        description="Stakeholder-ready insights across releases, defects, coverage, and execution."
        actions={<Button variant="secondary">Export PDF</Button>}
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          [
            "Release readiness",
            "92%",
            "Quality gates trend",
            ShieldCheck,
            "success",
          ],
          ["Defect escape rate", "1.4%", "−0.8% this quarter", Bug, "danger"],
          ["Automation coverage", "68%", "+12% this quarter", Code2, "info"],
        ].map(([title, value, detail, Icon, tone]) => (
          <Card key={String(title)} className="p-6">
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
            <p className="mt-5 text-sm font-semibold text-muted">
              {title as string}
            </p>
            <p className="mt-2 font-display text-4xl font-semibold">
              {value as string}
            </p>
            <p className="mt-2 text-xs font-semibold text-muted">
              {detail as string}
            </p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <h2 className="font-display text-lg font-semibold">Quality trend</h2>
        <div className="mt-8 flex h-64 items-end gap-4 border-b border-line">
          {[62, 68, 71, 74, 82, 86, 92].map((value, index) => (
            <div key={value} className="group flex h-full flex-1 items-end">
              <div
                className="w-full rounded-t-xl bg-mint transition group-hover:bg-accent"
                style={{ height: `${value}%` }}
              >
                <span className="hidden pt-2 text-center text-xs font-bold text-accent-strong sm:block">
                  {value}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-7 text-center text-[10px] font-semibold text-muted">
          {["v1.2", "v1.3", "v1.4", "v1.5", "v1.6", "v1.7", "v1.8"].map(
            (item) => (
              <span key={item}>{item}</span>
            ),
          )}
        </div>
      </Card>
    </div>
  )
}
