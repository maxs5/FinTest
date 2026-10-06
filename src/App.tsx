import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { AppShell, type PageId } from "./components/AppShell"
import { Button, Card } from "./components/ui"
import AuthPage from "./pages/Auth"
import Dashboard from "./pages/Dashboard"

const AccountsPage = lazy(() =>
  import("./pages/Banking").then((module) => ({
    default: module.AccountsPage,
  })),
)
const CardsPage = lazy(() =>
  import("./pages/Banking").then((module) => ({ default: module.CardsPage })),
)
const ExchangePage = lazy(() =>
  import("./pages/Banking").then((module) => ({
    default: module.ExchangePage,
  })),
)
const PaymentsPage = lazy(() =>
  import("./pages/Banking").then((module) => ({
    default: module.PaymentsPage,
  })),
)
const TransactionsPage = lazy(() =>
  import("./pages/Banking").then((module) => ({
    default: module.TransactionsPage,
  })),
)
const TransferPage = lazy(() =>
  import("./pages/Banking").then((module) => ({
    default: module.TransferPage,
  })),
)
const ApiPlayground = lazy(() =>
  import("./pages/Quality").then((module) => ({
    default: module.ApiPlayground,
  })),
)
const BugsPage = lazy(() =>
  import("./pages/Quality").then((module) => ({ default: module.BugsPage })),
)
const EnvironmentsPage = lazy(() =>
  import("./pages/Quality").then((module) => ({
    default: module.EnvironmentsPage,
  })),
)
const QADashboard = lazy(() =>
  import("./pages/Quality").then((module) => ({ default: module.QADashboard })),
)
const ReportsPage = lazy(() =>
  import("./pages/Quality").then((module) => ({
    default: module.ReportsPage,
  })),
)
const TestRunsPage = lazy(() =>
  import("./pages/Quality").then((module) => ({
    default: module.TestRunsPage,
  })),
)
const WorkspaceList = lazy(() =>
  import("./pages/Quality").then((module) => ({
    default: module.WorkspaceList,
  })),
)

const pageIds: PageId[] = [
  "overview",
  "accounts",
  "activity",
  "transfer",
  "cards",
  "payments",
  "exchange",
  "qa-dashboard",
  "requirements",
  "test-cases",
  "test-runs",
  "bugs",
  "releases",
  "api",
  "environments",
  "reports",
]

function isPageId(value: string): value is PageId {
  return pageIds.includes(value as PageId)
}

function pageFromHash(hash: string): PageId {
  const value = hash.replace(/^#\/?/, "")
  return isPageId(value) ? value : "overview"
}

function usePageNavigation(): [PageId, (page: PageId) => void] {
  const [page, setPage] = useState<PageId>(() =>
    pageFromHash(window.location.hash),
  )

  useEffect(() => {
    const handleHashChange = () => setPage(pageFromHash(window.location.hash))
    window.addEventListener("hashchange", handleHashChange)

    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navigate = (nextPage: PageId) => {
    window.location.hash = `/${nextPage}`
  }

  return [page, navigate]
}

function PageLoader() {
  return (
    <div
      className="grid min-h-[60vh] place-items-center"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="text-center">
        <div className="mx-auto size-9 animate-spin rounded-full border-2 border-line border-t-accent-strong" />
        <p className="mt-3 text-sm font-semibold text-muted">
          Loading workspace…
        </p>
      </div>
    </div>
  )
}

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("FinTest application error", error, info)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <main className="grid min-h-screen place-items-center bg-canvas p-6">
        <Card className="w-full max-w-lg p-8 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-danger-soft text-danger">
            <AlertTriangle size={24} />
          </div>
          <h1 className="mt-5 font-display text-2xl font-semibold">
            Something went wrong
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            FinTest recovered the application shell. Retry the current view before refreshing
            the entire page.
          </p>
          <Button className="mt-6" onClick={() => window.location.reload()}>
            <RefreshCw size={16} />
            Reload application
          </Button>
        </Card>
      </main>
    )
  }
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(true)
  const [page, setPage] = usePageNavigation()

  if (!authenticated) {
    return (
      <AppErrorBoundary>
        <AuthPage onLogin={() => setAuthenticated(true)} />
      </AppErrorBoundary>
    )
  }

  const pages: Record<PageId, ReactNode> = {
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
    <AppErrorBoundary>
      <AppShell
        active={page}
        onSelect={setPage}
        onSignOut={() => setAuthenticated(false)}
      >
        <Suspense fallback={<PageLoader />}>{pages[page]}</Suspense>
      </AppShell>
    </AppErrorBoundary>
  )
}
