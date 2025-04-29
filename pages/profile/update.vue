<script setup>
import { useApp } from '~/store/app';
import { useRouter } from "vue-router";

useHead({
  title: 'Update Profile'
})

const { $axios } = useNuxtApp();

const router = useRouter();

const form = reactive({
  name: null,
  email: null,
  password: null,
  pic_url: null,
})

const formUpload = reactive({
  file: null,
  file_name: null,
  mime_type: null,
})

const confirmPassword = ref(null);
const formSubmit = ref(null);
const fileInput = ref(null);
const loading = ref(false);

const defaultImage = "https://dqy38fnwh4fqs.cloudfront.net/website/emptyDP.png";

const requiredRule = (v) => !!v || 'Field is required'
const confirmPasswordRule = (value) =>
  value === form.password || "Passwords do not match";

const triggerFileInput = () => {
  fileInput.value.click();
};

const uploadImage = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    form.pic_url = e.target.result;
    formUpload.file = e.target.result;

    formUpload.file_name = file.name;
    formUpload.mime_type = file.type;
  };
  reader.readAsDataURL(file);
};

async function updateProfile() {
  const { valid } = await formSubmit.value.validate();
  if (!valid) return

  loading.value = true
  if (formUpload.file) await sendImage();

  try {
    await $axios.put('/profile/update', form);

    useApp().toast.message = "Profile updated!"
    useApp().toast.color = "success"
    useApp().toast.state = true
  } catch (err) {
    console.log(err);
  }

  loading.value = false
}

async function sendImage() {
  try {
    const { data } = await $axios.post('/media', formUpload);
    form.pic_url = data.data.pic_url
  } catch (err) {
    console.log(err);
  }

  loading.value = false
}

onMounted(() => {
  Object.assign(form, { ...useApp().user });
})

watch(useApp().user, ({ name, email, pic_url }) => {
  Object.assign(form, { name, email, pic_url });
});
</script>
<template>
  <div class="my-10">
    <div class="text-base mt-3 ci flex flex-col gap-4">
      <div class="sm:cardku w-full mx-auto sm:pa-6 rounded-xl">
        <v-alert color="#00AA45" class="text-sm mb-6" type="warning" 
          v-if="useApp().user.source != 'basic'"
          text="You cannot change the email address and password if the account created from social media."></v-alert>
        <div class="flex items-center gap-2 text-base mb-4 font-medium border-b border-gray-100 pb-2">
          <Icon :width="$vuetify.display.mobile ? 16 : 20" icon="mage:edit-fill" />
          <div>
            Update Profile
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div>
            <v-img width="48"  height="48" cover class="mx-auto" rounded="full" :src="form.pic_url || defaultImage"
              lazy-src="https://dqy38fnwh4fqs.cloudfront.net/website/emptyDP.png"></v-img>
          </div>
          <div class="text-sm">
            <div class="font-medium text-[#00AA45] cursor-pointer" @click="triggerFileInput">
              Upload New
            </div>
            <div>Recommended size: 500x500px</div>
            <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="uploadImage" />
          </div>
        </div>
        <v-form ref="formSubmit">
          <div class="text-sm flex flex-col sm:flex-row w-full gap-2 mt-4">
            <div class="pl">
              <div class="mb-1">Name <span class="text-red">*</span></div>
              <v-text-field color="#00AA45" v-model="form.name" :rules="[requiredRule]" variant="outlined"
                density="compact" placeholder="Enter your name.." />
            </div>
            <div class="pl">
              <div class="mb-1">Email <span class="text-red">*</span></div>
              <v-text-field color="#00AA45" v-model="form.email" variant="outlined" density="compact" disabled
                placeholder="Enter your email.." :rules="[requiredRule]" />
            </div>
          </div>
          <div class="text-sm flex flex-col sm:flex-row w-full gap-2">
            <div class="pl">
              <div class="mb-1">Password</div>
              <v-text-field :disabled="useApp().user.source != 'basic'" v-model="form.password" color="#00AA45"
                variant="outlined" density="compact" placeholder="Enter new password.." type="password" />
            </div>
            <div class="pl">
              <div class="mb-1">Confirm Password</div>
              <v-text-field :disabled="useApp().user.source != 'basic'" v-model="confirmPassword" color="#00AA45"
                variant="outlined" density="compact" placeholder="Enter confirm password.." type="password"
                :rules="[confirmPasswordRule]" />
            </div>
          </div>
        </v-form>
        <div class="flex justify-end gap-2">
          <v-btn @click="router.back()" flat class="rounded-lg mb-6 mt-2">Back</v-btn>
          <v-btn @click="updateProfile" :loading="loading" flat color="#00AA45"
            class="rounded-lg mb-6 mt-2">Save</v-btn>
        </div>
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

.pl {
  width: 100%;
}

@media (min-width: 480px) {
  .pl {
    width: 100%;
  }
}
</style>