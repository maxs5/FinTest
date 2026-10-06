import {
  ArrowRight,
  CheckCircle2,
  Eye,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { useState, type FormEvent } from "react"
import { Button, Field, inputClass } from "../components/ui"

export default function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const submit = (event: FormEvent) => {
    event.preventDefault()
    onLogin()
  }
  return (
    <div className="grid min-h-screen bg-canvas/70 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-sidebar p-12 text-white lg:flex lg:flex-col">
        <div className="absolute -left-36 -top-44 size-[34rem] rounded-full border-[5rem] border-white/5" />
        <div className="absolute -bottom-48 -right-36 size-[32rem] rounded-full border-[5rem] border-accent/10" />
        <div className="relative flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-accent font-display text-xl font-black text-sidebar">
            F
          </div>
          <div>
            <p className="font-display text-xl font-bold">FinTest</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
              QA banking lab
            </p>
          </div>
        </div>
        <div className="relative my-auto max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-accent">
            <Sparkles size={14} /> Banking built for quality
          </div>
          <h1 className="mt-7 font-display text-5xl font-semibold leading-tight tracking-tight xl:text-6xl">
            One workspace.
            <br />
            Every quality signal.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-sidebar-text">
            Experience a complete digital bank and the QA workspace that keeps
            every requirement, test, defect, and release connected.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              ["92%", "Release confidence"],
              ["258", "Tests executed"],
              ["0", "Critical incidents"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="font-display text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-xs text-sidebar-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-sidebar-muted">
          Secure synthetic environment · No real funds
        </p>
      </section>
      <main className="flex items-center justify-center bg-canvas p-5 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="grid size-10 place-items-center rounded-xl bg-sidebar font-display text-lg font-black text-accent">
              F
            </div>
            <p className="font-display text-xl font-bold">FinTest</p>
          </div>
          <div className="flex rounded-xl bg-panel p-1 shadow-card">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                mode === "login" ? "bg-sidebar text-white" : "text-muted"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                mode === "register" ? "bg-sidebar text-white" : "text-muted"
              }`}
            >
              Create account
            </button>
          </div>
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-strong">
              {mode === "login" ? "Welcome back" : "Start exploring"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              {mode === "login"
                ? "Sign in to FinTest"
                : "Create your workspace"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              {mode === "login"
                ? "Use the demo account to explore the complete experience."
                : "Your safe, synthetic banking environment is ready in seconds."}
            </p>
          </div>
          <form className="mt-8 space-y-5" onSubmit={submit}>
            {mode === "register" && (
              <Field label="Full name">
                <input className={inputClass} placeholder="Alex Lewis" />
              </Field>
            )}
            <Field label="Work email">
              <input
                className={inputClass}
                type="email"
                defaultValue="alex@fintest.dev"
              />
            </Field>
            <Field label="Password">
              <div className="relative">
                <LockKeyhole
                  className="absolute left-3.5 top-3.5 text-muted"
                  size={17}
                />
                <input
                  className={`${inputClass} px-10`}
                  type="password"
                  defaultValue="fintestdemo"
                />
                <Eye
                  className="absolute right-3.5 top-3.5 text-muted"
                  size={17}
                />
              </div>
            </Field>
            {mode === "login" && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 font-semibold text-muted">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-accent-strong"
                  />{" "}
                  Remember me
                </label>
                <button type="button" className="font-bold text-accent-strong">
                  Forgot password?
                </button>
              </div>
            )}
            <Button className="w-full py-3.5">
              {mode === "login" ? "Enter workspace" : "Create account"}{" "}
              <ArrowRight size={16} />
            </Button>
          </form>
          <div className="mt-7 flex items-center justify-center gap-5 text-xs font-semibold text-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-success" /> Secure login
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-success" /> Demo ready
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
