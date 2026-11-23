import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import { useCanvasLoop } from "../../utils/useCanvasLoop";
import { Artwork } from "../Artwork";
import { Avatar } from "../Avatar";
import { HourlyForecast, type HourlyItem } from "../HourlyForecast";
import { Equalizer } from "../LiveBadge";
import { Sparkline } from "../Sparkline";
import { WeatherIcon } from "../WeatherIcon";
import type { WeatherCondition } from "../WeatherSky/sky";
import { clock, Island, IslandAction, type IslandTone } from "./Island";
import { IslandIcons as I, type Maneuver, TurnArrow } from "./icons";

/** Chama `tick` a cada segundo enquanto `running`. */
function useTicker(running: boolean, tick: () => void) {
  const fn = useRef(tick);
  fn.current = tick;
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => fn.current(), 1000);
    return () => clearInterval(id);
  }, [running]);
}

/* ---------- Timer ---------- */

export interface IslandTimerProps {
  /** Duração em segundos. */
  duration: number;
  label?: ReactNode;
  tone?: IslandTone;
  /** Começa rodando. */
  autoStart?: boolean;
  onDone?: () => void;
  onCancel?: () => void;
  className?: string;
}

/** Contagem regressiva com pausar e cancelar (timer de cozinha, pomodoro). */
export function IslandTimer({
  duration,
  label = "Timer",
  tone = "gold",
  autoStart = true,
  onDone,
  onCancel,
  className,
}: IslandTimerProps) {
  const [left, setLeft] = useState(duration);
  const [running, setRunning] = useState(autoStart);
  useEffect(() => setLeft(duration), [duration]);
  const done = useRef(onDone);
  done.current = onDone;
  useTicker(running && left > 0, () => setLeft((l) => Math.max(0, l - 1)));
  useEffect(() => {
    if (left > 0) return;
    setRunning(false);
    done.current?.();
  }, [left]);
  return (
    <Island
      tone={tone}
      className={className}
      leading={
        <div className="sn-island__actions">
          <IslandAction
            tone={tone}
            aria-label={running ? "Pausar" : "Continuar"}
            onClick={() => setRunning((r) => !r)}
            disabled={left === 0}
          >
            {running ? I.pause() : I.play()}
          </IslandAction>
          <IslandAction appearance="plain" aria-label="Cancelar timer" onClick={onCancel}>
            {I.close()}
          </IslandAction>
        </div>
      }
      trailing={
        <span className="sn-island__timer sn-island__tone">
          <span className="sn-island__timer-label">{label}</span>
          <span role="timer" aria-label={`${label}: ${clock(left)}`} className="sn-island__big">
            {clock(left)}
          </span>
        </span>
      }
    />
  );
}

/* ---------- Chamada ---------- */

export interface IslandCallProps {
  name: string;
  /** Linha pequena acima do nome (ex.: "celular", "FaceTime"). */
  subtitle?: ReactNode;
  avatar?: string;
  /** `incoming` = recusar/atender; `joined` = alguém entrou na chamada. */
  variant?: "incoming" | "joined";
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
}

/** Chamada recebida (recusar/atender) ou aviso de que alguém entrou na call. */
export function IslandCall({
  name,
  subtitle,
  avatar,
  variant = "incoming",
  onAccept,
  onDecline,
  className,
}: IslandCallProps) {
  const lead = <Avatar name={name} src={avatar} size={44} />;
  if (variant === "joined") {
    return (
      <Island
        live
        tone="success"
        className={className}
        leading={lead}
        title={
          <>
            {name} <span className="sn-island__dim">entrou</span>
          </>
        }
        trailing={
          <IslandAction tone="success" appearance="solid" aria-label={`Abrir vídeo de ${name}`} onClick={onAccept}>
            {I.video()}
          </IslandAction>
        }
      />
    );
  }
  return (
    <Island
      live
      tone="success"
      className={className}
      leading={lead}
      eyebrow={subtitle ?? "chamada"}
      title={name}
      trailing={
        <div className="sn-island__actions">
          <IslandAction tone="danger" appearance="solid" aria-label={`Recusar chamada de ${name}`} onClick={onDecline}>
            {I.hangup()}
          </IslandAction>
          <IslandAction tone="success" appearance="solid" pulse aria-label={`Atender ${name}`} onClick={onAccept}>
            {I.phone()}
          </IslandAction>
        </div>
      }
    />
  );
}

/* ---------- Mídia ---------- */

export interface IslandMediaProps {
  title: string;
  artist: string;
  /** Capa; sem ela, um gradiente derivado do título. */
  cover?: string;
  /** Duração em segundos. */
  duration: number;
  /** Posição inicial em segundos. */
  defaultPosition?: number;
  defaultPlaying?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onPlayingChange?: (playing: boolean) => void;
  /** Mostra o botão de transmitir. */
  onCast?: () => void;
  tone?: IslandTone;
  className?: string;
}

