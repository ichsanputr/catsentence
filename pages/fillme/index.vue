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
                        <v-select
v-model="kindSearch" class="md:w-1/2" density="compact" variant="outlined"
                            :items="options.kind" item-value="key" item-title="item" label="Kind"
                            @update:model-value="loadSentenceSearch" />
                        <v-select
v-model="lengthSearch" class="md:w-1/2" density="compact" variant="outlined"
                            :items="options.length" item-value="key" item-title="item" label="Length"
                            @update:model-value="loadSentenceSearch" />
                    </div>
                    <div class="text-sm mb-2 italic">Showing total <span class="font-medium">{{
                        lengthListSentencesSearchComputed }}</span> results</div>
                    <v-progress-linear v-if="loadingSearchSentence" class="color-next" height="2" indeterminate />
                    <div class="max-h-[300px] overflow-y-scroll px-1">
                        <div
v-for="(v, i) in listSearchSentences" :key="i" :class="i % 2 == 0 ? 'bg-primer' : ''"
                            class="cursor-pointer rounded-lg px-3 py-5 color-nextu flex items-center"
                            @click="selectSentence(v)">
                            <div class="flex items-center flex-1 mr-6">
                                <div
                                    class="mr-4 relative flex-none text-xs font-light bg-[#9A7A61] text-white w-[28px] flex items-center justify-center h-[28px] rounded-full">
                                    #{{ i + 1 }}
                                </div>
                                <div class="line-clamp-2 leading-6">{{ textComputed(v.sentence, v.fill) }}</div>
                            </div>
                            <div class="flex-none flex flex-col gap-1 justify-center items-center">
                                <div class="bg-[#E0794E] color-white rounded-full w-fit text-xs mb-1 px-2 py-1">{{
                                    v.played }}
                                    played
                                    <v-tooltip activator="parent" location="top">Total Played</v-tooltip>
                                </div>
                                <div class="flex justify-end gap-2 w-full">
                                    <v-btn
v-if="v.exists_in_results" icon size="24px" elevation="0"
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
        <div class="h-[130px] sm:h-[80px]">
            <Transition name="fade-menu">
                <div
v-show="focused" style="box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);"
                    class="mx-auto bg-primer w-fit py-3 px-5 rounded-lg gap-4 sm:gap-4 text-sm color-nextu flex flex-col sm:flex-row flex-wrap sm:justify-center">
                    <div class="flex items-center gap-4 justify-center flex-wrap">
                        <div
:class="{ 'color-second': categoryStore.home.kind == 1 }"
                            class="cursor-pointer flex gap-1 items-center" @click="changeMenu(1, 'kind')">
                            <Icon width="14" icon="ion:book" />
                            <div>Story</div>
                        </div>
                        <div
:class="{ 'color-second': categoryStore.home.kind == 2 }"
                            class="cursor-pointer flex gap-1 items-center" @click="changeMenu(2, 'kind')">
                            <Icon width="18" icon="fluent:news-20-filled" />
                            <div>News</div>
                        </div>
                        <div
:class="{ 'color-second': categoryStore.home.kind == 3 }"
                            class="cursor-pointer flex gap-1 items-center" @click="changeMenu(3, 'kind')">
                            <Icon width="18" icon="tdesign:user-talk-1-filled" />
                            <div>Talk</div>
                        </div>
                        <!-- <div @click="changeMenu(4, 'kind')" :class="{ 'color-second': categoryStore.home.kind == 4 }"
                            class="cursor-pointer flex gap-1 items-center">
                            <Icon width="18" icon="flowbite:quote-solid" />
                            <div>Quotes</div>
                        </div> -->
                        <div
:class="{ 'color-second': categoryStore.home.kind == 5 }"
                            class="cursor-pointer flex gap-1 items-center" @click="changeMenu(5, 'kind')">
                            <Icon width="18" icon="bx:world" />
                            <div>All</div>
                        </div>
                    </div>
                    <div class="flex mx-auto items-center gap-4">
                        <div class="w-[8px] h-[16px] bg-main rounded-full" />
                        <div
class="cursor-pointer" :class="{ 'color-second': categoryStore.home.length == 1 }"
                            @click="changeMenu(1, 'length')">Short</div>
                        <div
class="cursor-pointer" :class="{ 'color-second': categoryStore.home.length == 2 }"
                            @click="changeMenu(2, 'length')">Medium</div>
                        <div
