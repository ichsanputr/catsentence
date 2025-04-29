<script setup>
useHead({
    title: 'Remove Ads Paypal Confirmation'
})

const { $axios } = useNuxtApp();
const toast = reactive({
    state: false,
    color: '',
    text: '',
    icon: '',
})

onMounted(async () => {
    try {
        const { data } = await $axios.get('/payment/paypal/detail?order_id=' + new URLSearchParams(window.location.search).get("token"));
        console.log(data)

        const { datas } = await $axios.post('/payment/paypal/capture', {
            url: data.data.links[2].href
        });

        toast.icon = "tabler:circle-check"
        toast.text = "Successfully confirming transaction!"
        toast.color = "green"
        toast.state = true

        setTimeout(() => {
            window.location.href = "/";
        }, 2000)
    } catch (err) {
        loading.qris = false
        toast.icon = "material-symbols:error-rounded"
        toast.text = "Something wrong.."
        toast.color = "red-darken-1"
        toast.state = true

        console.log(err);
    }
})
</script>
<template>
    <div>
        <v-snackbar v-model="toast.state" location="bottom" :color="toast.color">
            <div class="flex items-center">
                <Icon width="18" :icon="toast.icon" />
                <div class="ml-2">{{ toast.text }}</div>
            </div>
        </v-snackbar>
        <div class="text-base mt-3 ci flex justify-center items-center h-full text-center flex-col gap-4">
            <div class="loader -mb-4"></div>

            <div>
                <h1>Confirming your paypal transaction...</h1>
            </div>

            <div>
                Thank you for paying using PayPal, please wait a moment, we are confirming your transaction. After we
                confirm your transaction you will be get reload and the ads will be removed from your account.
            </div>
        </div>
    </div>
</template>
<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
    width: 30px;
    aspect-ratio: 1;
    --_c: no-repeat radial-gradient(farthest-side, #00AA45 92%, #0000);
    background:
        var(--_c) top,
        var(--_c) left,
        var(--_c) right,
        var(--_c) bottom;
    background-size: 8px 8px;
    animation: l7 1s infinite;
}

@keyframes l7 {
    to {
        transform: rotate(.5turn)
    }
}

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