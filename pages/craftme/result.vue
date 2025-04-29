<template>
    <div>
        <v-snackbar v-model="toast.success" color="success" timeout="3000" >
            <div class="flex items-center">
                <Icon width="20" icon="tabler:circle-check" />
                <div class="ml-1">Result Saved!</div>
            </div>
        </v-snackbar>
        <v-snackbar v-model="toastReport.success" color="success" timeout="3000" >
            <div class="flex items-center">
                <Icon width="20" icon="tabler:circle-check" />
                <div class="ml-1">Sentence Reported!</div>
            </div>
        </v-snackbar>
        <v-snackbar v-model="toast.error" color="red-lighten-1" >
            <div class="flex items-center">
                <Icon width="20" icon="mi:circle-error" class="text-[#FA4032]" />
                <div class="ml-1">Login first to save result!</div>
            </div>
        </v-snackbar>
        <v-snackbar v-model="toastReport.error" color="red-lighten-1" >
            <div class="flex items-center">
                <Icon width="20" icon="mi:circle-error" class="text-[#FA4032]" />
                <div class="ml-1">Login first to report this sentence!</div>
            </div>
        </v-snackbar>
        <DialogReport v-model="dialogReport" @report-sentence="reportSentence"/>
        <div v-if="typeStore.currentSentence">
            <div class="flex">
                <div class="flex-none color-nextu flex flex-col gap-4 rounded-md">
                    <div class="items-center">
                        <div class="text-2xl mb-2">
                            Time
                        </div>
                        <div class="text-5xl color-second">
                            {{ timerComputed }}
                        </div>
                    </div>
                    <div class="items-center">
                        <div class="text-2xl mb-2">
                            Wrong Type
                        </div>
                        <div class="text-5xl color-second">
                            {{ typeStore.wrongType ?? 0 }}
                        </div>
                    </div>
                    <div class="items-center">
                        <div class="text-2xl mb-2">
                            Sentence type
                        </div>
                        <div class="text-lg font-medium color-second">
                            • {{ getLength(typeStore.currentSentence.length) }}
                        </div>
                        <div class="text-lg font-medium color-second">
                            • {{ getKind(typeStore.currentSentence.category) }}
                        </div>
                        <div class="text-lg font-medium color-second">
                            • {{ getLanguange(languangeStore.languange) }}
                        </div>
                    </div>
                </div>
                <div class="flex flex-1 justify-center items-center px-8">
                    <div class="text-2xl color-nextu select-none text-center" v-html="sentenceComputed"/>
                </div>
            </div>
            <div class="flex justify-center items-center color-nextu gap-10">
                <v-tooltip location="bottom">
                    <template #activator="{ props }">
                        <v-btn
v-bind="props" icon elevation="0" color="transparent" size="small"
                            class="color-white" @click="dialogReport.state = true">
                            <Icon width="26" icon="weui:report-problem-filled" />
                        </v-btn>
                    </template>
                    <span>Report Sentence</span>
                </v-tooltip>
                <v-tooltip location="bottom">
                    <template #activator="{ props }">
                        <v-btn
v-bind="props" icon elevation="0" color="transparent" size="small"
                            class="color-white" @click="navigateTo('/fillme')">
                            <Icon width="30" icon="majesticons:chevron-right" />
                        </v-btn>
                    </template>
                    <span>New Sentence</span>
                </v-tooltip>
                <v-tooltip location="bottom">
                    <template #activator="{ props }">
                        <v-btn
:loading="loadingSaveResult" v-bind="props" icon elevation="0" color="transparent"
                            size="small" class="color-white" @click="saveResult">
                            <Icon v-if="!resultSaved" width="30" icon="tabler:bookmark" />
                            <Icon v-else width="30" icon="tabler:bookmark-filled" />
                        </v-btn>
                    </template>
                    <span>Save Result</span>
                </v-tooltip>
            </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center color-nextu text-center text-xl">
            <v-img class="mx-auto" width="140" lazy-src="/cartoon.png" src="/cartoon.png" />
            <div class="mt-3">Complete your sentence first before see the result :)</div>
        </div>
    </div>
</template>
<script>
import { useLanguange } from '~/store/languange';
import { useFillme } from '~/store/fillme';

export default {
    setup() {
        definePageMeta({
            layout: "app",
            prerender: false,
            ssr: false
        });

        useHead({
            title: 'Result Fillme'
        })
    },
    data() {
        return {
            result: {},
            typeStore: useFillme(),
            languangeStore: useLanguange(),
            resultSaved: false,
            loadingSaveResult: false,
            loadingReport: false,
            toast: {
                success: false
            },
            toastReport: {
                success: false
            },
            dialogReport: {
                state: false,
                loading: false,
            }
        }
    },
    computed: {
        sentenceComputed() {
            return this.typeStore.currentSentence?.sentence.split(" ").map((v, i) => {
                if (this.typeStore.currentSentence?.fill.includes(i)) {
                    return `<span class='underline color-second text-2xl'>${v}</span>`
                }

                return v
            }).join(" ")
        },
        timerComputed() {
            const minutes = Math.floor(this.typeStore.timerSaved / 60);
            const remainingSeconds = this.typeStore.timerSaved % 60;
            if (minutes > 0) {
                return `${minutes}m ${remainingSeconds}s`;
            } else {
                return `${remainingSeconds}s`;
            }
        }
    },
    methods: {
        async saveResult() {
            if (this.resultSaved) return

            this.sentences = []

            try {
                this.loadingSaveResult = true

                const body = {
                    sentence_id: this.typeStore.currentSentence.uuid,
                    time: this.typeStore.timerSaved,
                    wrong: this.typeStore.wrongType,
                    languange: this.languangeStore.languange
                }

                await axios.post('/fillme/result', body);

                setTimeout(() => {
                    this.toast.success = true
                    this.resultSaved = true
                }, 1000)
            } catch (err) {
                setTimeout(() => {
                    this.toast.error = true
                }, 1000)
                console.log(err);
            }

            this.loadingSaveResult = false
        },
        async reportSentence() {
            try {
                this.dialogReport.loading = true

                await axios.post('/fillme/report', {
                    sentence_id: this.typeStore.currentSentence.uuid,
                    ip: !this.typeStore.user?.email ? this.typeStore.ipUser : null
                });

                this.dialogReport.state = false
                setTimeout(() => {
                    this.toastReport.success = true
                }, 1000)
            } catch (err) {
                console.log(err);
                this.toastReport.error = true
            }

            this.dialogReport.loading = false
        }
    }
}
</script>