/** Player expandido: capa, equalizador, barra de progresso arrastável e controles. */
export function IslandMedia({
  title,
  artist,
  cover,
  duration,
  defaultPosition = 0,
  defaultPlaying = true,
  onPrev,
  onNext,
  onPlayingChange,
  onCast,
  tone = "accent",
  className,
}: IslandMediaProps) {
  const [pos, setPos] = useState(defaultPosition);
  const [playing, setPlaying] = useState(defaultPlaying);
  useTicker(playing, () => {
    setPos((p) => (p + 1 >= duration ? 0 : p + 1));
  });
  const toggle = () => {
    setPlaying(!playing);
    onPlayingChange?.(!playing);
  };
  return (
    <Island
      size="card"
      tone={tone}
      className={className}
      leading={
        <div className="sn-island__cover">
          <Artwork title={title} src={cover} ratio="square" />
        </div>
      }
      title={title}
      subtitle={artist}
      trailing={<Equalizer active={playing} color="var(--sn-island-tone)" />}
    >
      <div className="sn-island__scrub">
        <span className="sn-island__time">{clock(pos)}</span>
        <input
          type="range"
          className="sn-island__range"
          min={0}
          max={duration}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Posição da faixa"
          aria-valuetext={`${clock(pos)} de ${clock(duration)}`}
          style={{ "--sn-range": `${(pos / duration) * 100}%` } as CSSProperties}
        />
        <span className="sn-island__time">-{clock(duration - pos)}</span>
      </div>
      <div className="sn-island__controls">
        <IslandAction appearance="plain" className="sn-island-action--bare" aria-label="Anterior" onClick={onPrev}>
          {I.prev(26)}
        </IslandAction>
        <IslandAction
          appearance="plain"
          className="sn-island-action--bare"
          size={52}
          aria-label={playing ? "Pausar" : "Tocar"}
          onClick={toggle}
        >
          {playing ? I.pause(30) : I.play(30)}
        </IslandAction>
        <IslandAction appearance="plain" className="sn-island-action--bare" aria-label="Próxima" onClick={onNext}>
          {I.next(26)}
        </IslandAction>
        {onCast && (
          <IslandAction
            appearance="plain"
            className="sn-island-action--bare sn-island__cast"
            aria-label="Transmitir"
            onClick={onCast}
          >
            {I.cast()}
          </IslandAction>
        )}
      </div>
    </Island>
  );
}

/* ---------- Gravação ---------- */

export interface IslandRecordingProps {
  label?: ReactNode;
  /** `button` = tempo + botão de parar; `wave` = onda de áudio + tempo. */
  variant?: "button" | "wave";
  /** Nível de áudio 0–1, lido a cada quadro (microfone). Sem ele, uma onda simulada. */
  level?: () => number;
  /** Segundos já gravados ao montar. */
  startAt?: number;
  onStop?: () => void;
  tone?: IslandTone;
  className?: string;
}

