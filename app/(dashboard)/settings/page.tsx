import {
  Bell,
  Globe,
  Key,
  Monitor,
  Moon,
  Palette,
  Save,
  Sun,
  User,
  Video,
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings - Veo 3',
  description: 'Manage your account settings and preferences',
};

// Mock user data
const userProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: '/api/placeholder/64/64',
  role: 'Content Creator',
  joined: 'January 2024',
};

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: User,
    description: 'Manage your personal information and account details',
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: Palette,
    description: 'Customize the look and feel of your dashboard',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    description: 'Control how and when you receive notifications',
  },
  {
    id: 'video',
    title: 'Video Preferences',
    icon: Video,
    description: 'Set default video quality and generation settings',
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: Key,
    description: 'Manage your privacy settings and security preferences',
  },
];

export default function SettingsPage() {
  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
        <p className='text-muted-foreground'>
          Manage your account settings and preferences.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Settings Navigation */}
        <div className='lg:col-span-1 space-y-4'>
          <div className='rounded-lg border bg-card text-card-foreground p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center'>
                <User className='h-6 w-6 text-muted-foreground' />
              </div>
              <div>
                <h3 className='font-semibold'>{userProfile.name}</h3>
                <p className='text-sm text-muted-foreground'>
                  {userProfile.role}
                </p>
              </div>
            </div>
            <div className='space-y-2 text-sm text-muted-foreground'>
              <p>Member since {userProfile.joined}</p>
              <p>{userProfile.email}</p>
            </div>
          </div>

          <nav className='space-y-1'>
            {settingsSections.map(section => (
              <button
                className='w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-accent transition-colors'
                key={section.id}
              >
                <section.icon className='h-5 w-5' />
                <div>
                  <p className='font-medium'>{section.title}</p>
                  <p className='text-sm text-muted-foreground hidden sm:block'>
                    {section.description}
                  </p>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Profile Settings */}
          <div className='rounded-lg border bg-card text-card-foreground p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <User className='h-5 w-5' />
              <h3 className='text-lg font-semibold'>Profile Settings</h3>
            </div>
            <div className='space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium' htmlFor='fullName'>
                    Full Name
                  </label>
                  <input
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    id='fullName'
                    placeholder='Enter your full name'
                    value={userProfile.name}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium' htmlFor='email'>
                    Email Address
                  </label>
                  <input
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    id='email'
                    placeholder='Enter your email'
                    value={userProfile.email}
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium' htmlFor='bio'>
                  Bio
                </label>
                <textarea
                  className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  defaultValue='Passionate content creator focused on AI-powered video generation and storytelling.'
                  id='bio'
                  placeholder='Tell us about yourself...'
                />
              </div>
              <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
                <Save className='h-4 w-4 mr-2' />
                Save Changes
              </button>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className='rounded-lg border bg-card text-card-foreground p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <Palette className='h-5 w-5' />
              <h3 className='text-lg font-semibold'>Appearance</h3>
            </div>
            <div className='space-y-6'>
              <div className='space-y-3'>
                <fieldset>
                  <legend className='text-sm font-medium'>Theme</legend>
                  <div className='grid grid-cols-3 gap-4'>
                    <label className='flex items-center space-x-2 cursor-pointer'>
                      <input
                        defaultChecked
                        name='theme'
                        type='radio'
                        value='light'
                      />
                      <Sun className='h-4 w-4' />
                      <span>Light</span>
                    </label>
                    <label className='flex items-center space-x-2 cursor-pointer'>
                      <input name='theme' type='radio' value='dark' />
                      <Moon className='h-4 w-4' />
                      <span>Dark</span>
                    </label>
                    <label className='flex items-center space-x-2 cursor-pointer'>
                      <input name='theme' type='radio' value='system' />
                      <Monitor className='h-4 w-4' />
                      <span>System</span>
                    </label>
                  </div>
                </fieldset>
              </div>
              <div className='space-y-3'>
                <label className='text-sm font-medium' htmlFor='language'>
                  Language
                </label>
                <select
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  id='language'
                >
                  <option value='en'>English</option>
                  <option value='es'>Español</option>
                  <option value='fr'>Français</option>
                  <option value='de'>Deutsch</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className='rounded-lg border bg-card text-card-foreground p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <Bell className='h-5 w-5' />
              <h3 className='text-lg font-semibold'>Notifications</h3>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Video Processing Complete</p>
                  <p className='text-sm text-muted-foreground'>
                    Get notified when your videos are ready
                  </p>
                </div>
                <label
                  aria-label='Toggle video completion notifications'
                  className='relative inline-flex items-center cursor-pointer'
                  htmlFor='videoComplete'
                >
                  <input
                    className='sr-only peer'
                    defaultChecked
                    id='videoComplete'
                    type='checkbox'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Weekly Reports</p>
                  <p className='text-sm text-muted-foreground'>
                    Receive weekly analytics summaries
                  </p>
                </div>
                <label
                  aria-label='Toggle weekly reports'
                  className='relative inline-flex items-center cursor-pointer'
                  htmlFor='weeklyReports'
                >
                  <input
                    className='sr-only peer'
                    id='weeklyReports'
                    type='checkbox'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Marketing Emails</p>
                  <p className='text-sm text-muted-foreground'>
                    Product updates and special offers
                  </p>
                </div>
                <label
                  aria-label='Toggle marketing emails'
                  className='relative inline-flex items-center cursor-pointer'
                  htmlFor='marketing'
                >
                  <input
                    className='sr-only peer'
                    defaultChecked
                    id='marketing'
                    type='checkbox'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Video Preferences */}
          <div className='rounded-lg border bg-card text-card-foreground p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <Video className='h-5 w-5' />
              <h3 className='text-lg font-semibold'>Video Preferences</h3>
            </div>
            <div className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium' htmlFor='quality'>
                    Default Quality
                  </label>
                  <select
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    defaultValue='1080p'
                    id='quality'
                  >
                    <option value='720p'>HD (720p)</option>
                    <option value='1080p'>Full HD (1080p)</option>
                    <option value='4k'>4K Ultra HD</option>
                  </select>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium' htmlFor='format'>
                    Default Format
                  </label>
                  <select
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    defaultValue='mp4'
                    id='format'
                  >
                    <option value='mp4'>MP4</option>
                    <option value='mov'>MOV</option>
                    <option value='avi'>AVI</option>
                  </select>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Auto-save to Library</p>
                  <p className='text-sm text-muted-foreground'>
                    Automatically save generated videos to your library
                  </p>
                </div>
                <label
                  aria-label='Toggle auto-save to library'
                  className='relative inline-flex items-center cursor-pointer'
                  htmlFor='autosave'
                >
                  <input
                    className='sr-only peer'
                    defaultChecked
                    id='autosave'
                    type='checkbox'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className='rounded-lg border bg-card text-card-foreground p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <Key className='h-5 w-5' />
              <h3 className='text-lg font-semibold'>Privacy & Security</h3>
            </div>
            <div className='space-y-4'>
              <button className='w-full flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors'>
                <div className='text-left'>
                  <p className='font-medium'>Change Password</p>
                  <p className='text-sm text-muted-foreground'>
                    Update your account password
                  </p>
                </div>
                <Key className='h-4 w-4' />
              </button>
              <button className='w-full flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors'>
                <div className='text-left'>
                  <p className='font-medium'>Two-Factor Authentication</p>
                  <p className='text-sm text-muted-foreground'>
                    Add an extra layer of security
                  </p>
                </div>
                <div className='text-sm px-2 py-1 bg-green-100 text-green-700 rounded'>
                  Enabled
                </div>
              </button>
              <button className='w-full flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors'>
                <div className='text-left'>
                  <p className='font-medium'>Download My Data</p>
                  <p className='text-sm text-muted-foreground'>
                    Get a copy of your account data
                  </p>
                </div>
                <Globe className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
