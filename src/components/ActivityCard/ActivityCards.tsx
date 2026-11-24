import { type ReactNode, useEffect, useRef, useState } from "react";
import { formatElapsed } from "../../utils/format";
import type { Tone } from "../../utils/tone";
import { useCanvasLoop } from "../../utils/useCanvasLoop";
import { Artwork } from "../Artwork";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Equalizer } from "../LiveBadge";
import { Slider } from "../Slider";
import { ActivityCard, ActivityIcon } from "./ActivityCard";
import { ActivityIcons as I, type Maneuver, TurnArrow } from "./icons";

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

/* ---------- Chamada ---------- */

export interface CallCardProps {
  name: string;
  /** Origem da chamada (ex.: "Celular", "Vídeo"). */
  subtitle?: ReactNode;
  avatar?: string;
  /** `incoming` = recusar e atender; `joined` = alguém entrou na chamada. */
  variant?: "incoming" | "joined";
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
}

/** Chamada recebida (recusar e atender) ou aviso de que alguém entrou na call. */
export function CallCard({
  name,
  subtitle = "Chamada",
  avatar,
  variant = "incoming",
  onAccept,
  onDecline,
  className,
}: CallCardProps) {
  const joined = variant === "joined";
  return (
    <ActivityCard
      live
      tone="success"
      className={className}
      leading={<Avatar name={name} src={avatar} size={44} />}
      title={name}
      subtitle={joined ? "Entrou na chamada" : subtitle}
      trailing={
        joined ? (
          <Button size="icon" variant="secondary" aria-label={`Abrir vídeo de ${name}`} onClick={onAccept}>
            {I.video()}
          </Button>
        ) : (
          <div className="sn-activity__actions">
            <Button size="icon" variant="danger" aria-label={`Recusar chamada de ${name}`} onClick={onDecline}>
              {I.hangup()}
            </Button>
            <Button size="icon" aria-label={`Atender ${name}`} onClick={onAccept}>
              {I.phone()}
            </Button>
          </div>
        )
      }
    />
  );
}

/* ---------- Player ---------- */

export interface PlayerCardProps {
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
  tone?: Tone;
  className?: string;
}

/** O que está tocando: capa, equalizador, posição da faixa e controles. */
export function PlayerCard({
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
}: PlayerCardProps) {
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
    <ActivityCard
      size="expanded"
      tone={tone}
      className={className}
      leading={
        <div className="sn-activity__cover">
          <Artwork title={title} src={cover} ratio="square" />
        </div>
      }
      title={title}
      subtitle={artist}
      trailing={<Equalizer active={playing} color="var(--sn-activity-tone)" />}
    >
      <Slider
        label="Posição"
        value={pos}
        max={duration}
        onChange={setPos}
        format={(n) => `${formatElapsed(n)} de ${formatElapsed(duration)}`}
      />
      <div className="sn-activity__controls">
        <Button size="icon" variant="ghost" aria-label="Anterior" onClick={onPrev}>
          {I.prev()}
        </Button>
        <Button size="icon" variant="secondary" aria-label={playing ? "Pausar" : "Tocar"} onClick={toggle}>
          {playing ? I.pause() : I.play()}
        </Button>
        <Button size="icon" variant="ghost" aria-label="Próxima" onClick={onNext}>
          {I.next()}
        </Button>
        {onCast && (
          <Button size="icon" variant="ghost" className="sn-activity__cast" aria-label="Transmitir" onClick={onCast}>
            {I.cast()}
          </Button>
        )}
      </div>
    </ActivityCard>
  );
}

/* ---------- Timer ---------- */