function Wave({ level }: { level?: () => number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const bars = useRef<number[]>([]);
  useCanvasLoop(
    ref,
    () => ({
      setup: (w) => {
        bars.current = Array.from({ length: Math.floor(w / 4) }, (_, i) => 0.25 + 0.5 * Math.abs(Math.sin(i * 0.7)));
      },
      draw: ({ ctx, w, h, t, still }) => {
        const b = bars.current;
        if (!still && t % 3 === 0) {
          const v = level ? level() : 0.2 + Math.abs(Math.sin(t * 0.09) * Math.sin(t * 0.023)) * 0.8 * Math.random();
          b.shift();
          b.push(Math.max(0.08, Math.min(1, v)));
        }
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = getComputedStyle(ref.current as HTMLCanvasElement).color;
        b.forEach((v, i) => {
          const bh = Math.max(2, v * h);
          ctx.globalAlpha = 0.35 + 0.65 * (i / b.length);
          ctx.fillRect(i * 4, (h - bh) / 2, 2, bh);
        });
        ctx.globalAlpha = 1;
      },
    }),
    [level],
  );
  return (
    <span className="sn-island__wave-wrap" aria-hidden="true">
      <canvas ref={ref} className="sn-island__wave sn-island__tone" />
    </span>
  );
}

/** Gravação em andamento: tempo correndo e botão de parar, ou onda de áudio ao vivo. */
export function IslandRecording({
  label = "Gravando tela",
  variant = "button",
  level,
  startAt = 0,
  onStop,
  tone = "danger",
  className,
}: IslandRecordingProps) {
  const [sec, setSec] = useState(startAt);
  const [on, setOn] = useState(true);
  useTicker(on, () => {
    setSec((s) => s + 1);
  });
  const stop = () => {
    setOn(false);
    onStop?.();
  };
  const time = (
    <span role="timer" aria-label={`Gravando há ${clock(sec)}`} className="sn-island__value sn-island__tone">
      {clock(sec)}
    </span>
  );
  if (variant === "wave") {
    return (
      <Island
        tone={tone}
        className={className}
        title={on ? <Wave level={level} /> : <span className="sn-island__dim">Gravação salva</span>}
        trailing={time}
      />
    );
  }
  return (
    <Island
      tone={tone}
      className={className}
      eyebrow={
        <span className="sn-island__rec">
          <span className="sn-island__rec-dot" data-on={on || undefined} />
          {time}
        </span>
      }
      title={on ? label : "Gravação salva"}
      trailing={
        <IslandAction
          tone={tone}
          appearance="soft"
          className="sn-island-action--ring"
          aria-label="Parar gravação"
          onClick={stop}
          disabled={!on}
        >
          {I.stop()}
        </IslandAction>
      }
    />
  );
}

/* ---------- Navegação ---------- */

export interface IslandNavProps {
  maneuver: Maneuver;
  /** Distância até a manobra, ex.: "312 m". */
  distance: ReactNode;
  street: ReactNode;
  /** Hora de chegada, ex.: "12:08". */
  arrival: ReactNode;
  /** Ex.: "6 min". */
  remaining?: ReactNode;
  tone?: IslandTone;
  className?: string;
}

/** Navegação passo a passo: seta da manobra, distância, rua e chegada. */
export function IslandNav({
  maneuver,
  distance,
  street,
  arrival,
  remaining,
  tone = "success",
  className,
}: IslandNavProps) {
  return (
    <Island
      tone={tone}
      live
      className={cx("sn-island--nav", className)}
      leading={<TurnArrow maneuver={maneuver} />}
      title={<span className="sn-island__big sn-island__big--sm">{distance}</span>}
      subtitle={street}
      trailing={
        <span className="sn-island__eta">
          <span className="sn-island__big sn-island__big--sm sn-island__tone">{arrival}</span>
          <span className="sn-island__dim">chegada{remaining != null && <> · {remaining}</>}</span>
        </span>
      }
    />
  );
}

/* ---------- Cotação ---------- */

export interface IslandTickerProps {
  symbol: string;
  name: string;
  /** Preço já formatado. */
  price: ReactNode;
  /** Variação absoluta formatada, ex.: "+$641,40". */
  change?: ReactNode;
  /** Variação percentual (número): define verde/vermelho e a seta. */
  changePct: number;
  data: number[];
  /** Ex.: "há 2 min". */
  updated?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/** Cotação ao vivo (cripto, ação): preço, variação e minigráfico. */
export function IslandTicker({
  symbol,
  name,
  price,
  change,
  changePct,
  data,
  updated,
  icon,
  className,
}: IslandTickerProps) {
  const up = changePct >= 0;
  const pct = `${up ? "+" : "−"}${Math.abs(changePct).toFixed(2)}%`;
  return (
    <Island
      size="card"
      tone={up ? "success" : "danger"}
      className={className}
      leading={<span className="sn-island__badge">{icon ?? symbol.slice(0, 1)}</span>}
      eyebrow={symbol}
      title={name}
      trailing={
        updated != null && (
          <span className="sn-island__eta">
            <span className="sn-island__dim">atualizado</span>
            <span>{updated}</span>
          </span>
        )
      }
    >
      <div className="sn-island__price">
        <span className="sn-island__big">{price}</span>
        <span className="sn-island__delta sn-island__tone">
          {change != null && <span>{change}</span>}
          <span>
            {up ? "▲" : "▼"} {pct}
          </span>
        </span>
      </div>
      <Sparkline
        data={data}
        width={300}
        height={64}
        tone={up ? "success" : "danger"}
        label={`${name}: ${pct} no período`}
        className="sn-island__spark"
      />
    </Island>
  );
}

/* ---------- Clima ---------- */

export interface IslandWeatherProps {
  place: ReactNode;
  temp: number;
  condition: WeatherCondition;
  night?: boolean;
  summary?: ReactNode;
  high?: number;
  low?: number;
  hours?: HourlyItem[];
  className?: string;
}

/** Clima agora + próximas horas. */
export function IslandWeather({
  place,
  temp,
  condition,
  night,
  summary,
  high,
  low,
  hours,
  className,
}: IslandWeatherProps) {
  return (
    <Island
      size="card"
      tone="gold"
      className={className}
      eyebrow={place}
      title={<span className="sn-island__big">{temp}°</span>}
      trailing={
        <span className="sn-island__eta">
          <WeatherIcon condition={condition} night={night} size={40} />
          {summary != null && <span className="sn-island__dim">{summary}</span>}
          {high != null && low != null && (
            <span className="sn-island__dim">
              Máx {high}° · Mín {low}°
            </span>
          )}
        </span>
      }
    >
      {hours && <HourlyForecast items={hours} />}
    </Island>
  );
}

export type { Maneuver };
