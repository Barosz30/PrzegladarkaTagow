import type { Meta, StoryObj } from '@storybook/react';
import SettingsSelectors from './SettingsSelectors';


const meta: Meta<typeof SettingsSelectors> = {
  component: SettingsSelectors,
};

export default meta;
type Story = StoryObj<typeof SettingsSelectors>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <SettingsSelectors />,
};