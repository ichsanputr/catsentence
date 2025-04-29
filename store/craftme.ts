// @ts-nocheck
/* 
Store file for craftme app
*/
import { defineStore } from 'pinia'
import { useFillmeCategory } from '~/store/fillmeCategory';
import { useLanguange } from '~/store/languange';
import { nextTick } from 'vue';
import { navigateTo } from '#app';
import { useApp } from '~/store/app';
import getKind from '@/utils/getKind';
import getLength from '@/utils/getLength';

export const useCraftme = defineStore('craftme', {
  state: () => ({
    user: null,
    question: {
      text: ""
    },
    timer: 0,
    timerSaved: 0,
    intervalTimer: null,
    sentences: [],
    correctWords: 0,
    wrong: 0,
    currentLine: 0,
    menu: {
      category: 1,
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
    async loadQuestion() {      
      const languangeStore = useLanguange()
      const { $axios } = useNuxtApp();

      try {
        const { data } = (await $axios.get('/craftme/question', {
          params: {
            category: this.menu.category,
            limit: 1,
            languange: languangeStore.languange,
          },
        })).data;

        this.menu.category = data.category
        this.question = data

        this.startTimer()
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
    async changeMenu(category){
      this.menu.category = category
      await this.loadQuestion()
    }
  },
})