import { useState } from "react";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from '@mantine/notifications';

import { getCookie, setCookie } from 'cookies-next'
import { THEME_COOKIE } from './configs/appsettings';
import { ModalsProvider } from "@mantine/modals";

export const theme = {
  colorScheme: "dark",
};


export function ThemeProvider({ children }) {

  const colorscheme = getCookie(THEME_COOKIE);

  const [colorScheme, setColorScheme] = useState(colorscheme);

  const toggleColorScheme = (value) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie(THEME_COOKIE, nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: colorScheme, fontFamily: 'NeueMontrealBook,Arial,sans-serif' }}>
        <ModalsProvider>
          <NotificationsProvider>
            {children}
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
