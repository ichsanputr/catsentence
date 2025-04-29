<script setup>
import { useApp } from '~/store/app';

onMounted(async () => {
    if (!useApp().user.name) {
        await useApp().getProfile()
    }
})
</script>
<template>
    <transition name="fade" mode="out-in">
        <v-app>
            <!-- Main Page -->
            <v-main class="flex justify-center">
                <v-snackbar v-model="useApp().toast.state" :color="useApp().toast.color" timeout="5000" >
                    <div class="flex items-center">
                        <Icon width="20" icon="tabler:circle-check" />
                        <div class="ml-1">{{ useApp().toast.message }}</div>
                    </div>
                </v-snackbar>
                <div class="w-[600px] max-w-[600px] sm:px-0 min-h-screen flex flex-col">
                    <LandingHeader class="px-3" />
                    <transition name="fade" mode="in-out" class="px-3 flex-1">
                        <slot />
                    </transition>
                    <LandingFooter class="px-3" />
                </div>
            </v-main>
        </v-app>
    </transition>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: transform 0.4s ease, opacity 0.5s ease, ;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(3px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-3px);
}

.lm {
}
</style>