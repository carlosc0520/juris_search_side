<template>
    <section class="bg-landing mt-4 pt-5">
        <div class="container-table flex flex-col mt-4 pt-5">

            // 1 input y 1 text area de respuesta
            <h1>JurisGPT</h1>
            <input v-model="message" placeholder="Enter your message" />
            <button @click="fetchData">Fetch Data</button>
            <textarea v-model="responseText" placeholder="Response will appear here" rows="10" cols="50"></textarea>
            <div v-if="response">
                <h2>Response Data:</h2>
                <pre>{{ response }}</pre>
            </div>
        </div>
    </section>
</template>

<script>
import JurisGPTProxy from "@/proxies/JurisGPTProxy";

export default {
    name: "JurisGPT",
    data() {
        return {
            message: "",
            responseText: "",
            response: null,
        }
    },
    methods: {
        async fetchData() {
            try {
                await JurisGPTProxy.preguntarGPT({
                    message: this.message
                }).then(res => {
                    this.response = res.data;
                    this.responseText = JSON.stringify(res.data, null, 2);
                })
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    },
};
</script>

<style scoped>
h1 {
    color: #2c3e50;
}
</style>