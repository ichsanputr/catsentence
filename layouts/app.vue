<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useApp } from '~/store/app';

const theme = ref("cst1");
const isThemeLoaded = ref(false);

onMounted(async () => {
  theme.value = localStorage.getItem("themeCode") || "cst1";

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `/themes/${theme.value}.css`;

  link.onload = async () => {
    await nextTick();
    isThemeLoaded.value = true;
  };

  document.head.appendChild(link);
});
</script>

<template>
  <transition name="fade" mode="out-in">
    <div v-if="isThemeLoaded">
      <v-app>
        <v-main class="h-full bg-main w-full flex justify-center">
          <div class="max-w-[900px] w-[900px] pa-4 flex flex-col justify-between">
            <HeaderFillme />
            <transition name="fade" mode="out-in">
              <slot />
            </transition>
            <FooterFillme />
          </div>
        </v-main>
      </v-app>
    </div>
  </transition>
</template>
<script>
import { useApp } from '~/store/app';

export default {
  async mounted() {
    if (!useApp().user.name) {
      await useApp().getProfile()
    }
  },
}
</script>
<style>
/* Fade transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>