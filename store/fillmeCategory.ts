// @ts-nocheck
import { defineStore } from 'pinia'
import { useFillme } from '~/store/fillme';

export const useFillmeCategory = defineStore('fillmeCategory', {
  state: () => ({
    home: {
      kind: 1,
      length: 1
    },
    search: {
      kind: 1,
      length: 1
    },
  }),
  actions: {
    async changeMenu(kind, key, val) {
      const typeStore = useFillme()

      if (kind == 'home') {
        this.home[key] = val
      } else {
        this.search[key] = val
      }

      await typeStore.loadTest()
    },
  },
})