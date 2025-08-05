import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Header } from './header'

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithTitle: Story = {
  args: {
    title: 'My App',
  },
}

export const WithNavigation: Story = {
  args: {
    title: 'Veo Clone',
    navigation: [
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
}

export const WithLongNavigation: Story = {
  args: {
    title: 'Veo Clone',
    navigation: [
      { href: '/products', label: 'Products' },
      { href: '/solutions', label: 'Solutions' },
      { href: '/resources', label: 'Resources' },
      { href: '/company', label: 'Company' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/support', label: 'Support' },
    ],
  },
}