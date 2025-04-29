<template>
    <div class="py-10 sm:py-0">
        <div class="mb-1 flex items-center color-second">
            <div class="text-xl">Leaderboard</div>
        </div>
        <div class="text-sm mb-5 color-nextu">Rank leaderboard for all user counted by their points.</div>
        <v-data-table :mobile="$vuetify.display.mobile" :loading="loading" :headers="headers" :items="data"
            style="background: transparent;" class="color-nextu">
            <template #item.no="{ index }">
                <div class="flex" :class="$vuetify.display.mobile ? 'justify-end' : ''">
                    <div v-if="index <= 2">
                        <v-img height="40" width="40" :src="'/rank' + index + '.svg'" />
                    </div>
                    <div v-else class="font-semibold text-lg">{{ index + 1 }}</div>
                </div>
            </template>
            <template #item.total_time="{ value }">
                {{ formatTime(value) }}
            </template>
            <template #item.name="{ value }">
                <span class="text-md font-medium">{{ value }}</span>
            </template>
            <template #item.total_point="{ value }">
                <div class="text-base underline">
                    {{ value }}
                </div>
            </template>
            <template #loading>
                <span>Loading the leaderboard...</span>
            </template>
            <template #bottom />
        </v-data-table>
    </div>
</template>
<script>
import { useLanguange } from '~/store/languange';

export default {
    setup() {
        definePageMeta({
            layout: "app",
            prerender: false,
            ssr: false
        });

        useHead({
            title: 'Leaderboard Fillme'
        })
    },
    data() {
        return {
            result: {},
            languangeStore: useLanguange(),
            resultSaved: false,
            loadingSaveResult: false,
            loadingReport: false,
            loading: false,
            headers: [
                { title: 'No', align: 'start', key: 'no' },
                { title: 'Name', align: 'start', key: 'name' },
                { title: 'Total Sentence', align: 'end', key: 'played' },
                { title: 'Total Time', align: 'end', key: 'total_time' },
                { title: 'Point', align: 'center', key: 'total_point' },
            ],
            data: []
        }
    },
    mounted() {
        this.loadLeaderboard()
    },
    methods: {
        formatTime(seconds) {
            const m = Math.floor(seconds / 60), s = seconds % 60;
            return (m ? `${m} minute${m > 1 ? 's' : ''} ` : '') + `${s} second${s !== 1 ? 's' : ''}`;
        },
        async loadLeaderboard() {
            this.loading = true

            try {
                const data = await axios.get('/fillme/leaderboard');
                this.data = data.data.data
            } catch (err) {
                console.log(err);
            }
            this.loading = false
        }
    }
}
</script>
<style></style>