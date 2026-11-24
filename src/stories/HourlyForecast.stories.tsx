import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { HourlyForecast } from "../index";

const code = `function Demo() {
  return (
    <HourlyForecast
      items={[
        { time: "Agora", condition: "clear", temp: 24 },
        { time: "19h", condition: "cloudy", temp: 22 },
        { time: "20h", condition: "rain", temp: 20, rain: 0.6, night: true },
        { time: "21h", condition: "storm", temp: 19, rain: 0.8, night: true },
        { time: "22h", condition: "drizzle", temp: 18, rain: 0.3, night: true },
        { time: "23h", condition: "fog", temp: 17, night: true },
        { time: "0h", condition: "clear", temp: 16, night: true },
      ]}
    />
  );
}

render(<Demo />);
`;

const meta: Meta<typeof HourlyForecast> = {
  title: "Widgets/HourlyForecast",
  component: HourlyForecast,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Linha de previsão por hora com ícones animados e chance de chuva a partir de 20%. Funciona dentro e fora de uma ilha.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof HourlyForecast> = { render: () => <LiveExample code={code} /> };
