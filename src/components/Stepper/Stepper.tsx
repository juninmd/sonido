import { cx } from "../../utils/cx";
import "./Stepper.css";

export interface Step {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  /** Índice do passo atual (0…n). `n` = todos concluídos. */
  current: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/** Passos de um fluxo (onboarding, checkout). Concluído, atual e pendente. */
export function Stepper({ steps, current, orientation = "horizontal", className }: StepperProps) {
  return (
    <ol className={cx("sn-stepper", `sn-stepper--${orientation}`, className)}>
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo";
        return (
          <li
            key={s.label}
            className="sn-stepper__step"
            data-state={state}
            aria-current={state === "current" ? "step" : undefined}
          >
            <span className="sn-stepper__dot" aria-hidden>
              {state === "done" ? (
                <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
                  <path
                    d="m3.5 8.5 3 3 6-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span className="sn-stepper__text">
              <span className="sn-stepper__label">{s.label}</span>
              {s.description && <span className="sn-stepper__desc">{s.description}</span>}
              <span className="sn-visually-hidden">
                {state === "done" ? " (concluído)" : state === "current" ? " (atual)" : ""}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
