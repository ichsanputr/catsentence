<template>
    <div>
        <v-snackbar v-model="toast.success" color="success" timeout="3000">
            <div class="flex items-center">
                <Icon width="20" icon="tabler:circle-check" />
                <div class="ml-1">Result Saved!</div>
            </div>
        </v-snackbar>
        <v-snackbar v-model="toastReport.success" color="success" timeout="3000">
            <div class="flex items-center">
                <Icon width="20" icon="tabler:circle-check" />
                <div class="ml-1">Sentence Reported!</div>
            </div>
        </v-snackbar>
        <v-snackbar v-model="toast.error" color="red-lighten-1">
            <div class="flex items-center">
                <Icon width="20" icon="mi:circle-error" class="text-[#FA4032]" />
                <div class="ml-1">Login first to save result!</div>
            </div>
        </v-snackbar>
        <v-snackbar v-model="toastReport.error" color="red-lighten-1">
            <div class="flex items-center">
                <Icon width="20" icon="mi:circle-error" class="text-[#FA4032]" />
                <div class="ml-1">Login first to report this sentence!</div>
            </div>
        </v-snackbar>
        <DialogReport v-model="dialogReport" @report-sentence="reportSentence" />
        <div v-if="fillmeStore.currentSentence">
            <div class="flex flex-col sm:flex-row gap-6 py-8 sm:py-1">
                <div class="flex-none color-nextu flex flex-col gap-4 rounded-md">
                    <div class="items-center">
                        <div class="text-lg sm:text-xl mb-2">
                            Time
                        </div>
                        <div class="text-3xl sm:text-4xl color-second">
                            {{ timerComputed }}
                        </div>
                    </div>
                    <div class="items-center">
                        <div class="text-llg sm:text-xl mb-2">
                            Wrong Type
                        </div>
                        <div class="text-3xl sm:text-4xl color-second">
                            {{ fillmeStore.wrongType ?? 0 }}
                        </div>
                    </div>
                    <div class="items-center">
                        <div class="text-lg sm:text-xl mb-2">
                            {{ fillmeStore.roomMode ? 'Room Info' : 'Sentence Type' }}
                        </div>
                        <div v-if="!fillmeStore.roomMode">
                            <div class="text-base color-second">
                                • {{ getLength(fillmeStore.currentSentence.length) }}
                            </div>
                            <div class="text-base color-second">
                                • {{ getKind(fillmeStore.currentSentence.category) }}
                            </div>
                            <div class="text-base color-second">
                                • {{ getLanguange(languangeStore.languange) }}
                            </div>
                        </div>
                        <div v-else>
                            <div class="text-base color-second">
                                • {{ fillmeStore.roomSentences.lang }}
                            </div>
                            <div class="text-base color-second">
                                • {{ fillmeStore.roomSentences.played == 0 ? '1' : fillmeStore.roomSentences.played }}
                                Played
                            </div>
                            <div class="text-base color-second">
                                • {{ fillmeStore.roomSentences.is_private ? 'Private' : 'Public' }} Room
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-1 justify-center items-center sm:px-8">
                    <div v-if="!fillmeStore.roomMode" class="text-xl sm:text-2xl color-nextu select-none text-center"
                        v-html="sentenceComputed" />
                    <div v-else
                        class="flex flex-col text-xl sm:text-2xl color-nextu select-none text-center w-full h-full">
                        <div class="text-lg font-medium color-second">
                            {{ fillmeStore.roomSentences.name }} <span class="text-sm">#{{ fillmeStore.roomSentences.room_id
                                }}</span>
                        </div>
                        <div class="text-sm color-second">
                            {{ fillmeStore.roomSentences.description }}
                        </div>
                        <div class="flex flex-col gap-2 mt-4 overflow-y-scroll sm:h-[300px]">
                            <div v-for="item in fillmeStore.roomSentences.sentences"
                                class="flex flex-wrap rounded-lg px-3 bg-primer pt-2 pb-1.5 text-sm color-nextu">
                                {{ item.sentence }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center color-nextu gap-10">
                <v-tooltip location="bottom">
                    <template #activator="{ props }">
                        <v-btn v-bind="props" icon elevation="0" color="transparent" size="small" class="color-white"
                            @click="dialogReport.state = true">
                            <Icon :width="$vuetify.display.mobile ? 20 : 26" icon="weui:report-problem-filled" />
                        </v-btn>
                    </template>
                    <span>Report Sentence</span>
                </v-tooltip>
                <v-tooltip location="bottom" v-if="!fillmeStore.roomMode">
                    <template #activator="{ props }">
                        <v-btn v-bind="props" icon elevation="0" color="transparent" size="small" class="color-white"
                            @click="navigateTo('/fillme')">
                            <Icon :width="$vuetify.display.mobile ? 24 : 30" icon="majesticons:chevron-right" />
                        </v-btn>
                    </template>
                    <span>New Sentence</span>
                </v-tooltip>
                <v-tooltip location="bottom">
                    <template #activator="{ props }">
                        <v-btn :loading="loadingSaveResult" v-bind="props" icon elevation="0" color="transparent"
                            size="small" class="color-white" @click="saveResult">
                            <Icon v-if="!resultSaved" :width="$vuetify.display.mobile ? 24 : 30"
                                icon="tabler:bookmark" />
                            <Icon v-else :width="$vuetify.display.mobile ? 24 : 30" icon="tabler:bookmark-filled" />
                        </v-btn>
                    </template>
                    <span>Save Result</span>
                </v-tooltip>
                <v-tooltip v-if="fillmeStore.roomMode" location="bottom">
                    <template #activator="{ props }">
                        <v-btn :loading="loadingSaveResult" v-bind="props" icon elevation="0" color="transparent"
                            size="small" class="color-white" @click="navigateTo('/fillme/room')">
                            <Icon :width="$vuetify.display.mobile ? 24 : 30" icon="grommet-icons:form-next" />
                        </v-btn>
                    </template>
                    <span>Find Room</span>
                </v-tooltip>
            </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center color-nextu text-center text-xl">
            <v-img class="mx-auto" width="140" lazy-src="/cartoon.png" src="/cartoon.png" />
            <div class="mt-3">Complete your task first before see the result :)</div>
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
            fillmeStore: useFillme(),
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
            return this.fillmeStore.currentSentence?.sentence.split(" ").map((v, i) => {
                if (this.fillmeStore.currentSentence?.fill.includes(i)) {
                    return `<span class='underline color-second text-xl sm:text-2xl'>${v}</span>`
                }

                return v
            }).join(" ")
        },
        timerComputed() {
            const minutes = Math.floor(this.fillmeStore.timerSaved / 60);
            const remainingSeconds = this.fillmeStore.timerSaved % 60;
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
                    sentence_id: this.fillmeStore.currentSentence.uuid,
                    room_id: this.fillmeStore.roomSentences.uuid,
                    time: this.fillmeStore.timerSaved,
                    wrong: this.fillmeStore.wrongType,
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
                    sentence_id: this.fillmeStore.currentSentence.uuid,
                    ip: !this.fillmeStore.user?.email ? this.fillmeStore.ipUser : null
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