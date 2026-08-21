"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "@/i18n/context";
import { cn } from "@/lib/utils";

const TYPE_MS = 26;
const OUTPUT_PAUSE_MS = 220;
const BETWEEN_MS = 420;

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = window.setTimeout(() => resolve(), ms);
    const onAbort = () => {
      window.clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    };
    if (signal.aborted) {
      onAbort();
      return;
    }
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

function Prompt({ user, host, cwd }: { user: string; host: string; cwd: string }) {
  return (
    <span className="shrink-0">
      <span className="text-[#4fa894]">{user}</span>
      <span className="text-[#6d8f88]">@</span>
      <span className="text-[#4fa894]">{host}</span>
      <span className="text-[#6d8f88]">:</span>
      <span className="text-[#7eb8c9]">{cwd}</span>
      <span className="ml-1 text-[#4fa894]">$</span>
    </span>
  );
}

function Cursor() {
  return (
    <motion.span
      aria-hidden
      className="ml-1 inline-block h-[13px] w-[7px] translate-y-px bg-[#4fa894] align-middle"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1.05, repeat: Infinity, times: [0, 0.45, 0.55, 1] }}
    />
  );
}

export function HomeHeroVisual({ className }: { className?: string }) {
  const t = useTranslations("hero.visual");
  const reduceMotion = useReducedMotion();

  const user = t("user");
  const host = t("host");
  const cwd = t("cwd");

  const commands = useMemo(
    () => [
      { cmd: t("commands.whoami"), output: t("commands.whoamiOut") },
      { cmd: t("commands.cat"), output: t("commands.catOut") },
    ],
    [t]
  );

  const fetchRows = useMemo(
    () =>
      [
        { label: t("fetch.os"), value: t("fetch.osValue") },
        { label: t("fetch.host"), value: t("fetch.hostValue") },
        { label: t("fetch.kernel"), value: t("fetch.kernelValue") },
        { label: t("fetch.uptime"), value: t("fetch.uptimeValue") },
        { label: t("fetch.packages"), value: t("fetch.packagesValue") },
        { label: t("fetch.status"), value: t("fetch.statusValue"), live: true },
      ] as const,
    [t]
  );

  const [completed, setCompleted] = useState(0);
  const [typed, setTyped] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setCompleted(commands.length);
      setTyped("");
      setShowOutput(false);
      setIdle(true);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    async function play() {
      setCompleted(0);
      setTyped("");
      setShowOutput(false);
      setIdle(false);

      try {
        await sleep(480, signal);

        for (let i = 0; i < commands.length; i++) {
          setTyped("");
          setShowOutput(false);

          const cmd = commands[i].cmd;
          for (let c = 1; c <= cmd.length; c++) {
            setTyped(cmd.slice(0, c));
            await sleep(TYPE_MS, signal);
          }

          await sleep(OUTPUT_PAUSE_MS, signal);
          setShowOutput(true);
          await sleep(BETWEEN_MS, signal);
          setCompleted(i + 1);
          setTyped("");
          setShowOutput(false);
        }

        setIdle(true);
      } catch {
        // aborted on unmount or locale change
      }
    }

    void play();
    return () => controller.abort();
  }, [commands, reduceMotion]);

  const activeIndex = completed < commands.length ? completed : -1;

  return (
    <motion.div
      className={cn("relative mx-auto w-full", className)}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -bottom-12 top-1/4 rounded-[50%] bg-glow/12 blur-3xl"
      />

      <div
        role="img"
        aria-label={t("ariaLabel")}
        className="relative overflow-hidden rounded-2xl border border-[#1a322c]/80 bg-[#07110e] shadow-[0_28px_90px_-32px_rgba(16,44,39,0.55)] sm:rounded-3xl"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 50%, #000 50%)",
            backgroundSize: "100% 3px",
          }}
        />

        <div className="relative flex h-11 items-center border-b border-white/6 bg-[#0b1714] px-3.5 sm:h-12 sm:px-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#e06c75]/90" />
            <span className="size-2.5 rounded-full bg-[#e5c07b]/90" />
            <span className="size-2.5 rounded-full bg-[#4fa894]/90" />
          </div>
          <p className="pointer-events-none absolute inset-x-16 truncate text-center font-mono text-[11px] text-[#8aa39c] sm:text-xs">
            {t("windowTitle")}
          </p>
        </div>

        <div className="relative grid gap-6 px-4 py-5 font-mono text-[12px] leading-relaxed sm:gap-7 sm:px-6 sm:py-6 sm:text-[13px] md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:items-start md:gap-10 md:px-8 md:py-7">
          <div className="min-w-0">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex size-[72px] shrink-0 flex-col items-center justify-center rounded-2xl border border-[#1e3d36] bg-[#0c1c18] sm:size-[84px]">
                <span className="font-display text-2xl font-bold tracking-tight text-[#d7ebe4] sm:text-[1.75rem]">
                  AF
                </span>
                <span className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-[#4fa894]">
                  {t("shell")}
                </span>
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[13px] font-medium text-[#eef5f2] sm:text-sm">
                  {t("fetch.title")}
                </p>
                <p className="mt-1 mb-3 h-px max-w-[12rem] bg-[#1e3d36]" />
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-[5px] text-[11px] sm:text-[12px]">
                  {fetchRows.map((row) => (
                    <div key={row.label} className="contents">
                      <dt className="text-[#4fa894]">{row.label}</dt>
                      <dd className="flex min-w-0 items-center gap-1.5 truncate text-[#c5d6d0]">
                        {"live" in row && row.live ? (
                          <span className="relative flex size-1.5 shrink-0">
                            {!reduceMotion ? (
                              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4fa894] opacity-60" />
                            ) : null}
                            <span className="relative inline-flex size-1.5 rounded-full bg-[#4fa894]" />
                          </span>
                        ) : null}
                        <span className="truncate">{row.value}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 flex items-center gap-2 text-[10px] text-[#8aa39c] sm:text-[11px]">
                  <span className="inline-flex items-center gap-1 text-[#4fa894]">
                    <span aria-hidden className="font-medium">
                      ⎇
                    </span>
                    {t("git.branch")}
                  </span>
                  <span className="text-[#1e3d36]">·</span>
                  <span>{t("git.status")}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0 border-t border-white/6 pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-10">
            <div className="min-h-[9.75rem] space-y-3 sm:min-h-[10.5rem]">
              {commands.slice(0, completed).map((item) => (
                <div key={item.cmd} className="space-y-1">
                  <p className="flex flex-wrap items-baseline gap-x-2 text-[#eef5f2]">
                    <Prompt user={user} host={host} cwd={cwd} />
                    <span>{item.cmd}</span>
                  </p>
                  <p className="pl-0 text-[#9bb0aa] md:pl-[2px]">{item.output}</p>
                </div>
              ))}

              {activeIndex >= 0 ? (
                <div className="space-y-1">
                  <p className="flex flex-wrap items-baseline gap-x-2 text-[#eef5f2]">
                    <Prompt user={user} host={host} cwd={cwd} />
                    <span>{typed}</span>
                    {!showOutput ? <Cursor /> : null}
                  </p>
                  {showOutput ? (
                    <p className="text-[#9bb0aa]">{commands[activeIndex].output}</p>
                  ) : null}
                </div>
              ) : null}

              {idle ? (
                <p className="flex flex-wrap items-baseline gap-x-2 text-[#eef5f2]">
                  <Prompt user={user} host={host} cwd={cwd} />
                  <Cursor />
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-between gap-3 border-t border-white/6 bg-[#0b1714] px-4 py-2 font-mono text-[10px] text-[#6d8f88] sm:px-6 sm:text-[11px]">
          <span>{t("shell")}</span>
          <span className="truncate">{t("path")}</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#4fa894]" />
            {t("connected")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
