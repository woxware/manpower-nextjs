import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BrandLockup, BrandLockupLink } from "./brand-lockup";

const meta: Meta<typeof BrandLockup> = {
  title: "Shared/BrandLockup",
  component: BrandLockup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'ManpowerHub lockup: the emerald cube mark (`public/images/branding/icon.png`) beside the "ManpowerHub" text wordmark — set in the display face and coloured by `var(--fg)`, so one node serves light and dark with no image asset per theme. `forceDarkWordmark` switches the type to white for always-dark containers.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BrandLockup>;

export const Default: Story = {};

export const ForceDarkWordmark: Story = {
  args: { forceDarkWordmark: true },
  decorators: [
    (Story) => (
      <div style={{ background: "#0b1020", padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

export const AsLink: Story = {
  render: () => <BrandLockupLink href="#" />,
};
