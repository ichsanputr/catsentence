// @ts-nocheck
/* 
Store file for fillme app
*/
import { defineStore } from 'pinia'
import { useFillmeCategory } from '~/store/fillmeCategory';
import { useLanguange } from '~/store/languange';
import { nextTick } from 'vue';
import { navigateTo } from '#app';
import { useApp } from '~/store/app';
import getKind from '@/utils/getKind';
import getLength from '@/utils/getLength';

export const useFillme = defineStore('fillme', {
  state: () => ({
    user: null,
    timer: 0,
    timerSaved: 0,
    intervalTimer: null,
    sentences: [],
    currentSentence: null,
    currentCharIndex: 0,
    currentWordIndex: 0,
    currentSentenceIndex: 0,
    correctWords: 0,
    wrongType: 0,
    currentLine: 0,
    menu: {
      kind: 1,
      length: 1,
    },
    prevRectChar: {
      bottom: 0,
      beforeLineEnd: []
    },
    sentenceInfo: {
      length: null,
      kind: null,
    },
    // room
    roomMode: false,
    roomSentences: [],
    roomSentencesLength: 0,
    roomSentencesIndex: 0
  }),
  actions: {
    resetAll() {
      this.currentSentenceIndex = 0
      this.currentCharIndex = 0
      this.currentWordIndex = 0
      this.correctWords = 0
      this.currentSentence = this.sentences[this.currentSentenceIndex]
      this.clearTimer()
    },
    startTimer() {
      this.intervalTimer = setInterval(() => {
        this.timer += 1
      }, 1000)
    },
    clearTimer() {
      clearInterval(this.intervalTimer)
      this.timerSaved = this.timer
      this.timer = 0
    },
    async loadNextSentenceRoom() {
      let data = {
        words: null
      };

      data.words = this.roomSentences.sentences[this.roomSentencesIndex].sentence.split(' ').map((word, i) => {
        if (!this.roomSentences.sentences[this.roomSentencesIndex].fill.split(',').map(Number).includes(i)) {
          return {
            chars: [...word].map(char => ({ char, status: 'active', fill: false }))
          }
        } else {
          return {
            chars: [...word].map(char => ({ char: null, status: 'active', fill: true, hide: true, char_correct: char }))
          }
        }
      });

      this.currentSentence = data
      this.currentCharIndex = 0
      this.currentWordIndex = 0
      this.correctWords = 0

      this.roomSentencesIndex += 1

      nextTick(() => {
        document.getElementById('caret').style.left = '0px'
        document.getElementById('caret').style.top = '5px'
      })
    },
    async newTest() {
      if (this.currentSentenceIndex === 10) {
        this.currentSentenceIndex = 0
        await this.loadTest()
        return
      }

      this.currentSentenceIndex += 1
      this.currentCharIndex = 0
      this.currentWordIndex = 0
      this.correctWords = 0
      this.currentSentence = this.sentences[this.currentSentenceIndex]

      document.getElementById('caret').style.left = '0px'
      document.getElementById('caret').style.top = '5px'
    },
    async loadTest(sentence_id) {
      this.roomMode = false
      
      const categoryStore = useFillmeCategory();
      const languangeStore = useLanguange()

      const { $axios } = useNuxtApp();

      try {
        const { data } = (await $axios.get('/fillme/sentence', {
          params: {
            length: categoryStore.home.length,
            category: categoryStore.home.kind,
            limit: 1,
            languange: languangeStore.languange,
            id: sentence_id ?? '',
          },
        })).data;

        this.sentenceInfo.kind = getKind(data.category)
        this.sentenceInfo.length = getLength(data.length)

        categoryStore.home.kind = data.category
        categoryStore.home.length = data.length

        data.words = data.sentence.split(' ').map((word, i) => {
          if (!data.fill.split(',').map(Number).includes(i)) {
            return {
              chars: [...word].map(char => ({ char, status: 'active', fill: false }))
            }
          } else {
            return {
              chars: [...word].map(char => ({ char: null, status: 'active', fill: true, hide: true, char_correct: char }))
            }
          }
        });

        this.currentSentence = data
      } catch (error) {
        console.error(error);
      }
    },
    async loadTestRoom(room_id) {
      this.roomMode = true;

      const { $axios } = useNuxtApp();

      try {
        const { data } = (await $axios.get('/fillme/room/' + room_id)).data;

        data.words = data.sentences[0].sentence.split(' ').map((word, i) => {
          if (!data.sentences[0].fill.split(',').map(Number).includes(i)) {
            return {
              chars: [...word].map(char => ({ char, status: 'active', fill: false }))
            }
          } else {
            return {
              chars: [...word].map(char => ({ char: null, status: 'active', fill: true, hide: true, char_correct: char }))
            }
          }
        });

        this.currentSentence = data
        this.roomSentences = data
        this.roomSentencesLength = data.sentences.length
        this.roomSentencesIndex += 1
      } catch (error) {
        console.error(error);
      }
    },
    async selectSentence(sentence) {
      sentence.words = sentence.sentence.split(' ').map((word, i) => {
        if (!sentence.fill.split(',').map(Number).includes(i)) {
          return {
            chars: [...word].map(char => ({
              char,
              status: 'active',
              fill: false
            }))
          }
        } else {
          return {
            chars: [...word].map(char => ({
              char: null,
              status: 'active',
              fill: true,
              hide: true,
              char_correct: char
            }))
          }
        }
      });

      this.currentSentence = sentence;
      this.clearTimer()
    },
    async handleType(key: any) {
      // If single character permit and backspace
      if (/^[a-zA-Z0-9,.\?"']$/.test(key) || key === 'Backspace') {
        // current words
        const currentWords = this.currentSentence.words[this.currentWordIndex]

        // caret element, current left positon caret
        const elCaret = document.getElementById('caret');
        let currentLeftCaret = parseFloat(elCaret.style.left || 0);
        const currentTopCaret = parseFloat(elCaret.style.top || 0);

        // Handle Backspace
        if (key === 'Backspace') {
          // return
          if (this.currentWordIndex === 0 && this.currentCharIndex === 0) {
            this.currentCharIndex = 0
            return
          } else if (this.currentCharIndex === 0) {
            this.currentWordIndex -= 1
            this.currentCharIndex = this.currentSentence.words[this.currentWordIndex].chars.length - 1
          } else {
            this.currentCharIndex -= 1
          }

          // change to normal color
          this.currentSentence.words[this.currentWordIndex].chars[this.currentCharIndex].status = 'normal'
          this.currentSentence.words[this.currentWordIndex].chars[this.currentCharIndex].hide = true
          if (this.currentSentence.words[this.currentWordIndex].chars[this.currentCharIndex].fill) {
            this.currentSentence.words[this.currentWordIndex].chars[this.currentCharIndex].char = null
          }

          // decrease left position caret
          if (this.currentSentence.words[this.currentWordIndex].chars.length - 1 === this.currentCharIndex) {
            // add mr-2 and margin right 1.5
            currentLeftCaret -= 9.5

            // calculate at last word index
            if (this.currentWordIndex + 1 == this.correctWords) this.correctWords -= 1
          } else {
            currentLeftCaret -= 1.5
          }

          const charEl = document.getElementById('char' + this.currentWordIndex + this.currentCharIndex);
          const charBottom = document.getElementById('char' + this.currentWordIndex + this.currentCharIndex)?.getBoundingClientRect().bottom;

          if (this.prevRectChar.bottom > charBottom) {
            if (this.prevRectChar.bottom !== 0) {
              const { left, top } = this.prevRectChar.beforeLineEnd.find(obj => obj.line === this.currentLine);
              elCaret.style.left = left
              elCaret.style.top = top

              this.currentLine -= 1
            }
          } else if (this.prevRectChar.bottom == charBottom) {
            elCaret.style.left = `${currentLeftCaret - charEl?.offsetWidth ?? 0}px`;
          }

          this.prevRectChar.bottom = charBottom
        } else {
          // Handle Char Actually
          if (currentWords.chars[this.currentCharIndex].char == key || currentWords.chars[this.currentCharIndex].char_correct == key) {
            currentWords.chars[this.currentCharIndex].status = 'correct'
          } else {
            currentWords.chars[this.currentCharIndex].status = 'wrong'
            this.wrongType += 1
          }

          if (!currentWords.chars[this.currentCharIndex].char) {
            currentWords.chars[this.currentCharIndex].char = key
          }

          const charEl = document.getElementById('char' + this.currentWordIndex + this.currentCharIndex);
          // use nexttick to get rendered character after replacing with user input 
          nextTick(() => {
            // set left
            elCaret.style.left = `${currentLeftCaret + charEl?.offsetWidth}px`;
          });

          if (currentWords.chars.length - 1 === this.currentCharIndex) {
            // add mr-2 and margin right 1.5
            if (this.currentSentence.words.length - 1 != this.currentWordIndex) {
              currentLeftCaret += 9.5
            }
          } else {
            currentLeftCaret += 1.5
          }

          // unhide
          currentWords.chars[this.currentCharIndex].hide = false

          if (currentWords.chars.length - 1 == this.currentCharIndex) {
            // moving to next word
            this.currentWordIndex += 1
            this.currentCharIndex = 0

            // calculate at last word index
            if (currentWords.chars.every(v => v.status == 'correct')) {
              this.correctWords += 1
            }

            // redirect after finish
            // single sentence or room
            if (this.correctWords == this.currentSentence.words.length) {
              if (!this.roomMode) {
                this.clearTimer()

                // if user logged save activity
                if (useApp().user.email) {
                  await useApp().addActivity('fillme_do', this.currentSentence.uuid)
                }

                navigateTo('/fillme/result');
              } else {
                if (this.roomSentencesLength == this.roomSentencesIndex){
                  this.clearTimer()
                  navigateTo('/fillme/result');
                }
                this.loadNextSentenceRoom()
              }
            }
          } else {
            // wrong answer
            this.currentCharIndex += 1
          }

          // change new line of sentence
          const charBottom = document.getElementById('char' + this.currentWordIndex + this.currentCharIndex)?.getBoundingClientRect().bottom;

          if (this.prevRectChar.bottom < charBottom && this.prevRectChar.bottom !== 0) {
            this.currentLine += 1

            if (!this.prevRectChar.beforeLineEnd.some(val => val.line === this.currentLine)) {
              this.prevRectChar.beforeLineEnd.push({
                line: this.currentLine,
                left: `${currentLeftCaret - 9.5}px`,
                top: `${currentTopCaret}px`
              })
            }

            if (this.prevRectChar.bottom !== 0) {
              // set
              elCaret.style.top = `${currentTopCaret + 41}px`;
              nextTick(() => {
                const caretEl = document.getElementById('caret');
                if (caretEl) {
                  caretEl.style.left = '0px';
                }
              });
            }
          }

          this.prevRectChar.bottom = charBottom
        }
      } else {
        return
      }
    },
  },
})