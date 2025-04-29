<script setup>
import { useApp } from '~/store/app';
</script>
<template>
    <div class="py-4 mt-6">
        <div class="grid mb-6 gap-4 grid-cols-1 sm:grid-cols-3">
            <div class="text-[#CBD5E1] text-3xl">
                CatSentence
            </div>
            <div class="rounded-lg w-full max-w-md">
                <h2 class="text-base font-semibold mb-2">Resources</h2>
                <ul class="text-sm text-gray-600">
                    <li><a @click="navigateTo('/remove-ads')" class="block pb-1">Remove Ads</a></li>
                    <li><a @click="navigateTo('/login')" class="block pb-1">Login</a></li>
                    <li><a @click="navigateTo('/register')" class="block pb-1">Register</a></li>
                    <li><a @click="navigateTo('/profile')" class="block pb-1">Profile</a></li>
                </ul>
            </div>
            <div class="rounded-lg w-full max-w-md">
                <h2 class="text-base font-semibold mb-2">Platform</h2>
                <ul class="text-sm text-gray-600">
                    <li><a class="block cursor-pointer pb-1" @click="navigateTo('/fillme')">Fillme</a></li>
                    <li><a class="block cursor-pointer pb-1" @click="navigateTo('/hearme')">Hearme</a></li>
                    <li><a class="block cursor-pointer pb-1" @click="navigateTo('/craftme')">Craftme</a></li>
                </ul>
            </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between pt-3" style="border-top: 1px solid #CBD5E1;">
            <div class="flex text-sm gap-2">
                <div>© 2025</div>
                <div>CatSentence</div>
            </div>
            <div class="flex flex-wrap text-sm text-gray-600 gap-2">
                <div class="underline cursor-pointer" @click="navigateTo('/privacy-policy')">Privacy Policy</div>
                <div class="underline cursor-pointer" @click="navigateTo('/disclaimer')">Disclaimer</div>
                <div class="underline cursor-pointer" @click="navigateTo('/code-of-conduct')">Code of Conduct</div>
                <div class="underline cursor-pointer" @click="navigateTo('/terms')">Terms</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
a {
    cursor: pointer;
}
</style>