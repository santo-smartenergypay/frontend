// SPDX-License-Identifier: LicenseRef-Blockscout

import { COLOR_THEMES, type ColorTheme } from 'src/shell/top-bar/settings/color-theme/config';

import { getExternalAssetFilePath, getEnvValue, parseEnvJson } from 'src/config/utils/envs';

const defaultColorTheme = COLOR_THEMES.find((theme) => theme.id === 'light') as ColorTheme;

const config = Object.freeze({
  chainMenu: {
    items: getExternalAssetFilePath('NEXT_PUBLIC_FEATURED_NETWORKS'),
    allLink: getEnvValue('NEXT_PUBLIC_FEATURED_NETWORKS_ALL_LINK'),
    mode: (getEnvValue('NEXT_PUBLIC_FEATURED_NETWORKS_MODE') || 'list') as 'tabs' | 'list',
  },
  colorTheme: {
    'default': defaultColorTheme,
    overrides: parseEnvJson<Record<string, unknown>>(getEnvValue('NEXT_PUBLIC_COLOR_THEME_OVERRIDES')) || {},
  },
});

export default config;
