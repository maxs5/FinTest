import { lazy, Suspense, useState } from "react"
import { AppShell, type PageId } from "./components/AppShell"
import AuthPage from "./pages/Auth"
import Dashboard from "./pages/Dashboard"

const AccountsPage = lazy(() =>
  import("./pages/Banking").then((module) => ({ default: module.AccountsPage })),
)
const CardsPage = lazy(() =>
  import("./pages/Banking").then((module) => ({ default: module.CardsPage })),
)
const ExchangePage = lazy(() =>
  import("./pages/Banking").then((module) => ({ default: module.ExchangePage })),
)
const PaymentsPage = lazy(() =>
  import("./pages/Banking").then((module) => ({ default: module.PaymentsPage })),
)
const TransactionsPage = lazy(() =>
  import("./pages/Banking").then((module) => ({ default: module.TransactionsPage })),
)
const TransferPage = lazy(() =>
  import("./pages/Banking").then((module) => ({ default: module.TransferPage })),
)
const ApiPlayground = lazy(() =>
  import("./pages/Quality").then((module) => ({ default: module.ApiPlayground })),
)
const BugsPage = lazy(() =>
  import("./pages/Quality").then((module) => ({ default: module.BugsPage })),
)
const EnvironmentsPage = lazy(() =>
  import("./pages/Quality").then((module) => ({ default: module.EnvironmentsPage })),
)
const QADashboard = lazy(() =>
  import("./pages/Quality").then((module) => ({ default: module.QADashboard })),
)
const ReportsPage = lazy(() =>
  import("./pages/Quality").then((module) => ({ default: module.ReportsPage })),
)
const TestRunsPage = lazy(() =>
  import("./pages/Quality").then((module) => ({ default: module.TestRunsPage })),
)
const WorkspaceList = lazy(() =>
  import("./pages/Quality").then((module) => ({ default: module.WorkspaceList })),
)

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <div className="mx-auto size-9 animate-spin rounded-full border-2 border-line border-t-accent-strong" />
        <p className="mt-3 text-sm font-semibold text-muted">Loading workspace…</p>
      </div>
    </div>
  )
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(true)
  const [page, setPage] = useState<PageId>("overview")

  if (!authenticated) {
    return <AuthPage onLogin={() => setAuthenticated(true)} />
  }

  const pages: Record<PageId, React.ReactNode> = {
    overview: <Dashboard onTransfer={() => setPage("transfer")} />,
    accounts: <AccountsPage />,
    activity: <TransactionsPage />,
    transfer: <TransferPage />,
    cards: <CardsPage />,
    payments: <PaymentsPage />,
    exchange: <ExchangePage />,
    "qa-dashboard": <QADashboard />,
    requirements: <WorkspaceList kind="requirements" />,
    "test-cases": <WorkspaceList kind="test-cases" />,
    "test-runs": <TestRunsPage />,
    bugs: <BugsPage />,
    releases: <WorkspaceList kind="releases" />,
    api: <ApiPlayground />,
    environments: <EnvironmentsPage />,
    reports: <ReportsPage />,
  }

  return (
    <AppShell
      active={page}
      onSelect={setPage}
      onSignOut={() => setAuthenticated(false)}
    >
      <Suspense fallback={<PageLoader />}>{pages[page]}</Suspense>
    </AppShell>
  )
}
