<script setup>
import { useApp } from '~/store/app';
import { ref, onMounted } from 'vue';
import { useDateFormat } from '@vueuse/core';

useHead({
  title: 'Profile'
})

const { $axios } = useNuxtApp();

const showContent = ref(false)
const offset = ref(0)
const length = ref(15)
const tab = ref(null)
const items = ref([
  'Result', 'Activity', 'Reward', 'Payment',

])

const results = ref([])

onMounted(async () => {
  await useApp().getProfile()
  await getResult()

  showContent.value = true
})

async function getResult(state) {
  try {
    const { data } = await $axios.get('/profile/result?limit=10&offset=' + offset.value);
    results.value = results.value.concat(data.data)

    if (!data.data.length > 0) {
      state.done('empty')
    } else {
      offset.value += 10
      state.done('ok')
    }
  } catch (err) {
    console.log(err);
  }
}

function sentenceId(uuid) {
  if (!uuid) return ''; // return an empty string if uuid is null or undefined
  return `${uuid.slice(0, 3)}..${uuid.slice(-3)}`;
}

function toSentence(id) {
  navigateTo('/fillme?id=' + id)
}

watch(length, (val) => {
  tab.value = val - 1;
});

watch(tab, async (val) => {
  if (val == 'Result' && !results.value) {
    await getResult()
  }
});
</script>
<template>
  <div class="my-10">
    <div class="text-base mt-3 ci flex flex-col gap-4">
      <div class="sm:cardku w-full mx-auto sm:pa-6 rounded-xl">
        <v-skeleton-loader class="mx-auto rounded-full" width="72" type="avatar" v-if="!showContent"></v-skeleton-loader>
        <v-img width="72" height="72" cover class="mx-auto shadow-md" rounded="full" v-else
          :src="useApp().user.pic_url ?? 'https://dqy38fnwh4fqs.cloudfront.net/website/emptyDP.png'"
          lazy-src="https://dqy38fnwh4fqs.cloudfront.net/website/emptyDP.png"></v-img>

        <v-skeleton-loader class="mx-auto h-3 mb-2" max-width="300" v-if="!showContent"></v-skeleton-loader>
        <div v-else class="text-lg text-center font-medium mt-3">{{ useApp().user.name ?? 'Anonymous User' }}</div>
        <v-skeleton-loader class="mx-auto h-3" max-width="200" v-if="!showContent"></v-skeleton-loader>
        <div v-else class="text-sm text-center">{{ useApp().user.email ?? 'Please login first..' }}</div>

        <v-card flat class="mt-8 w-full flex justify-center" fluid>
          <div>
            <v-tabs class="nk sm:w-full" density="compact" v-model="tab" align-tabs="center">
              <v-tab v-for="n in items" :key="n" :text="`${n}`" :value="n"></v-tab>
            </v-tabs>
          </div>

          <div v-if="useApp().user.email" class="mt-6 text-sm text-center">No data available..</div>
          <v-tabs-window v-model="tab" v-else="useApp().user.email">
            <v-tabs-window-item key="Result" value="Result">
              <v-card>
                <v-card-text class="flex flex-col px-0 gap-4">
                  <client-only>
                    <v-infinite-scroll mode="manual" :height="results.length > 0 ? 300 : null" :items="results" @load="getResult"
                      class="px-3 -mt-4 gap-3">
                      <div v-for="r in results" class="flex justify-between items-center gap-8">
                        <div>
                          <div class="capitalize font-semibold">
                            <span class="t-shape"></span>
                            {{ r.source }}
                          </div>
                          <div class="line-clamp-2 text-sm mt-2">
                            Complete the <v-tooltip :text="r.sentence_id">
                              <template v-slot:activator="{ props }">
                                <span @click="toSentence(r.sentence_id)" v-bind="props"
                                  class="text-[#7886C7] cursor-pointer">{{ sentenceId(r.sentence_id) }}</span>
                              </template>
                            </v-tooltip> sentence within {{ r.time }} seconds and {{ r.wrong }} wrong type at <span
                              class="italic">{{
                                useDateFormat(r.created_at, 'DD MMM YYYY - HH:MM:ss') }}</span>
                          </div>
                        </div>
                        <div>
                          <div
                            class="bg-[#7886C7] w-8 text-xs h-8 flex justify-center items-center text-white rounded-full">
                            +{{ r.total_point }}
                          </div>
                        </div>
                      </div>
                      <template v-slot:load-more="{ props }">
                        <v-btn class="mt-1" size="small" variant="text" v-bind="props">Load More...</v-btn>
                      </template>
                      <template v-slot:empty>
                        No more result...
                      </template>
                    </v-infinite-scroll>
                  </client-only>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item key="Activity" value="Activity">
              <v-card>
                <v-card-text>
                  Lorem ipsum dolnsequat.
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item key="Reward" value="Reward">
              <v-card>
                <v-card-text>
                  Lorem ipsum dolnsequat.
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item key="Activity" value="Activity">
              <v-card>
                <v-card-text>
                  Lorem ipsum dolnsequat.
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item key="Payment" value="Payment">
              <v-card>
                <v-card-text>
                  Lorem ipsum.
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </div>
    </div>
  </div>
</template>
<style scoped>
.jh {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
}

.cardku {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border: 1px solid #E2E8F0;
}

.nk {
  color: rgb(100, 116, 139);
}

.divider-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.t-shape {
  display: inline-block;
  position: relative;
  width: 8px;
  /* Lebar bagian tengah "T" */
  height: 1.5px;
  /* Tinggi bagian tengah "T" */
  background-color: #00AA45;
  margin-bottom: 5px;
  border-radius: 10px;
}

.t-shape::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 3%;
  /* Mulai dari tengah, agar sebelah kiri hilang */
  width: 1.5px;
  /* Lebar bagian horizontal "T" */
  height: 8px;
  /* Tinggi bagian horizontal "T" */
  background-color: #00AA45;
  border-radius: 10px;
}

.line {
  flex: 1;
  border-bottom: 1px solid #00AA45;
}

.text {
  font-size: 14px;
  margin: 0 10px;
  white-space: nowrap;
  color: #333;
  /* Change this to match your theme */
}

@media (max-width: 320px) {
  .nk {
    width: 300px;
  }
}

@media (max-width: 400px) {
  .nk {
    width: 320px;
  }
}
</style>