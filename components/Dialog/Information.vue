<template>
    <v-dialog v-model="dialog" width="auto" content-class="elevation-0">
        <div class="rounded-[12px] min-w-[280px] max-w-[440px] border-2 border-[#E3D3C6]">
            <v-container class="bg-main rounded-[12px] color-nextu">
                <div class="flex justify-between items-center border-b pb-1">
                    <div class="mb-2 flex items-center color-second">
                        <Icon width="20" icon="heroicons-outline:information-circle" />
                        <div class="text-xl ml-1">Information </div>
                    </div>
                    <v-btn icon size="small" color="transparent" elevation="0" @click="dialog = false">
                        <Icon width="18" icon="majesticons:close" />
                    </v-btn>
                </div>
                <div class="py-3">
                    <div class="text-md mb-2 font-medium">How leaderboard counted?</div>
                    <div class="text-sm mb-2">The leaderboard calculation is calculated from the number of points the
                        user gets, the calculation is taken from the remaining time for completing the sentence.</div>
                    <ul class="text-sm list-decimal pl-4 pb-2">
                        <li class="mb-1 ml-2">Normal time for short type is <span class="font-medium">30 second</span>, medium is <span class="font-medium">1
                                minute</span> and long is <span class="font-medium">1 minute 30 second</span> </li>
                        <li class="mb-1 ml-2">You will get point from the remaining time you get then <span class="font-medium">multiplied by 3</span></li>
                        <li class="mb-1 ml-2">For example you finish sentence with medium length in 45 second, because maximal point form medium type is 1 minute, you will get <span class="font-medium">15 * 3 point</span> or <span class="font-medium">45 point</span></li>
                        <li class="mb-1 ml-2">If you complete the sentence more than the time allowed you will not get any point</li>
                    </ul>
                    <div class="text-sm mb-2">Point will be add to your profile after you save the result, you can repeat a sentence more than one to get the best result</div>
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

const dialog = useVModel(props, 'modelValue');
</script>