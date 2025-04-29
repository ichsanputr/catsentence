<template>
    <div class="my-10 flex justify-center gap-6 color-nextu">
        <v-snackbar v-model="toast.success" color="success" timeout="3000">
            <div class="flex items-center">
                <Icon width="20" icon="tabler:circle-check" class="text-[#688E8F]" />
                <div class="ml-1">Your sentence submitted!</div>
            </div>
        </v-snackbar>
        <v-snackbar v-model="toast.error" color="red-lighten-1">
            <div class="flex items-center">
                <Icon width="20" icon="mi:circle-error" class="text-[#FA4032]" />
                <div class="ml-1">There was something error!</div>
            </div>
        </v-snackbar>
        <div class="w-3/4">
            <div class="flex justify-between">
                <div class="mb-2 flex items-center color-second">
                    <Icon :width="$vuetify.display.mobile ? 20 : 24" icon="entypo:text" />
                    <div class="text-xl ml-1">Public Room</div>
                </div>
            </div>
            <div class="text-sm mb-2">A room is a custom set of sentences you can create without categories. View its
                leaderboard and set it as public or private.</div>
            <div class="flex flex-col gap-3 my-6">
                <client-only>
                    <v-infinite-scroll mode="manual" :height="400" :items="results" @load="getRoom" class="-mt-6 gap-3">
                        <div v-for="(item, i) in roomList" @click="selectRoom(item)"
                            class="cursor-pointer rounded-lg px-3 bg-primer py-2 text-sm color-nextu flex items-center">
                            <div class="flex items-center flex-1 mr-6">
                                <div
                                    class="mr-4 relative flex-none text-xs font-light bg-[#9A7A61] text-white w-[28px] flex items-center justify-center h-[28px] rounded-full">
                                    {{ i + 1 }}
                                </div>
                                <div>
                                    <div class="line-clamp-1 font-medium">{{ item.name }}</div>
                                    <div class="line-clamp-1">{{ item.description }}</div>
                                </div>
                            </div>
                            <div class="flex-none flex flex-col gap-1 justify-center items-center">
                                <div class="flex justify-end gap-2 w-full">
                                    <v-btn @click="navigateTo('/fillme/room/' + item.room_id)" icon size="24px"
                                        elevation="0" color="transparent">
                                        <v-tooltip activator="parent" location="bottom">Play Room</v-tooltip>
                                        <Icon width="22" icon="si:arrow-right-fill" />
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                        <template v-slot:load-more="{ props }">
                            <v-btn class="mt-1" size="small" variant="text" v-bind="props">Load More...</v-btn>
                        </template>
                        <template v-slot:empty>
                            <div class="text-sm">No more result...</div>
                        </template>
                        <template #loading>
                            <div class="text-center">
                                <v-progress-circular indeterminate color="primary" size="24" />
                            </div>
                        </template>
                    </v-infinite-scroll>
                </client-only>
            </div>
        </div>
    </div>
</template>
<script setup>
import copyToClipboard from '@/utils/copy';

useHead({
    title: 'Room'
})

definePageMeta({
    layout: "app",
    prerender: false,
    ssr: false
});
</script>
<script>
export default {
    data() {
        return {
            requiredRules: [
                (value) => !!value || 'This field is required.',
            ],
            sentenceRules: [
                (value) => !!value || 'This field is required.',
                (value) => value.split(' ').filter(word => word.trim().length > 0).length > 4 || 'Minimum 4 words.'
            ],
            fillRules: [
                (value) => (value && value.length > 0) || 'This field is required.',
            ],
            formSubmit: null,
            form: {
                kindCategory: null,
                languange: null,
                lengthCategory: null,
                sentence: '',
                fill: []
            },
            loading: false,
            offset: 0,
            selectedRoom: null,
            roomList: [],
            toast: {
                success: false,
                error: false,
            },
        }
    },
    async mounted() {
        await this.getRoom()
    },
    methods: {
        async getRoom(state) {
            try {
                const { data } = await axios.get('/fillme/room/public?limit=10&offset=' + this.offset);
                this.roomList = this.roomList.concat(data.data)
                this.selectedRoom = this.roomList[0]

                if (!data.data.length > 0) {
                    state.done('empty')
                } else {
                    this.offset += 10
                    state.done('ok')
                }
            } catch (error) {
                state.done('empty')
                console.error(error)
            }
        },
        selectRoom(id) {
            this.selectedRoom = id
        }
    }
}
</script>

<style scoped>
:deep .v-label.v-field-label {
    font-size: 14px;
}
</style>