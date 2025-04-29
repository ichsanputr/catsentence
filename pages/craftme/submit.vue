<template>
  <div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 color-nextu">
    <v-snackbar v-model="toast.success" color="success" timeout="3000" >
      <div class="flex items-center">
        <Icon width="20" icon="tabler:circle-check" class="text-[#688E8F]" />
        <div class="ml-1">Your question submitted!</div>
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
      <div class="text-sm mb-2">The question that you send will automatically enter into our application and can
        be
        answered by all users, so make sure you create good question ya.
      </div>
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
        <v-select v-model="form.category" density="compact" variant="outlined" :items="category"
          :rules="requiredRules" item-value="value" item-title="title" label="Category" />
        <v-textarea v-model.trim="form.text" :rules="requiredRules" label="Your Question" density="compact"
          row-height="15" rows="4" variant="outlined" @update:model-value="updateSentence" />
        <v-btn :loading="loading" elevation="0" class="uppercase bg-second text-white"
          @click="addQuestion">Submit</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      layout: "craftme",
      prerender: false,
      ssr: false
    });

    useHead({
      title: 'Submit A Question Craftme'
    })
  },
  data() {
    return {
      requiredRules: [
        (value) => !!value || 'This field is required.',
      ],
      formSubmit: null,
      form: {
        languange: null,
        category: null,
        text: '',
        fill: []
      },
      loading: false,
      toast: {
        success: false,
        error: false,
      },
      category: [
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
  methods: {
    async addQuestion() {
      const { valid } = await this.$refs.formSubmit.validate();
      if (!valid) return;

      this.loading = true

      try {
        await axios.post('/craftme/question', {
          text: this.form.text,
          category: this.form?.category, // Ensure this matches your form property
          languange: this.form?.languange // Note that 'language' is spelled 'languange' in your backend
        });

        this.loading = false
        this.toast.success = true

        this.$refs.formSubmit.items[2].reset()
      } catch (error) {
        console.log(error)
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