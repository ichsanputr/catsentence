<template>
    <v-dialog v-model="dialog" width="auto" content-class="elevation-0">
        <div class="rounded-[12px] min-w-[280px] max-w-[360px] border-2 border-[#E3D3C6]">
            <v-container class="bg-main rounded-[12px] color-nextu">
                <div class="flex justify-between items-center border-b pb-1">
                    <div class="mb-2 flex items-center color-second">
                        <Icon width="20" icon="fa:language" />
                        <div class="text-xl ml-2">Change Languange</div>
                    </div>
                    <v-btn icon size="small" color="transparent" elevation="0" @click="dialog = false">
                        <Icon width="18" icon="majesticons:close" />
                    </v-btn>
                </div>
                <div class="py-3">
                    <v-select
v-model="languange" density="comfortable" variant="outlined" item-title="name" item-value="key" class="mt-1 py-0" menu-class="bg-main"
                        label="Choose Languange" :items="languanges">
                        <template #item="{ props, item }">
                            <v-list-item
                            class="bg-main py-0 color-nextu"
v-bind="props" :prepend-avatar="item.raw.avatar" :subtitle="item.raw.group"
                                :title="item.raw.name">
                                <template #prepend class="bg-main">
                                    <v-avatar size="24">
                                        <img :src="item.raw.avatar" alt="Avatar" >
                                    </v-avatar>
                                </template>
                            </v-list-item>
                        </template>
                    </v-select>
                    <div class="text-sm -mt-1">The language will be automatically applied to sentences and leaderboards
                        after you select it.
                    </div>
                </div>
            </v-container>
        </div>
    </v-dialog>
</template>
<script setup>
import { useVModel } from '@vueuse/core';
import { useLanguange } from '~/store/languange';
import { useFillme } from '~/store/fillme';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const languangeStore = useLanguange(); 
const typeStore = useFillme(); 
const dialog = useVModel(props, 'modelValue');
const languanges = reactive([
    {
        name: "English",
        key: 1,
        avatar: "https://ik.imagekit.io/uvma3bkbp/emojione--flag-for-united-kingdom_bMZ3KPVF61.svg?updatedAt=1736655969361"
    },
    {
        name: "Spanish",
        key: 2,
        avatar: "https://ik.imagekit.io/uvma3bkbp/emojione--flag-for-spain_RMd9YupvO.svg?updatedAt=1736655969418"
    },
    {
        name: "Indonesia",
        key: 3,
        avatar: "https://ik.imagekit.io/uvma3bkbp/emojione--flag-for-indonesia_CyFL1-BCi.svg?updatedAt=1736655969778"
    }
])

const languange = computed({
  get: () => languangeStore.languange,
  set: (value) => {
    const temp = languangeStore.languange 
    languangeStore.languange = value;
    if (temp != value) typeStore.loadTest()
  },
});
</script>
<style>
.v-list {
    padding: 0 !important;
}
</style>