class="cursor-pointer" :class="{ 'color-second': categoryStore.home.length == 3 }"
                            @click="changeMenu(3, 'length')">Long</div>
                        <div class="w-[8px] h-[16px] bg-main rounded-full" />
                        <Icon class="cursor-pointer" width="18" icon="mingcute:search-3-fill" @click="openSearchBox" />
                    </div>
                </div>
            </Transition>
        </div>
        <div v-if="!loaded" class="w-full py-3 flex justify-center">
            <v-progress-circular class="mx-auto color-nextu" indeterminate />
        </div>
        <div v-else id="text-box" class="color-nextu flex flex-col">
            <div class="mb-3 text-lg">{{ typeStore.correctWords }}/{{ totalWords }} ~ {{ timerComputed }}
            </div>
            <div
id="wrapTest" :class="!focused ? 'overflow-y-scroll' : ''"
                class="max-h-[200px] overflow-hidden items-start color-nextu relative text-2xl flex flex-wrap gap-y-2 select-none"
                @click="clickFocused">
                <div v-if="focused" id="overlay" class="overlay">{{ $vuetify.display.xs ? 'Please use dekstop' : 'Click to Focus' }}</div>
                <span id="caret" style="left: 0px;top: 7px" />
                <div v-for="(word, t) in currentWords" :key="t" class="mr-2 flex" :class="'word' + t">
                    <div v-for="(char, i) in word.chars" :key="i" class="relative flex wrap-char">
                        <span :id="'char' + t + i" :class="statusCharacter(char.status)">
                            {{ charComputed(char) }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mt-8">
                <v-tooltip v-model="show" location="bottom">
                    <template #activator="{ props /* eslint-disable-line vue/no-unused-vars */ }">
                        <v-btn v-bind:="props" icon color="transparent" elevation="0" @click="newTest">
                            <Icon width="24" icon="material-symbols:refresh" class="color-nextu" />
                        </v-btn>
                    </template>
                    <span>New Sentence</span>
                </v-tooltip>
            </div>
        </div>
    </div>
</template>
<script>
import { useFillmeCategory } from '~/store/fillmeCategory';
import { useFillme } from '~/store/fillme';

export default {
    setup() {
        definePageMeta({
            layout: "app",
            prerender: false,
            ssr: false
        });

        useHead({
            title: 'Fillme'
        })
    },
    data() {
        return {
            typeStore: useFillme(),
            categoryStore: useFillmeCategory(),
            show: false,
            inputData: null,
            loaded: false,
            focused: true,
            dialogSearchBox: false,
            listSearchSentences: null,
            total: 0,
            loaded: false,
            loadingSearchSentence: false,
            options: {
                length: [
                    { item: 'Short', key: 1 },
                    { item: 'Medium', key: 2 },
                    { item: 'Long', key: 3 },
                ],
                kind: [
                    { item: 'Story', key: 1 },
                    { item: 'News', key: 2 },
                    { item: 'Talk', key: 3 },
                    { item: 'All', key: 5 },
                ]
            }
        }
    },
    computed: {
        currentWords() {
            return this.typeStore.currentSentence.words
        },
        lengthListSentencesSearchComputed() {
            return this.listSearchSentences?.length ?? 0
        },
        totalWords() {
            return this.typeStore.currentSentence?.words?.length
        },
        timerComputed() {
            const timer = this.typeStore.timer
            const minutes = Math.floor(timer / 60); // 1
            const seconds = timer % 60; // 2
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },
        kindSearch: {
            get() {
                return this.typeStore.menu.kind;
            },
            set(value) {
                this.typeStore.menu.kind = value;
            },
        },
        lengthSearch: {
            get() {
                return this.typeStore.menu.length;
            },
            set(value) {
                this.typeStore.menu.length = value;
            },
        },
    },
    async mounted() {
        if (import.meta.client) {
            window.addEventListener('keydown', this.handleKeyPress);
        }

        // load test
        await this.typeStore.loadTest(this.$route.query.id ?? '')

        // reset from any page
        this.typeStore.clearTimer()
        this.typeStore.correctWords = 0
        this.typeStore.currentCharIndex = 0
        this.typeStore.currentWordIndex = 0

        // loaded true after load first test
        this.loaded = true

        await this.$nextTick(async () => {
            const el = document.getElementById('text-box');

            document.body.addEventListener('click', async (event) => {
                if (event.target.className === 'overlay') {
                    if (!this.$vuetify.display.xs) this.focused = false
                } else if (!el.contains(event.target)) {
                    this.focused = true
                }

                await this.$nextTick(() => {
                    this.setHeightOverlay()
                })
            });

            this.setHeightOverlay()

            document.getElementById('caret').style.left = '0px'
            document.getElementById('caret').style.top = '5px'
        })
    },
    beforeUnmount() {
        if (process.client){
            window.removeEventListener('keydown', this.handleKeyPress);
        }
    },
    methods: {
        async selectSentence(v) {
            this.typeStore.correctWords = 0
            this.typeStore.currentCharIndex = 0
            this.typeStore.currentWordIndex = 0

            this.typeStore.selectSentence(v)
            this.dialogSearchBox = false

            // set height overlay
            await this.$nextTick(() => {
                this.setHeightOverlay()
                document.getElementById('caret').style.left = '0px'
                document.getElementById('caret').style.top = '5px'
            })
        },
        async changeMenu(kind, length) {
            // reset
            this.typeStore.clearTimer()
            this.typeStore.correctWords = 0
            this.typeStore.currentCharIndex = 0
            this.typeStore.currentWordIndex = 0

            // change menu and load new test
            await this.categoryStore.changeMenu('home', length, kind)

            // set height overlay
            await this.$nextTick(() => {
                this.setHeightOverlay()
                document.getElementById('caret').style.left = '0px'
                document.getElementById('caret').style.top = '5px'
            })
        },
        async openSearchBox() {
            this.dialogSearchBox = true
            if (!this.listSearchSentences) await this.loadSentenceSearch()
        },
        clickFocused() {
            if (this.$vuetify.display.xs) return

            this.focused = false

            // start timer when first user type
            if (this.typeStore.timer == 0 && this.typeStore.currentCharIndex == 0 && this.typeStore.currentWordIndex == 0) {
                this.typeStore.startTimer()
            }
        },
        textComputed(text, fill) {
            const indicesToReplace = fill.split(',').map(num => parseInt(num));

            const words = text.split(' ');

            indicesToReplace.forEach(index => {
                if (index >= 0 && index < words.length) {
                    words[index] = "_";
                }
            });

            return words.join(' ');
        },
        async newTest() {
            // reset
            this.typeStore.clearTimer()
            this.typeStore.correctWords = 0
            this.typeStore.currentCharIndex = 0
            this.typeStore.currentWordIndex = 0

            // load new sentence
            await this.typeStore.loadTest()

            // enable focus
            this.focused = true

            // set height overlay
            await this.$nextTick(() => {
                this.setHeightOverlay()
                document.getElementById('caret').style.left = '0px'
                document.getElementById('caret').style.top = '5px'
            })
        },
        setHeightOverlay() {
            if (document.getElementById('overlay')){
                document.getElementById('overlay').style.height = document.getElementById('wrapTest')?.offsetHeight + 'px'
            }
        },
        async loadSentenceSearch() {
            const { $axios } = useNuxtApp();

            this.loadingSearchSentence = true
            try {
                const { data } = await $axios.get('/fillme/sentence/list', {
                    params: {
                        length: this.typeStore.menu.length,
                        category: this.typeStore.menu.kind,
                        limit: 1000,
                        ip: !this.typeStore.user?.email ? this.typeStore.ipUser : null
                    },
                });
                this.listSearchSentences = data.data
            } catch (error) {
                console.error(error);
            }
            this.loadingSearchSentence = false
        },
        charComputed(char) {
            if (char.fill) {
                if (char.char && char.status == 'correct') {
                    return char.char_correct
                } else if (char.char && char.status == 'wrong') {
                    return char.char
                } else {
                    return '_'
                }
            }

            return char.char
        },
        handleKeyPress(event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                this.newTest()
            } else if (event.ctrlKey && event.key === 'o') {
                event.preventDefault();
                this.openSearchBox()
            }

            if (!this.focused) {
                this.typeStore.handleType(event.key)
            }
        },
        statusCharacter(status) {
            if (status == 'correct') {
                return 'color-second'
            } else if (status == 'wrong') {
                return 'color-red'
            } else {
                return ''
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