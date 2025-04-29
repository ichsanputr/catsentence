<template>
    <div>
        <v-dialog v-model="dialogSearchBox" width="auto" content-class="w-full elevation-0">
            <div class="rounded-[12px] w-[300px] sm:w-[600px] border-2 border-[#E3D3C6]">
                <v-container class="bg-main rounded-[12px] color-nextu">
                    <div class="flex justify-between items-center">
                        <div class="text-xl">List Sentences</div>
                        <v-btn icon size="small" color="transparent" elevation="0" @click="dialogSearchBox = false">
                            <Icon width="18" icon="majesticons:close" />
                        </v-btn>
                    </div>
                    <div class="flex flex-col md:flex-row md:gap-3 mt-4">
                        <v-select v-model="categorySearch" class="md:w-1/2" density="compact" variant="outlined"
                            :items="options.kind" item-value="key" item-title="item" label="Kind"
                            @update:model-value="loadQuestionSearch" />
                    </div>
                    <div class="text-sm mb-2 italic">Showing total <span class="font-medium">{{
                        lengthListSentencesSearchComputed }}</span> results</div>
                    <v-progress-linear v-if="loadingQuestionSearch" class="color-next" height="2" indeterminate />
                    <div class="max-h-[300px] overflow-y-scroll px-1">
                        <div v-for="(v, i) in listSearchQuestion" :key="i" :class="i % 2 == 0 ? 'bg-primer' : ''"
                            class="cursor-pointer rounded-lg px-3 py-5 color-nextu flex items-center"
                            @click="selectQuestion(v)">
                            <div class="flex items-center flex-1 mr-6">
                                <div
                                    class="mr-4 relative flex-none text-xs font-light bg-[#9A7A61] text-white w-[28px] flex items-center justify-center h-[28px] rounded-full">
                                    #{{ i + 1 }}
                                </div>
                                <div class="line-clamp-2 leading-6">{{ scrambledQuestion(v.text) }}</div>
                            </div>
                            <div class="flex-none flex flex-col gap-1 justify-center items-center">
                                <div class="bg-[#E0794E] color-white rounded-full w-fit text-xs mb-1 px-2 py-1">{{
                                    v.played }}
                                    played
                                    <v-tooltip activator="parent" location="top">Total Played</v-tooltip>
                                </div>
                                <div class="flex justify-end gap-2 w-full">
                                    <v-btn v-if="v.exists_in_results" icon size="24px" elevation="0"
                                        color="transparent">
                                        <v-tooltip activator="parent" location="bottom">You've fill this</v-tooltip>
                                        <Icon width="22" color="#728881" icon="uim:check" />
                                    </v-btn>
                                    <v-btn icon size="24px" elevation="0" color="transparent">
                                        <v-tooltip activator="parent" location="bottom">Created by
                                            {{ v.name }}</v-tooltip>
                                        <Icon width="20" color="#728881" icon="lets-icons:user" />
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-container>
            </div>
        </v-dialog>
        <v-snackbar v-model="toast.state" :color="toast.color" timeout="3000">
            <div class="flex items-center">
                <Icon width="20" :icon="toast.color == 'blue' ? 'tabler:circle-check' : 'mdi:error'" />
                <div class="ml-1">{{ toast.text }}</div>
            </div>
        </v-snackbar>
        <div class="h-[130px] sm:h-[80px]">
            <Transition name="fade-menu">
                <div v-show="focused" style="box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);"
                    class="mx-auto bg-primer w-fit py-3 px-5 rounded-lg gap-4 sm:gap-4 text-sm color-nextu flex flex-col sm:flex-row flex-wrap sm:justify-center">
                    <div class="flex items-center gap-4 justify-center flex-wrap">
                        <div :class="{ 'color-second': craftmeStore.menu.category == 1 }"
                            class="cursor-pointer flex gap-1 items-center" @click="changeMenu(1)">
                            <Icon width="14" icon="ion:book" />
                            <div>Story</div>
                        </div>
                        <div :class="{ 'color-second': craftmeStore.menu.category == 2 }"
                            class="cursor-pointer flex gap-1 items-center" @click="changeMenu(2)">
                            <Icon width="18" icon="fluent:news-20-filled" />
                            <div>News</div>
                        </div>
                        <div :class="{ 'color-second': craftmeStore.menu.category == 3 }"
                            class="cursor-pointer flex gap-1 items-center" @click="changeMenu(3)">
                            <Icon width="18" icon="tdesign:user-talk-1-filled" />
                            <div>Question</div>
                        </div>
                        <div :class="{ 'color-second': craftmeStore.menu.category == 4 }"
                            class="cursor-pointer flex gap-1 items-center" @click="changeMenu(4)">
                            <Icon width="18" icon="mingcute:fire-fill" />
                            <div>Trend</div>
                        </div>
                    </div>
                    <div class="flex mx-auto items-center gap-4">
                        <Icon class="cursor-pointer" width="18" icon="mingcute:search-3-fill" @click="openSearchBox" />
                    </div>
                </div>
            </Transition>
        </div>
        <div id="text-box" class="color-nextu flex flex-col">
            <div class="mb-5 text-base text-center">{{ craftmeStore.wrong }} wrong ~ {{ timerComputed }}</div>
            <ul ref="sortableContainer" class="flex justify-center flex-wrap gap-2">
                <li v-for="(word, index) in scrambledSentence" :key="index"
                    class="px-3 py-2 bg-primer color-nextu rounded cursor-move select-none">
                    {{ word }}
                </li>
            </ul>
            <v-btn @click="checkSentence" flat class="bg-primer w-fit mx-auto gap-2 mt-8 color-nextu rounded-lg">
                <div>
                    Check
                </div>
                <Icon width="12" icon="weui:arrow-filled" />
            </v-btn>
            <div class="flex justify-center mt-8">
                <v-tooltip v-model="show" location="bottom">
                    <template #activator="{ props /* eslint-disable-line vue/no-unused-vars */ }">
                        <v-btn v-bind:="props" icon color="transparent" elevation="0" @click="newTest">
                            <Icon width="24" icon="material-symbols:refresh" class="color-nextu" />
                        </v-btn>
                    </template>
                    <span>New Question</span>
                </v-tooltip>
            </div>
        </div>
    </div>
