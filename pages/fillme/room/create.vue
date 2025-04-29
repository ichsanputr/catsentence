<template>
    <div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 color-nextu">
        <v-snackbar v-model="toast.success" color="success" timeout="3000">
            <div class="flex items-center">
                <Icon width="20" icon="tabler:circle-check" />
                <div class="ml-1">Your sentence submitted!</div>
            </div>
        </v-snackbar>
        <v-snackbar v-model="toast.error" color="red-lighten-1">
            <div class="flex items-center">
                <Icon width="20" icon="mi:circle-error" class="text-[#FA4032]" />
                <div class="ml-1">There was something error!</div>
            </div>
        </v-snackbar>
        <div>
            <div class="flex justify-between">
                <div class="mb-2 flex items-center color-second">
                    <Icon :width="$vuetify.display.mobile ? 20 : 24" icon="zondicons:list-add" />
                    <div class="text-xl ml-1">Create Room</div>
                </div>
            </div>
            <div class="text-sm mb-2">You can add at least 3 questions to your room, make it public or private. Once
                the room is created you can monitor the leaderboard for that room.
            </div>
            <v-form ref="formSubmit" class="text-sm mt-4">
                <div class="mb-2">Room Name <span class="text-red">*</span></div>
                <v-text-field :rules="[requiredRules]" v-model="formSubmit.name" color="#00AA45" variant="outlined"
                    density="compact" placeholder="Enter room name.." />
                <div class="mb-2">Room Description <span class="text-red">*</span></div>
                <v-textarea v-model="formSubmit.description" :rules="[requiredRules]" label="Room Description"
                    density="compact" row-height="4" rows="3" variant="outlined" />
                <div class="mb-2">Languange <span class="text-red">*</span></div>
                <v-select v-model="formSubmit.lang" :rules="requiredRules" density="compact" variant="outlined" :items="lang"
                    item-title="title" item-value="title" label="Languange">
                    <template #item="{ props, item }">
                        <v-list-item class="bg-main py-0 text-sm color-nextu" v-bind="props" :subtitle="item.raw.group"
                            :title="item.title">
                        </v-list-item>
                    </template>
                </v-select>
                <v-checkbox density="compact" v-model="is_private" hide-details>
                    <template #label>
                        <span style="font-size: 14px;">Is Private Room?</span>
                    </template>
                </v-checkbox>
            </v-form>
            <div class="flex flex-col gap-3 my-6">
                <div v-for="(item, i) in sentences"
                    class="cursor-pointer rounded-lg px-3 bg-primer py-2 text-sm color-nextu flex items-center">
                    <div class="flex items-center flex-1 mr-6">
                        <div
                            class="mr-3 relative flex-none text-xs font-light bg-[#9A7A61] text-white w-[28px] flex items-center justify-center h-[28px] rounded-full">
                            {{ i + 1 }}
                        </div>
                        <div class="line-clamp-1">{{ item.sentence }}</div>
                    </div>
                    <div class="flex-none flex flex-col gap-1 justify-center items-center">
                        <div class="flex justify-end gap-2 w-full">
                            <v-btn icon size="24px" elevation="0" color="transparent">
                                <v-tooltip activator="parent" location="bottom">Remove Sentence</v-tooltip>
                                <Icon width="20" color="#D71313" icon="qlementine-icons:close-12" />
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end" v-if="sentences.length > 0">
                <v-btn elevation="0" color="transparent" class="uppercase text-[#688E8F]" @click="">Back</v-btn>
                <v-btn :loading="loading" elevation="0" class="uppercase bg-second text-white"
                    @click="submitRoom">Submit</v-btn>
            </div>
        </div>
        <div>
            <v-form ref="formAdd" v-model="isValid">
                <v-textarea v-model="form.sentence" :rules="sentenceRules" label="Your Sentence" density="compact"
                    row-height="15" rows="4" variant="outlined" @update:model-value="updateSentence" />
                <v-select v-model="form.fill" :rules="fillRules" :disabled="disabledFill" density="compact"
                    variant="outlined" :items="fillWords" item-title="title" item-value="key" :max-items="3" chips
                    multiple label="Question Words" clearable @update:model-value="popFillWords">
                    <template #item="{ props, item }">
                        <v-list-item class="bg-main py-0 color-nextu" v-bind="props" :subtitle="item.raw.group"
                            :title="item.title">
                        </v-list-item>
                    </template>
                </v-select>
                <v-btn elevation="0" class="float-right uppercase bg-second text-white" @click="addSentence">Add</v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        definePageMeta({
            layout: "app",
            prerender: false,
            ssr: false
        });

        useHead({
            title: 'Create Room'
        })
    },
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
                (value) => {
                    const totalWords = (this.form.sentence || '').trim().split(/\s+/).length;
                    return value.length < totalWords || 'You cannot select all the words.';
                }
            ],
            formAdd: null,
            formSubmit: {
                name: null,
                description: null,
                lang: null,
            },
            form: {
                sentence: '',
                fill: []
            },
            loading: false,
            toast: {
                success: false,
                error: false,
            },
            sentences: [],
            is_private: 0,
            lang: [
                {
                    title: "English"
                },
                {
                    title: "Spanish"
                },
                {
                    title: "Indonesia"
                },
            ]
        }
    },
    computed: {
        fillWords() {
            return this.form.sentence
                ?.trim()
                ?.split(/\s+/)
                .map((word, index) => ({
                    key: index,
                    title: word,
                }));
        },
        disabledFill() {
            return this.form.sentence?.length == 0
        }
    },
    methods: {
        updateSentence() {
            if (!this.form.sentence) return

            if (this.form.sentence.trim().length == 0) {
                this.form.lengthCategory = null
            } else if (this.form.sentence.trim().length != 0 && this.form.sentence.trim().length > 0 && this.form.sentence.trim().length < 60) {
                this.form.lengthCategory = 1
            } else if (this.form.sentence.trim().length != 0 && this.form.sentence.trim().length > 60 && this.form.sentence.trim().length < 120) {
                this.form.lengthCategory = 2
            } else {
                this.form.lengthCategory = 3
            }

            if (!this.form.sentence) this.form.fill = [];
        },
        async addSentence() {
            const { valid } = await this.$refs.formAdd.validate();
            if (!valid) return;

            this.sentences.push({
                sentence: this.form.sentence.trim(),
                fill: this.form.fill
            })

            this.$refs.formAdd.items[0].reset()
            this.$refs.formAdd.items[1].reset()
        },
        async submitRoom() {
            this.loading = true

            try {
                await axios.post('/fillme/room', {
                    name: this.formSubmit.name,
                    description: this.formSubmit.description,
                    lang: this.formSubmit.lang,
                    is_private: this.is_private,
                    sentences: this.sentences,
                });

                this.loading = false
                this.toast.success = true

                this.$refs.formAdd.items[0].reset()
                this.$refs.formAdd.items[1].reset()
                this.$refs.formSubmit.items[0].reset()
                this.$refs.formSubmit.items[1].reset()

                this.sentences = []

                setTimeout(() => {
                    navigateTo('/fillme/room')
                }, 2000)
            } catch (error) {
                setTimeout(() => {
                    this.loading = false
                    this.toast.error = true
                }, 1000);
                console.error(error)
            }

            this.loading = false
        }
    }
}
</script>

<style scoped>
:deep .v-label.v-field-label {
    font-size: 14px;
}
</style>