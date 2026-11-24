import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ActivityCard, CallCard, DirectionsCard, TimerCard, toneVar } from "../index";

describe("Cards de atividade", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("ActivityCard usa o vocabulário comum de tons", () => {
    const { container } = render(<ActivityCard tone="aqua" title="Entrega" />);
    const el = container.querySelector(".sn-activity") as HTMLElement;
    expect(el.style.getPropertyValue("--sn-activity-tone")).toBe(toneVar("aqua"));
  });

  it("CallCard usa os botões do Sonido para recusar e atender", () => {
    const accept = vi.fn();
    const decline = vi.fn();
    render(<CallCard name="Ana Lima" onAccept={accept} onDecline={decline} />);
    fireEvent.click(screen.getByRole("button", { name: "Atender Ana Lima" }));
    fireEvent.click(screen.getByRole("button", { name: "Recusar chamada de Ana Lima" }));
    expect(accept).toHaveBeenCalledOnce();
    expect(decline).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Atender Ana Lima" })).toHaveClass("sn-button");
  });

  it("TimerCard conta para trás com duration e chama onDone", () => {
    const done = vi.fn();
    render(<TimerCard duration={2} onDone={done} />);
    expect(screen.getByRole("timer")).toHaveTextContent("0:02");
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole("timer")).toHaveTextContent("0:00");
    expect(done).toHaveBeenCalledOnce();
  });

  it("TimerCard sem duration conta o tempo decorrido e para", () => {
    const stop = vi.fn();
    render(<TimerCard label="Gravando tela" startAt={51} onStop={stop} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByRole("timer")).toHaveTextContent("0:54");
    fireEvent.click(screen.getByRole("button", { name: "Parar" }));
    expect(stop).toHaveBeenCalledOnce();
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByRole("timer")).toHaveTextContent("0:54");
  });

  it("DirectionsCard anuncia a manobra", () => {
    render(<DirectionsCard maneuver="right" distance="312 m" street="Rua Monsenhor Rosa" arrival="12:08" />);
    expect(screen.getByRole("status")).toHaveTextContent("312 m");
  });
});
