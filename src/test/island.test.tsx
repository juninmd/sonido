import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { clock, formatElapsed, IslandTicker, islandTone, toneVar } from "../index";

describe("Island alinhada ao Sonido", () => {
  it("islandTone usa o vocabulário comum de tons", () => {
    expect(islandTone("aqua")).toEqual({ "--sn-island-tone": toneVar("aqua") });
    expect(toneVar("violet")).toBe("var(--sn-color-accent-2)");
  });

  it("clock continua funcionando como alias de formatElapsed", () => {
    expect(clock(75.6)).toBe(formatElapsed(76));
    expect(clock(3725)).toBe("1:02:05");
  });

  it("IslandTicker sem ícone usa o Avatar da biblioteca", () => {
    render(<IslandTicker symbol="BTC" name="Bitcoin" price="$1" changePct={1} data={[1, 2, 3]} />);
    expect(screen.getByRole("img", { name: "Bitcoin" })).toBeInTheDocument();
  });
});
