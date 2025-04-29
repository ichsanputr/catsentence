import { defineStore } from 'pinia'

export const useApp = defineStore('app', {
  state: () => ({
    activities: [],
    toast: {
      state: false,
      color: null,
      message: null,
    },
    themeName: 'Yuuri Light',
    themeCode: 'cst1',
    user: {
      name: null,
      email: null,
      pic_url: null,
      source: null,
    },
    menu: {
      kind: 1,
      length: 1,
    },
  }),
  actions: {
    async addActivity(kind, resource) {
      const { $axios} = useNuxtApp();

      try {
        await $axios.post('/activities', {
          kind,
          resource
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getProfile() {
      const { $axios} = useNuxtApp();

      try {
        const { data } = await $axios.get('/profile');

        this.user.name = data.data.name
        this.user.email = data.data.email
        this.user.pic_url = data.data.pic_url
        this.user.source = data.data.source
      } catch (error) {
        console.error(error);
      }
    },
    changeTheme(theme) {
      this.themeCode = theme
      this.loadTheme()
    },
    loadTheme() {
      const existingLink = document.querySelector('#dynamic-theme');
      if (existingLink) {
        existingLink.remove();
      }

      const link = document.createElement('link');
      link.id = 'dynamic-theme';
      link.rel = 'stylesheet';
      link.href = `/themes/${this.themeCode}.css`;
      document.head.appendChild(link);
    },
  },
})