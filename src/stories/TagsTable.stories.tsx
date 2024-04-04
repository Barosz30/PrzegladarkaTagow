import type { Meta, StoryObj } from '@storybook/react';
import TagsTable from './TagsTable';


const meta: Meta<typeof TagsTable> = {
  component: TagsTable,
};

export default meta;
type Story = StoryObj<typeof TagsTable>;


export const Primary: Story = {
  render: () => <TagsTable />,
};