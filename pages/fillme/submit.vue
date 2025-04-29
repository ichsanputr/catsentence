<template>
  <div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 color-nextu">
    <v-snackbar v-model="toast.success" color="success" timeout="3000" >
      <div class="flex items-center">
        <Icon width="20" icon="tabler:circle-check" class="text-[#688E8F]" />
        <div class="ml-1">Your sentence submitted!</div>
      </div>
    </v-snackbar>
    <v-snackbar v-model="toast.error" color="red-lighten-1" >
      <div class="flex items-center">
        <Icon width="20" icon="mi:circle-error" class="text-[#FA4032]" />
        <div class="ml-1">There was something error!</div>
      </div>
    </v-snackbar>
    <div>
      <div class="mb-2 flex items-center color-second">
        <Icon width="20" icon="heroicons-outline:information-circle" />
        <div class="text-xl ml-1">Information</div>
      </div>
      <div class="text-sm mb-2">The sentences you send will automatically enter our application and can
        be
        answered by all users, so make sure you create good sentences along with good question words too.
      </div>
      <div class="text-sm mb-2">There are some rules that you should follow when writing the sentence.
      </div>
      <ul class="text-sm list-decimal ml-4">
        <li class="text-sm mb-1">Make sure you are logged in because users will be able to see the author of the
          sentence.</li>
        <li class="text-sm mb-1">Select the appropriate sentence category type</li>
        <li class="text-sm mb-1">The length category will be adjusted by the system itself.</li>
        <li class="text-sm mb-1">You can choose 2 words for short type, 4 words for medium type, and 6 words for long
          type.</li>
      </ul>
    </div>
    <div>
      <v-form ref="formSubmit" v-model="isValid">
        <v-select v-model="form.languange" density="compact" variant="outlined" item-title="name" item-value="key"
          class="mt-1" label="Choose Languange" :items="languanges">
          <template #item="{ props, item }">
            <v-list-item v-bind="props" :prepend-avatar="item.raw.avatar" :subtitle="item.raw.group"
              :title="item.raw.name">
              <template #prepend>
                <v-avatar size="26">
                  <img :src="item.raw.avatar" alt="Avatar">
                </v-avatar>
              </template>
            </v-list-item>
          </template>
        </v-select>
        <v-select v-model="form.kindCategory" density="compact" variant="outlined" :items="kindCategory"
          :rules="requiredRules" item-value="value" item-title="title" label="Kind Category" />
        <v-select v-model="form.lengthCategory" readonly :rules="requiredRules" density="compact" variant="outlined"
          :items="lengthCategory" label="Length Category" />
        <v-textarea v-model="form.sentence" :rules="sentenceRules" label="Your Sentence" density="compact"
          row-height="15" rows="4" variant="outlined" @update:model-value="updateSentence" />
        <v-select v-model="form.fill" :rules="fillRules" :disabled="disabledFill" density="compact" variant="outlined"
          :items="fillWords" item-title="title" item-value="key" :max-items="3" chips multiple label="Question Words"
          clearable @update:model-value="popFillWords" />
        <v-btn :loading="loading" elevation="0" class="uppercase bg-second text-white"
          @click="addSentence">Submit</v-btn>
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
      title: 'Submit A Sentence Fillme'
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
      toast: {
        success: false,
        error: false,
      },
      kindCategory: [
        {
          title: 'Story',
          value: 1
        },
        {
          title: 'News',
          value: 2
        },
        {
          title: 'Conversation',
          value: 3
        },
        {
          title: 'Quotes',
          value: 4
        },
        {
          title: 'All',
          value: 5
        }
      ],
      lengthCategory: [
        {
          title: 'Short',
          value: 1
        }, {
          title: 'Medium',
          value: 2
        }, {
          title: 'Long',
          value: 3
        }
      ],
      languanges: [
        {
          name: "English",
          key: 1,
          avatar: "https://ik.imagekit.io/uvma3bkbp/emojione--flag-for-united-kingdom_bMZ3KPVF61.svg?updatedAt=1736655969361"
        },
        {
          name: "Spanish",
          key: 2,
          avatar: "https://ik.imagekit.io/uvma3bkbp/emojione--flag-for-spain_RMd9YupvO.svg?updatedAt=1736655969418"
        },
        {
          name: "Indonesia",
          key: 3,
          avatar: "https://ik.imagekit.io/uvma3bkbp/emojione--flag-for-indonesia_CyFL1-BCi.svg?updatedAt=1736655969778"
        }
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
    popFillWords() {
      if (this.form.lengthCategory == 1) {
        if (this.form.fill.length == 3) {
          this.form.fill.pop()
        }
      }

      if (this.form.lengthCategory == 2) {
        if (this.form.fill.length == 5) {
          this.form.fill.pop()
        }
      }

      if (this.form.lengthCategory == 3) {
        if (this.form.fill.length == 7) {
          this.form.fill.pop()
        }
      }
    },
    async addSentence() {
      const { valid } = await this.$refs.formSubmit.validate();
      if (!valid) return;

      this.loading = true

      // remove multiple whitespace
      this.form.sentence = this.form.sentence?.trim().replace(/\s+/g, ' ');

      try {
        await axios.post('/fillme/sentences', {
          sentence: this.form.sentence,
          fill: this.form?.fill?.join(','),
          length_category: this.form?.length_category, // Ensure this matches your form property
          kind_category: this.form?.kind_category, // Ensure this matches your form property
          languange: this.form?.languange // Note that 'language' is spelled 'languange' in your backend
        });

        this.loading = false
        this.toast.success = true

        this.$refs.formSubmit.items[2].reset()
        this.$refs.formSubmit.items[3].reset()
        this.$refs.formSubmit.items[4].reset()
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