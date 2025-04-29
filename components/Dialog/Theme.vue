<template>
    <v-dialog v-model="dialog" width="auto" content-class="w-full elevation-0">
        <div class="rounded-[12px] w-[300px] sm:w-[600px] border-4 color-nextu border-next">
            <v-container class="bg-main rounded-lg">
                <div class="flex justify-between items-center border-b-2 border-next pb-2">
                    <div class="text-xl">Themes</div>
                    <v-btn icon size="small" color="transparent" elevation="0" @click="dialog = false">
                        <Icon width="18" icon="majesticons:close" />
                    </v-btn>
                </div>
                <div class="max-h-[300px] overflow-y-scroll flex flex-col gap-3 px-1 mt-4">
                    <div class="cursor-pointer flex justify-between" @click="$emit('changeTheme','Yuuri Light', 'cst1')">
                        <div>Yuuri Light</div>
                        <div class="flex gap-1 rounded-full pa-2 bg-[#f1e5da]">
                            <div class="bg-[#e0794e] w-4 h-4 rounded-full"/>
                            <div class="bg-[#688e8f] w-4 h-4 rounded-full"/>
                            <div class="bg-[#023e3b] w-4 h-4 rounded-full"/>
                        </div>
                    </div>
                    <div class="cursor-pointer flex justify-between" @click="$emit('changeTheme','Dark Or Not', 'cst2')">
                        <div>Dark Or Not</div>
                        <div class="flex gap-1 rounded-full pa-2 bg-[#323437]">
                            <div class="bg-[#e2b714] w-4 h-4 rounded-full"/>
                            <div class="bg-[#646669] w-4 h-4 rounded-full"/>
                            <div class="bg-[#d1d0c5] w-4 h-4 rounded-full"/>
                        </div>
                    </div>
                    <div class="cursor-pointer flex justify-between" @click="$emit('changeTheme','IDK Theme', 'cst3')">
                        <div>IDK Theme</div>
                        <div class="flex gap-1 rounded-full pa-2 bg-[#525252]">
                            <div class="bg-[#C5B4E3] w-4 h-4 rounded-full"/>
                            <div class="bg-[#939EAE] w-4 h-4 rounded-full"/>
                            <div class="bg-[#d1d0c5] w-4 h-4 rounded-full"/>
                        </div>
                    </div>
                    <div class="cursor-pointer flex justify-between" @click="$emit('changeTheme','Nord White', 'cst4')">
                        <div>Nord White</div>
                        <div class="flex gap-1 rounded-full pa-2 bg-[#ECEFF4]">
                            <div class="bg-[#8FBCBB] w-4 h-4 rounded-full"/>
                            <div class="bg-[#76829A] w-4 h-4 rounded-full"/>
                            <div class="bg-[#6A7791] w-4 h-4 rounded-full"/>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>
    </v-dialog>
</template>
<script setup>
import { useVModel } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['changeTheme'])

const dialog = useVModel(props, 'modelValue');
</script>