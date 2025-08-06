import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from '../input/input';
import { Label } from './label';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Your label',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='email'>Email</Label>
      <Input id='email' placeholder='Email' type='email' />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='required'>
        Required field <span className='text-destructive'>*</span>
      </Label>
      <Input id='required' placeholder='This field is required' type='text' />
    </div>
  ),
};
