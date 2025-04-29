// @ts-nocheck
import { defineStore } from 'pinia'
import themes from '~/theme/theme'

export const useTheme = defineStore('theme', {
  state: () => ({
    themeName: 'Yuuri Light',
    themeCode: 'cst1',
  }),
  actions: {
    changeTheme(theme) {
      localStorage.setItem('themeCode', theme)
      this.themeCode = theme
      this.loadTheme()
    },
    loadTheme(theme) {
      const existingLink = document.querySelector('#dynamic-theme');
      if (existingLink) {
        existingLink.remove();
      }

      const link = document.createElement('link');
      link.id = 'dynamic-theme';
      link.rel = 'stylesheet';
      link.href = `/themes/${localStorage.getItem('themeCode')}.css`;
      document.head.appendChild(link);
    },
  },
})