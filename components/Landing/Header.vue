<script setup>
import { computed } from 'vue';
import { useRoute } from '#vue-router';
import { useApp } from '~/store/app';

const route = useRoute();
const showMenu = ref(false);

const kind = computed(() => {
    if (route.path == '/login' || route.path == '/register') {
        return 'Auth'
    }

    return ''
});

const logout = () => {
    localStorage.removeItem('jwt_token')

    useApp().toast.message = "Successfully logout..."
    useApp().toast.color = "success"
    useApp().toast.state = true

    setTimeout(() => {
        window.location.reload()
    }, 2500)
};
</script>
<template>
    <header class="sticky top-0 z-50 bg-white/30 backdrop-blur-sm">
        <div class="container mx-auto flex items-center justify-between py-2 sm:py-4">
            <div class="cursor-pointer flex color-second items-center" @click="navigateTo('/')">
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" width="32" height="32" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" fill="#00AA45"
                        d="M11.75 6.406c-1.48 0-1.628.157-2.394.157C8.718 6.563 6.802 5 5.845 5S3.77 5.563 3.77 7.188v1.875c.002.492.18 2 .88 1.597c-.827.978-.91 2.119-.899 3.223c-.223.064-.45.137-.671.212c-.684.234-1.41.532-1.737.744a.75.75 0 0 0 .814 1.26c.156-.101.721-.35 1.408-.585l.228-.075c.046.433.161.83.332 1.19l-.024.013c-.41.216-.79.465-1.032.623l-.113.074a.75.75 0 1 0 .814 1.26l.131-.086c.245-.16.559-.365.901-.545q.12-.064.231-.116C6.763 19.475 9.87 20 11.75 20s4.987-.525 6.717-2.148q.11.052.231.116c.342.18.656.385.901.545l.131.086a.75.75 0 0 0 .814-1.26l-.113-.074a13 13 0 0 0-1.032-.623l-.024-.013c.171-.36.286-.757.332-1.19l.228.075c.687.235 1.252.484 1.409.585a.75.75 0 0 0 .813-1.26c-.327-.212-1.053-.51-1.736-.744a16 16 0 0 0-.672-.213c.012-1.104-.072-2.244-.9-3.222c.7.403.88-1.105.881-1.598V7.188C19.73 5.563 18.613 5 17.655 5c-.957 0-2.873 1.563-3.51 1.563c-.767 0-.915-.157-2.395-.157m-.675 9.194c.202-.069.441-.1.675-.1s.473.031.676.1c.1.034.22.088.328.174a.62.62 0 0 1 .246.476c0 .23-.139.39-.246.476s-.229.14-.328.174c-.203.069-.442.1-.676.1s-.473-.031-.675-.1a1.1 1.1 0 0 1-.329-.174a.62.62 0 0 1-.246-.476c0-.23.139-.39.246-.476s.23-.14.329-.174m2.845-3.1c.137-.228.406-.5.81-.5s.674.272.81.5c.142.239.21.527.21.813s-.068.573-.21.811c-.136.229-.406.501-.81.501s-.673-.272-.81-.5a1.6 1.6 0 0 1-.21-.812c0-.286.068-.574.21-.812m-5.96 0c.137-.228.406-.5.81-.5s.674.272.81.5c.142.239.21.527.21.813s-.068.573-.21.811c-.136.229-.406.501-.81.501s-.673-.272-.81-.5a1.6 1.6 0 0 1-.21-.812c0-.286.068-.574.21-.812"
                        clip-rule="evenodd" />
                </svg>
                <div class="ml-2">
                    <div class="text-xl sm:text-2xl font-medium text-[#212121]">Catsentence {{ kind }}</div>
                </div>
            </div>
            <div v-if="route.path == '/'" class="hidden sm:flex gap-2">
                <button v-ripple class="rounded-xl px-4 text-sm py-1 font-semibold"
                    style="border: 1px solid rgb(30, 135, 75);" @click="navigateTo('/login')">
                    Log In
                </button>
                <button v-ripple style="border: 1px solid rgb(30, 135, 75);"
                    class="bg-[#00AA45] text-white px-3 font-semibold py-2 rounded-xl text-sm shadow-sm"
                    @click="navigateTo('/register')">
                    Create Account
                </button>
            </div>
            <div v-if="showMenu" class="pb-3 shadow-md flex flex-col bg-[#1DB45A] text-white left-0 pa-4 font-medium backdrop-blur-sm gap-2 top-16 w-full absolute">
                <div class="flex justify-between cursor-pointer" @click="navigateTo('/login')">
                    <div>Login</div>
                    <Icon width="24" icon="si:arrow-right-duotone" />
                </div>
                <div class="flex justify-between cursor-pointer" @click="navigateTo('/register')">
                    <div>Register</div>
                    <Icon width="24" color="white" icon="si:arrow-right-duotone" />
                </div>
            </div>
            <div v-if="route.path == '/profile' && useApp().user.email" class="flex items-center gap-1">
                <div @click="navigateTo('/profile/update')" class="flex text-[#0D0D0D] rounded-[12px] shadow-sm py-1 px-2 justify-between cursor-pointer hhg">
                    <Icon width="18" icon="iconamoon:edit-fill" />
                    <div class="text-sm ml-1 font-medium"><span v-if="$vuetify.display.smAndUp">Update</span> Profile</div>
                </div>
                <v-btn icon flat size="small" @click="logout()">
                    <Icon width="20" icon="material-symbols:logout" />
                </v-btn>
            </div>
            <div v-else class="flex sm:hidden relative">
                <v-btn icon flat color="transparent" @click="showMenu = !showMenu">
                    <Icon width="24" icon="solar:hamburger-menu-broken" />
                </v-btn>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            showMenu: false
        }
    },
}
</script>
<style scoped>
.hhg {
    border: 1px solid rgb(226, 232, 240);
}
</style>