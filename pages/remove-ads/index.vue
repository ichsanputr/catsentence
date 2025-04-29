<script setup>
import { useApp } from '~/store/app';

useHead({
    title: 'Remove Ads'
})

definePageMeta({
    prerender: true,
});

const { $axios } = useNuxtApp();
const toast = reactive({
    state: false,
    color: '',
    text: '',
    icon: '',
})
const loading = reactive({
    paypal: false,
    qris: false,
})

async function createQris() {
    loading.qris = true

    if (!useApp().user.email) {
        toast.text = "Please login first.."
        toast.color = "red-darken-1"
        toast.icon = "material-symbols:error-rounded"
        toast.state = true
        loading.qris = false
        return
    }

    toast.text = "Processing your payment.."
    toast.color = "primary"
    toast.icon = "eos-icons:bubble-loading"
    toast.state = true

    try {
        const { data } = await $axios.post('/payment/tripay');

        loading.qris = false
        toast.state = false
        window.open(data.data.checkout_url)
    } catch (err) {
        loading.qris = false
        toast.icon = "material-symbols:error-rounded"
        toast.text = "Something wrong.."
        toast.color = "red-darken-1"
        toast.state = true

        console.log(err);
    }
}

async function createPaypal() {
    loading.paypal = true

    if (!useApp().user.email) {
        toast.text = "Please login first.."
        toast.color = "red-darken-1"
        toast.icon = "material-symbols:error-rounded"
        toast.state = true
        loading.paypal = false
        return
    }

    toast.text = "Processing your payment.."
    toast.color = "primary"
    toast.icon = "eos-icons:bubble-loading"
    toast.state = true

    try {
        const { data } = await $axios.post('/payment/paypal');

        loading.paypal = false
        toast.state = false
        window.open(data.data.links[1].href)
    } catch (err) {
        loading.paypal = false
        toast.icon = "material-symbols:error-rounded"
        toast.text = "Something wrong.."
        toast.color = "red-darken-1"
        toast.state = true

        console.log(err);
    }
}
</script>
<template>
    <div>
        <v-snackbar v-model="toast.state" location="bottom" :color="toast.color">
            <div class="flex items-center">
                <Icon width="18" :icon="toast.icon" />
                <div class="ml-2">{{ toast.text }}</div>
            </div>
        </v-snackbar>
        <div class="text-base mt-3 ci flex flex-col gap-4">
            <div>
                <h1>Remove Ads</h1>
            </div>

            <div>
                Thank you for using our platform; we would be happy if you continued learning with us. Currently, we are
                financing the website's server costs through advertisements placed in several sections. We apologize for
                not allowing the use of ad blockers, as our income comes from advertisements.
            </div>

            <p>
                If you want to remove ads, you can make a one-time payment of <span class="font-medium italic">$3</span> or <span class="font-medium italic">IDR 25,000</span>. After payment, ads will
                disappear forever from your account. Thank you for your attention in advance 😺
            </p>

            <div class="flex justify-center items-center gap-2 my-6">
                <v-btn @click="createPaypal" :loading="loading.paypal" class="flex gap-2 items-center rounded-lg"
                    color="#0D0D0D" flat>
                    <Icon icon="logos:paypal" />
                    <div class="ml-1">Paypal</div>
                </v-btn>
                <v-btn @click="createQris" :loading="loading.qris"
                    class="flex gap-2 items-center border border-green-50 rounded-lg" flat>
                    <Icon width="20" color="#00AA45" icon="gg:qr" />
                    <div class="ml-1">Qris</div>
                </v-btn>
            </div>
        </div>
    </div>
</template>
<style scoped>
h2 {
    font-size: 20px;
    margin-top: 1rem;
    color: #00AA45;
}

h1 {
    font-size: 24px;
    margin-top: 1rem;
    color: #00AA45;
}

ul {
    list-style-type: disc;
    /* Ensures bullet points */
    padding-left: 20px;
    /* Adds spacing for indentation */
}
</style>