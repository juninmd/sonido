import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { IslandWeather } from "../index";

const code = `function Demo() {
  return (
    <div style={{ maxWidth: 420 }}>
      <IslandWeather
        place="Franca, SP"
        temp={31}
        condition="cloudy"
        summary="Parcialmente nublado"
        high={33}
        low={22}
        hours={[
          { time: "Agora", condition: "clear", temp: 31 },
          { time: "13h", condition: "cloudy", temp: 32 },
          { time: "14h", condition: "cloudy", temp: 33 },
          { time: "15h", condition: "drizzle", temp: 32, rain: 0.3 },
          { time: "16h", condition: "storm", temp: 29, rain: 0.7 },
        ]}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof IslandWeather> = {
  title: "Ilhas/IslandWeather",
  component: IslandWeather,
  parameters: {
    sonido: { code },
    docs: { description: { component: `Clima agora e próximas horas, com os ícones animados do canto-widget.` } },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof IslandWeather> = { render: () => <LiveExample code={code} /> };
