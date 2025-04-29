<template>
    <v-dialog v-model="dialog.state" width="auto" content-class="w-full elevation-0">
        <div class="rounded-[12px] w-[200px] sm:w-[400px] border-2 border-[#E3D3C6]">
            <v-container class="bg-main rounded-[12px] color-nextu">
                <div class="flex justify-between border-b pb-1 items-center">
                    <div class="text-xl">Report Sentence</div>
                    <v-btn icon size="small" color="transparent" elevation="0" @click="dialog.state = false">
                        <Icon width="18" icon="majesticons:close" />
                    </v-btn>
                </div>
                <div class="text-sm my-2">Report words that are considered irrelevant to the topic or the answer, we will delete them if the sentence is problematic.</div>
                <div class="mt-4 flex justify-end">
                    <v-btn :loading="dialog.loading" v-bind="props" elevation="0" color="#688E8F" size="small" class="color-white" @click="$emit('reportSentence')">
                        <Icon width="18" icon="weui:report-problem-filled" />
                        Report
                    </v-btn>
                </div>
            </v-container>
        </div>
    </v-dialog>
</template>
<script setup>
import { useVModel } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
        return {}
    },
  },
});

defineEmits(['reportSentence'])

const dialog = useVModel(props, 'modelValue');
</script>