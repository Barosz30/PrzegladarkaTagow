import type { Meta, StoryObj } from '@storybook/react';
import SettingsSelectors from './SettingsSelectors';


const meta: Meta<typeof SettingsSelectors> = {
  component: SettingsSelectors,
};

export default meta;
type Story = StoryObj<typeof SettingsSelectors>;


export const Primary: Story = {
  render: () => <SettingsSelectors />,
};