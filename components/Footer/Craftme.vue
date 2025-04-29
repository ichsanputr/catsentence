<template>
    <DialogTheme v-model="dialogTheme" @change-theme="changeTheme"/>
    <div class="color-nextu">
        <div v-if="$route.path.includes(excludePath)" class="hidden sm:block">
            <div class="text-sm flex justify-center">
                <div class="flex items-center gap-3">
                    <div class="bg-next rounded-md px-3 py-1 color-white">tab</div>
                    <div>-</div>
                    <div class="text-md">new question</div>
                </div>
            </div>
            <div class="text-sm mt-3 flex justify-center">
                <div class="flex items-center gap-3">
                    <div class="bg-next rounded-md px-3 py-1 color-white">ctrl</div>
                    <div>+</div>
                <div class="bg-next rounded-md px-3 py-1 color-white">o</div>
                    <div>-</div>
                    <div class="text-md">search question</div>
                </div>
            </div>
        </div>
        <div class="flex mt-6 justify-between text-xs sm:text-sm">
            <div class="flex items-center cursor-pointer" @click="$router.push('/craftme/submit')">
                <div class="underline">Submit your question</div>
            </div>
            <div class="flex items-center cursor-pointer" @click="dialogTheme = true">
                <svg class="mr-1 fill-current" style="width: 20px;" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                        d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm5.5 11c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3-4c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zM5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S7.33 13 6.5 13 5 12.33 5 11.5zm6-4c0 .83-.67 1.5-1.5 1.5S8 8.33 8 7.5 8.67 6 9.5 6s1.5.67 1.5 1.5z"/>
                </svg>
                <div>{{ themeStore.themeName }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { useTheme } from '~/store/theme';

export default {
    name: "FooterMain",
    data() {
        return {
            themeStore: useTheme(),
            show: false,
            dialogTheme: false,
            excludePath: ['/leaderboard', '/fillme/room']
        }
    },
    methods: {
        changeTheme(name, code) {
            this.themeStore.themeName = name
            this.themeStore.changeTheme(code)
        }
    }
}
</script>