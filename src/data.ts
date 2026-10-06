export type Transaction = {
  merchant: string
  category: string
  date: string
  amount: string
  positive?: boolean
  icon: string
}

export const accounts = [
  {
    name: "Everyday account",
    number: "•• 4821",
    currency: "EUR",
    balance: "€24,680.40",
    change: "+2.8%",
  },
  {
    name: "Savings vault",
    number: "•• 9134",
    currency: "EUR",
    balance: "€18,200.00",
    change: "+6.4%",
  },
  {
    name: "Travel account",
    number: "•• 2740",
    currency: "USD",
    balance: "$5,920.86",
    change: "−1.2%",
  },
]

export const transactions: Transaction[] = [
  {
    merchant: "Figma, Inc.",
    category: "Software",
    date: "Today, 10:24",
    amount: "−€15.00",
    icon: "FI",
  },
  {
    merchant: "Salary payment",
    category: "Income",
    date: "Yesterday, 09:00",
    amount: "+€4,850.00",
    positive: true,
    icon: "SP",
  },
  {
    merchant: "Green Market",
    category: "Groceries",
    date: "Jun 18, 18:42",
    amount: "−€68.40",
    icon: "GM",
  },
  {
    merchant: "Nordic Rail",
    category: "Transport",
    date: "Jun 17, 14:15",
    amount: "−€42.90",
    icon: "NR",
  },
  {
    merchant: "Cloudbase",
    category: "Infrastructure",
    date: "Jun 16, 11:20",
    amount: "−€89.00",
    icon: "CB",
  },
]

export const bugs = [
  {
    id: "BUG-0142",
    title: "Transfer is duplicated after network retry",
    severity: "Critical",
    status: "Ready for retest",
    assignee: "M. Chen",
    age: "2h",
  },
  {
    id: "BUG-0138",
    title: "Card limit accepts value above account balance",
    severity: "High",
    status: "In progress",
    assignee: "A. Lewis",
    age: "1d",
  },
  {
    id: "BUG-0135",
    title: "Transaction filter resets on page change",
    severity: "Medium",
    status: "Open",
    assignee: "Unassigned",
    age: "2d",
  },
  {
    id: "BUG-0129",
    title: "Exchange quote expires without announcement",
    severity: "Medium",
    status: "Fixed",
    assignee: "N. Carter",
    age: "4d",
  },
  {
    id: "BUG-0121",
    title: "Long merchant name overlaps mobile layout",
    severity: "Low",
    status: "Verified",
    assignee: "S. Park",
    age: "6d",
  },
]

export const requirements = [
  {
    id: "REQ-083",
    title: "Idempotent customer transfer",
    meta: "Payments",
    status: "Approved",
    priority: "Must",
  },
  {
    id: "REQ-082",
    title: "Multi-currency account overview",
    meta: "Accounts",
    status: "In review",
    priority: "Should",
  },
  {
    id: "REQ-079",
    title: "Freeze and unfreeze virtual card",
    meta: "Cards",
    status: "Approved",
    priority: "Must",
  },
  {
    id: "REQ-076",
    title: "Filter transaction history by date",
    meta: "Transactions",
    status: "Draft",
    priority: "Could",
  },
]

export const testCases = [
  {
    id: "TC-312",
    title: "Retry transfer with same idempotency key",
    meta: "REQ-083",
    status: "Ready",
    priority: "P0",
  },
  {
    id: "TC-309",
    title: "Transfer exceeds available balance",
    meta: "REQ-083",
    status: "Ready",
    priority: "P0",
  },
  {
    id: "TC-304",
    title: "Freeze active virtual card",
    meta: "REQ-079",
    status: "Ready",
    priority: "P1",
  },
  {
    id: "TC-298",
    title: "Empty transaction date range",
    meta: "REQ-076",
    status: "Draft",
    priority: "P2",
  },
]

export const releases = [
  {
    id: "v1.8.0",
    title: "Reliable transfers",
    meta: "Target Jun 28",
    status: "Release candidate",
    priority: "12 items",
  },
  {
    id: "v1.7.2",
    title: "Card controls patch",
    meta: "Released Jun 14",
    status: "Released",
    priority: "6 items",
  },
  {
    id: "v1.9.0",
    title: "Multi-currency foundation",
    meta: "Target Jul 19",
    status: "Planning",
    priority: "18 items",
  },
]
