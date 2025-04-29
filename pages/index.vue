<script setup>
useHead({
    title: 'Interactive Learning, Endless Fun!'
})
</script>
<template>
    <div>
        <div class="py-10">
            <div class="text-4xl font-medium text-center gh">
                Learn Languages Through Fun & Engaging Games!
            </div>
            <div class="text-base mt-3 text-center ci">
                Catsentence is an interactive platform game for language learning, featuring immersive activities and
                challenges. Practice listening, speaking, and comprehension in a way that feels like play, not study!
            </div>
            <div class="grid grid-cols-7 gap-4 my-6 jk pa-4">
                <div v-for="i in avatars" :key="i">
                    <v-img :src="i" />
                </div>
            </div>
            <div class="text-center ci">
                1,971+ people and counting...
            </div>
        </div>

        <!-- Fillme -->
        <div class="flex">
            <div class="container mx-auto items-center py-4">
                <div class="flex justify-between items-center">
                    <div>
                        <div class="cursor-pointer flex color-second items-center" @click="navigateTo('/')">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" width="24" height="24"
                                viewBox="0 0 24 24">
                                <path fill-rule="evenodd" fill="#00AA45"
                                    d="M11.75 6.406c-1.48 0-1.628.157-2.394.157C8.718 6.563 6.802 5 5.845 5S3.77 5.563 3.77 7.188v1.875c.002.492.18 2 .88 1.597c-.827.978-.91 2.119-.899 3.223c-.223.064-.45.137-.671.212c-.684.234-1.41.532-1.737.744a.75.75 0 0 0 .814 1.26c.156-.101.721-.35 1.408-.585l.228-.075c.046.433.161.83.332 1.19l-.024.013c-.41.216-.79.465-1.032.623l-.113.074a.75.75 0 1 0 .814 1.26l.131-.086c.245-.16.559-.365.901-.545q.12-.064.231-.116C6.763 19.475 9.87 20 11.75 20s4.987-.525 6.717-2.148q.11.052.231.116c.342.18.656.385.901.545l.131.086a.75.75 0 0 0 .814-1.26l-.113-.074a13 13 0 0 0-1.032-.623l-.024-.013c.171-.36.286-.757.332-1.19l.228.075c.687.235 1.252.484 1.409.585a.75.75 0 0 0 .813-1.26c-.327-.212-1.053-.51-1.736-.744a16 16 0 0 0-.672-.213c.012-1.104-.072-2.244-.9-3.222c.7.403.88-1.105.881-1.598V7.188C19.73 5.563 18.613 5 17.655 5c-.957 0-2.873 1.563-3.51 1.563c-.767 0-.915-.157-2.395-.157m-.675 9.194c.202-.069.441-.1.675-.1s.473.031.676.1c.1.034.22.088.328.174a.62.62 0 0 1 .246.476c0 .23-.139.39-.246.476s-.229.14-.328.174c-.203.069-.442.1-.676.1s-.473-.031-.675-.1a1.1 1.1 0 0 1-.329-.174a.62.62 0 0 1-.246-.476c0-.23.139-.39.246-.476s.23-.14.329-.174m2.845-3.1c.137-.228.406-.5.81-.5s.674.272.81.5c.142.239.21.527.21.813s-.068.573-.21.811c-.136.229-.406.501-.81.501s-.673-.272-.81-.5a1.6 1.6 0 0 1-.21-.812c0-.286.068-.574.21-.812m-5.96 0c.137-.228.406-.5.81-.5s.674.272.81.5c.142.239.21.527.21.813s-.068.573-.21.811c-.136.229-.406.501-.81.501s-.673-.272-.81-.5a1.6 1.6 0 0 1-.21-.812c0-.286.068-.574.21-.812"
                                    clip-rule="evenodd" />
                            </svg>
                            <div class="ml-1">
                                <div class="text-sm text-[#212121]">Fillme</div>
                            </div>
                        </div>
                        <div class="text-xl font-medium text-[#0D0D0D]">
                            Learn by fill the blank of the sentence!
                        </div>
                    </div>
                    <div>
                        <button v-ripple style="border: 1px solid rgb(30, 135, 75);"
                            class="bg-[#00AA45] text-white px-3 font-medium flex items-center py-1 rounded-xl text-sm shadow-sm"
                            @click="navigateTo('/fillme')">
                            <div>Play</div>
                            <Icon class="font-bold" width="18" icon="mingcute:right-line" />
                        </button>
                    </div>
                </div>
                <div class="mt-3" style="color: rgb(51, 65, 85);">
                    <div class="mb-2">
                        Learn language by completing blanks in a sentence by racing against time and score,
                        achieve
                        the best time to get big prizes.
                    </div>
                </div>
                <div class="mt-6">
                    <v-img class="rounded-lg" aspect-ratio="4/3"
                        src="https://ik.imagekit.io/uvma3bkbp/Screenshot%202025-03-22%20124526_witLdUTCw.png?updatedAt=1742622344948" />
                </div>
                <div class="flex flex-col gap-4 mt-8">
                    <div v-for="item in fillme" class="grid sm:grid-cols-2 gap-6">
                        <div>
                            <div class="text-lg font-medium text-[#0D0D0D]">
                                {{ item.title }}
                            </div>
                            <div class="mb-2" style="color: rgb(51, 65, 85);">
                                {{ item.desc }}
                            </div>
                        </div>
                        <div>
                            <v-img class="rounded-lg" aspect-ratio="16/9" :height="$vuetify.display.smAndUp ? 160 : 180"
                                cover :src="item.img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- FAQ -->
        <div>
            <div class="flex justify-between items-center">
                <div>
                    <div class="cursor-pointer flex color-second items-center" @click="navigateTo('/')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd" fill="#00AA45"
                                d="M11.75 6.406c-1.48 0-1.628.157-2.394.157C8.718 6.563 6.802 5 5.845 5S3.77 5.563 3.77 7.188v1.875c.002.492.18 2 .88 1.597c-.827.978-.91 2.119-.899 3.223c-.223.064-.45.137-.671.212c-.684.234-1.41.532-1.737.744a.75.75 0 0 0 .814 1.26c.156-.101.721-.35 1.408-.585l.228-.075c.046.433.161.83.332 1.19l-.024.013c-.41.216-.79.465-1.032.623l-.113.074a.75.75 0 1 0 .814 1.26l.131-.086c.245-.16.559-.365.901-.545q.12-.064.231-.116C6.763 19.475 9.87 20 11.75 20s4.987-.525 6.717-2.148q.11.052.231.116c.342.18.656.385.901.545l.131.086a.75.75 0 0 0 .814-1.26l-.113-.074a13 13 0 0 0-1.032-.623l-.024-.013c.171-.36.286-.757.332-1.19l.228.075c.687.235 1.252.484 1.409.585a.75.75 0 0 0 .813-1.26c-.327-.212-1.053-.51-1.736-.744a16 16 0 0 0-.672-.213c.012-1.104-.072-2.244-.9-3.222c.7.403.88-1.105.881-1.598V7.188C19.73 5.563 18.613 5 17.655 5c-.957 0-2.873 1.563-3.51 1.563c-.767 0-.915-.157-2.395-.157m-.675 9.194c.202-.069.441-.1.675-.1s.473.031.676.1c.1.034.22.088.328.174a.62.62 0 0 1 .246.476c0 .23-.139.39-.246.476s-.229.14-.328.174c-.203.069-.442.1-.676.1s-.473-.031-.675-.1a1.1 1.1 0 0 1-.329-.174a.62.62 0 0 1-.246-.476c0-.23.139-.39.246-.476s.23-.14.329-.174m2.845-3.1c.137-.228.406-.5.81-.5s.674.272.81.5c.142.239.21.527.21.813s-.068.573-.21.811c-.136.229-.406.501-.81.501s-.673-.272-.81-.5a1.6 1.6 0 0 1-.21-.812c0-.286.068-.574.21-.812m-5.96 0c.137-.228.406-.5.81-.5s.674.272.81.5c.142.239.21.527.21.813s-.068.573-.21.811c-.136.229-.406.501-.81.501s-.673-.272-.81-.5a1.6 1.6 0 0 1-.21-.812c0-.286.068-.574.21-.812"
                                clip-rule="evenodd" />
                        </svg>
                        <div class="ml-1">
                            <div class="text-sm text-[#212121]">FAQ</div>
                        </div>
                    </div>
                    <div class="text-xl font-medium text-[#0D0D0D]">
                        Frequently Asked Questions
                    </div>
                </div>
            </div>
            <v-expansion-panels v-model="faq" class="my-4" flat variant="accordion">
                <v-expansion-panel v-for="v in faqItems" :key="i" :text="v.text" :title="v.title"></v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            avatars: [],
            faq: [0,1,2,3,4,5],
            fillme: [
                {
                    title: 'Customize your theme',
                    desc: 'Learn with different theme style as you want, currently support more than 6 theme.',
                    img: 'https://ik.imagekit.io/uvma3bkbp/image_kTKyUATsq.png?updatedAt=1743078280187'
                },
                {
                    title: 'Search for Kind',
                    desc: 'Search for a sentence that you want to find by kind and length.',
                    img: 'https://ik.imagekit.io/uvma3bkbp/image_9MKtWZrNj.png?updatedAt=1743079920805'
                },
                {
                    title: 'Submit your sentence',
                    desc: 'Share your ideas, contribute to the challenge, and make more engaging for everyone.',
                    img: 'https://ik.imagekit.io/uvma3bkbp/image(1)_U6_IJzCQ0.png?updatedAt=1743080098866'
                }
            ],
            faqItems: [
                {
                    title: 'Is it free?',
                    text: 'Yes, you can play our applications and all platforms for free without any monthly fees like subscriptions.',
                },
                {
                    title: 'How can i remove the ads?',
                    text: 'To remove ads on our platform, you can visit the remove ads page, then you can pay $3 or IDR 25 thousand to remove ads, after you pay that, the ads will no longer be displayed on your account.',
                },
                {
                    title: 'What is Fillme?',
                    text: 'Fillme is a fun game platform where you can fill in the blanks in a sentence, with that you can learn a language, you can also create your own questions and rooms that you can manage yourself.',
                },
                {
                    title: 'What is Hearme?',
                    text: 'Hearme is a game platform based on improving your listening skills, we use YouTube video clips as the media for questions, your task is simply to listen to a video and then answer the questions provided.  ',
                },
                {
                    title: 'What is CraftMe?',
                    text: 'CraftMe is a fun platform for composing random words that you have to arrange to form a cohesive sentence.',
                }
            ]
        };
    },
    async mounted() {
        await this.getAvatars();
    },
    methods: {
        toSSo() {
            window.open("https://sso-dev.catsentence.com")
        },
        getAvatars(count = 21) {
            this.avatars = Array.from({ length: count }, () => {
                const seed = Math.random().toString(36).substring(2, 10); // Generate random seed
                return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
            });
        },
    }
}
</script>
<style scoped>
.gh {
    font-family: "Playpen Sans", cursive;
}

.ci {
    color: rgb(51, 65, 85);
}

.jk {
    box-shadow: rgb(204, 219, 232) 1px 1px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}

:deep .v-expansion-panel-title {
    padding: 0 4px !important;
}

:deep .v-expansion-panel-text__wrapper {
    padding: 8px 8px !important;
}
</style>