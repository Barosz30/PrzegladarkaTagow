import type { Meta, StoryObj } from '@storybook/react';
import CustomTableRow from './CustomTableRow';


const meta: Meta<typeof CustomTableRow> = {
  component: CustomTableRow,
};

export default meta;
type Story = StoryObj<typeof CustomTableRow>;

const tag = {
  name: "Jonasz",
  count: 10000
}

export const Primary: Story = {
  render: () => <CustomTableRow tag={tag} />,
};