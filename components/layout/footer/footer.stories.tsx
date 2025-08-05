import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Footer } from './footer';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLinks: Story = {
  args: {
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/support', label: 'Support' },
    ],
  },
};

export const WithCustomCopyright: Story = {
  args: {
    copyright: '© 2024 My Company. Made with ❤️',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
};

export const WithManyLinks: Story = {
  args: {
    links: [
      { href: '/about', label: 'About' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/support', label: 'Support' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};