</template>
<script>
import Sortable from 'sortablejs'
import { useCraftme } from '~/store/craftme';

export default {
    setup() {
        definePageMeta({
            layout: "craftme",
            prerender: false,
            ssr: false
        });

        useHead({
            title: 'CraftMe'
        })
    },
    data() {
        return {
            craftmeStore: useCraftme(),
            show: false,
            inputData: null,
            loaded: false,
            focused: true,
            dialogSearchBox: false,
            listSearchQuestion: null,
            total: 0,
            loadingQuestionSearch: false,
            toast: {
                state: false,
                color: 'red',
                text: '',
            },
            options: {
                kind: [
                    { item: 'Story', key: 1 },
                    { item: 'News', key: 2 },
                    { item: 'Question', key: 3 },
                    { item: 'Trend', key: 4 },
                ]
            }
        }
    },
    computed: {
        scrambledSentence() {
            return [...this.craftmeStore.question.text.split(' ')].sort(() => Math.random() - 0.5)
        },
        lengthListSentencesSearchComputed() {
            return this.listSearchQuestion?.length ?? 0
        },
        totalWords() {
            return this.craftmeStore.currentSentence?.words?.length
        },
        timerComputed() {
            const timer = this.craftmeStore.timer
            const minutes = Math.floor(timer / 60); // 1
            const seconds = timer % 60; // 2
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },
        categorySearch: {
            get() {
                return this.craftmeStore.menu.category;
            },
            set(value) {
                this.craftmeStore.menu.category = value;
            },
        },
    },
    async mounted() {
        await this.craftmeStore.loadQuestion()
        await this.$nextTick(() => {
            Sortable.create(this.$refs.sortableContainer, {
                animation: 150,
            })

            this.loaded = true
        })
    },
    methods: {
        async selectQuestion(v) {
            this.craftmeStore.wrong = 0

            this.craftmeStore.selectQuestion(v)
            this.dialogSearchBox = false
        },
        async changeMenu(category) {
            // reset
            this.craftmeStore.clearTimer()
            this.craftmeStore.correctWords = 0

            // change menu and load new test
            await this.craftmeStore.changeMenu(category)
        },
        async openSearchBox() {
            this.dialogSearchBox = true
            if (!this.listSearchQuestion) await this.loadQuestionSearch()
        },
        async newTest() {
            // reset
            this.craftmeStore.clearTimer()
            this.craftmeStore.wrong = 0

            // load new question
            await this.craftmeStore.loadQuestion()
        },
        async loadQuestionSearch() {
            const { $axios } = useNuxtApp();

            this.loadingQuestionSearch = true
            try {
                const { data } = await $axios.get('/craftme/question/list', {
                    params: {
                        category: this.craftmeStore.menu.category,
                        limit: 1000,
                        languange: 1,
                    },
                });
                this.listSearchQuestion = data.data
            } catch (error) {
                console.error(error);
            }
            this.loadingQuestionSearch = false
        },
        scrambledQuestion(text) {
            return [...text.split(' ')].sort(() => Math.random() - 0.5).join(' ');
        },
        checkSentence() {
            let userSentence = Array.from(this.$refs.sortableContainer.children).map((item) => item.textContent).join(' ')
            if (userSentence === this.craftmeStore.question.text) {
                this.toast.state = true
                this.toast.color = 'green'
                this.toast.text = 'Correct 😺!'
            } else {
                this.toast.state = true
                this.toast.color = 'red'
                this.toast.text = 'Wrong Answer 😿!'

                this.craftmeStore.wrong += 1
            }
        }
    }
}
</script>
<style>
.fade-menu-enter-active,
.fade-menu-leave-active {
    transition: opacity 0.5s ease;
}

.fade-menu-enter-from,
.fade-menu-leave-to {
    opacity: 0;
}

#caret {
    position: absolute;
    display: inline-block;
    width: 2.5px;
    height: 20px;
    content: "";
    transition: 0.08s ease-in;
    color: rgb(97, 175, 239);
    position: absolute;
    animation: 1s ease 0s infinite normal none running blink;
    background-color: rgb(97, 175, 239);
}

.overlay {
    position: absolute;
    width: 100%;
    max-height: 200px;
    cursor: pointer;
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.char {
    line-height: 24px;
    display: inline-block;
}

.wrap-char {
    margin-right: 1.5px
}

.border-blink {
    position: absolute;
    bottom: 0px;
    left: -2px;
    width: 2.5px;
    border-radius: 4px;
    height: 1em;
    transition: transform 0.1s ease;
    animation: blink 1s steps(1) infinite;
    background-color: #61AFEF;
}

@keyframes blink {

    0%,
    20% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    80%,
    100% {
        opacity: 1;
    }
}
</style>