export interface TimerCardProps {
  /** Com `duration` (segundos) conta para trás; sem ela, conta o tempo decorrido. */
  duration?: number;
  /** Segundos já decorridos ao montar (só no modo decorrido). */
  startAt?: number;
  label?: ReactNode;
  tone?: Tone;
  /** Começa rodando. */
  autoStart?: boolean;
  /** Onda de áudio ao vivo no lugar do rótulo (gravação de voz). `level` lê o nível 0–1 a cada quadro. */
  wave?: boolean | (() => number);
  onDone?: () => void;
  /** Mostra o botão de parar. */
  onStop?: () => void;
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
    <span className="sn-activity__wave-wrap" aria-hidden="true">
      <canvas ref={ref} className="sn-activity__wave" />
    </span>
  );
}

/** Timer de cozinha, pomodoro, cronômetro ou gravação: tempo grande, pausar e parar. */
export function TimerCard({
  duration,
  startAt = 0,
  label = duration != null ? "Timer" : "Gravando",
  tone = duration != null ? "gold" : "danger",
  autoStart = true,
  wave,
  onDone,
  onStop,
  className,
}: TimerCardProps) {
  const countdown = duration != null;
  const [sec, setSec] = useState(countdown ? duration : startAt);
  const [running, setRunning] = useState(autoStart);
  const [stopped, setStopped] = useState(false);
  useEffect(() => {
    if (duration != null) setSec(duration);
  }, [duration]);
  const done = useRef(onDone);
  done.current = onDone;
  const finished = countdown && sec === 0;
  useTicker(running && !finished && !stopped, () => setSec((s) => (countdown ? Math.max(0, s - 1) : s + 1)));
  useEffect(() => {
    if (!finished) return;
    setRunning(false);
    done.current?.();
  }, [finished]);
  const stop = () => {
    setStopped(true);
    setRunning(false);
    onStop?.();
  };
  const time = formatElapsed(sec);
  const level = typeof wave === "function" ? wave : undefined;
  return (
    <ActivityCard
      tone={tone}
      className={className}
      title={
        wave && !stopped ? (
          <Wave level={level} />
        ) : (
          <span className="sn-activity__label">{stopped ? "Parado" : label}</span>
        )
      }
      trailing={
        <div className="sn-activity__actions">
          <span
            role="timer"
            aria-label={`${typeof label === "string" ? label : "Timer"}: ${time}`}
            className="sn-activity__value"
          >
            {time}
          </span>
          <Button
            size="icon"
            variant="secondary"
            aria-label={running ? "Pausar" : "Continuar"}
            onClick={() => setRunning((r) => !r)}
            disabled={finished || stopped}
          >
            {running ? I.pause() : I.play()}
          </Button>
          {onStop && (
            <Button size="icon" variant="ghost" aria-label="Parar" onClick={stop} disabled={stopped}>
              {I.stop()}
            </Button>
          )}
        </div>
      }
    />
  );
}

/* ---------- Rota ---------- */

export interface DirectionsCardProps {
  maneuver: Maneuver;
  /** Distância até a manobra, ex.: "312 m". */
  distance: ReactNode;
  street: ReactNode;
  /** Hora de chegada, ex.: "12:08". */
  arrival: ReactNode;
  /** Ex.: "6 min". */
  remaining?: ReactNode;
  tone?: Tone;
  className?: string;
}

/** Navegação passo a passo: seta da manobra, distância, rua e chegada. */
export function DirectionsCard({
  maneuver,
  distance,
  street,
  arrival,
  remaining,
  tone = "aqua",
  className,
}: DirectionsCardProps) {
  return (
    <ActivityCard
      tone={tone}
      live
      className={className}
      leading={
        <ActivityIcon>
          <TurnArrow maneuver={maneuver} size={28} />
        </ActivityIcon>
      }
      title={<span className="sn-activity__value">{distance}</span>}
      subtitle={street}
      trailing={
        <span className="sn-activity__eta">
          <span className="sn-activity__value">{arrival}</span>
          <span className="sn-activity__dim">Chegada{remaining != null && <>, em {remaining}</>}</span>
        </span>
      }
    />
  );
}

export type { Maneuver };
