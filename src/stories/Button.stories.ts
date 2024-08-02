import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../main';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Button>;


export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  args: {
    size: "xl",
    variant: "primary",
    className: "relative",
    activeAsTab: false,
  }
}