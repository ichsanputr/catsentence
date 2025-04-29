<template>
    <div>
        <div v-if="!loaded" class="w-full py-3 flex justify-center">
            <v-progress-circular class="mx-auto color-nextu" indeterminate />
        </div>
        <div v-else id="text-box" class="color-nextu flex flex-col">
            <div class="mb-4" v-if="focused">
                <div class="text-lg">{{ this.fillmeStore.roomSentences.name }}</div>
                <div class="text-sm">{{ this.fillmeStore.roomSentences.description }}</div>
            </div>
            <div class="mb-3 text-lg">{{ fillmeStore.correctWords }}/{{ totalWords }} ~ {{ timerComputed }}
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
        </div>
    </div>
</template>
<script>
import { useFillme } from '~/store/fillme';

export default {
    setup() {
        definePageMeta({
            layout: "app",
            prerender: false,
            ssr: false
        });

        useHead({
            title: 'Room'
        })
    },
    data() {
        return {
            fillmeStore: useFillme(),
            show: false,
            inputData: null,
            loaded: false,
            focused: true,
            total: 0,
            loaded: false,
            loadingSearchSentence: false,
        }
    },
    computed: {
        currentWords() {
            return this.fillmeStore.currentSentence.words
        },
        lengthListSentencesSearchComputed() {
            return this.listSearchSentences?.length ?? 0
        },
        totalWords() {
            return this.fillmeStore.currentSentence?.words?.length
        },
        timerComputed() {
            const timer = this.fillmeStore.timer
            const minutes = Math.floor(timer / 60); // 1
            const seconds = timer % 60; // 2
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },
    },
    async mounted() {
        if (import.meta.client) {
            window.addEventListener('keydown', this.handleKeyPress);
        }

        // load test
        await this.fillmeStore.loadTestRoom(this.$route.params.id ?? '')

        // reset from any page
        this.fillmeStore.clearTimer()
        this.fillmeStore.correctWords = 0
        this.fillmeStore.currentCharIndex = 0
        this.fillmeStore.currentWordIndex = 0

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
        clickFocused() {
            if (this.$vuetify.display.xs) return

            this.focused = false

            // start timer when first user type
            if (this.fillmeStore.timer == 0 && this.fillmeStore.currentCharIndex == 0 && this.fillmeStore.currentWordIndex == 0) {
                this.fillmeStore.startTimer()
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
            this.fillmeStore.clearTimer()
            this.fillmeStore.correctWords = 0
            this.fillmeStore.currentCharIndex = 0
            this.fillmeStore.currentWordIndex = 0

            // load new sentence
            await this.fillmeStore.loadTest()

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
                this.fillmeStore.handleType(event.key)
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