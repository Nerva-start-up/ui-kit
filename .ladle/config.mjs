/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/**/*.stories.{tsx,ts}',
  port: 61000,
  addons: {
    control: { enabled: true },
    a11y: { enabled: false },
    ladle: { enabled: true },
    rtl: { enabled: false },
    source: { enabled: true, defaultState: false },
  },
};
