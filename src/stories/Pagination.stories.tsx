import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Pagination } from "../index";

const code = `function Demo() {
  const [page, setPage] = useState(6);
  return <Pagination page={page} pages={24} onChange={setPage} />;
}

render(<Demo />);
`;

const meta: Meta<typeof Pagination> = {
  title: "Navegação/Pagination",
  component: Pagination,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Paginação com reticências (\`pageRange\`), setas e \`aria-current\`. Use \`siblings\` para mais páginas visíveis.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Pagination> = { render: () => <LiveExample code={code} /> };
