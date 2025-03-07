<template>
    <b-modal id="modal-noticia-crear" v-model="show" title="Solo lectura" hide-footer centered size="xl"
        ok-title="Crear" cancel-title="Cancelar">
        <div class="pdf-container">
            <iframe ref="pdfEmbed" :src="pdfUrl + '#zoom=100&view=fitH'" 
                style="border: 1px solid black; width: 100%; height: calc(100vh - 140px);"></iframe>
            <!-- <div class="overlay" v-if="show"></div>
            <div class="overlay" v-if="show"></div>
            <div class="overlay" v-if="show"></div>
            <div class="overlay" v-if="show"></div>
            <div class="overlay" v-if="show"></div>
            <div class="overlay" v-if="show"></div>
            <div class="overlay" v-if="show"></div>
            <div class="overlay" v-if="show"></div>
            <div class="overlay" v-if="show"></div> -->
        </div>
    </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue-next';


export default {
    name: "ModalMostrarPDF",
    props: {
        openModal: {
            type: Boolean,
            default: false
        },
        toggleModal: {
            type: Function,
            required: true
        },
        pdfUrl: {
            type: String,
            required: true
        }
    },
    components: {
        BModal
    },
    data() {
        return {
            show: false,
        };
    },
    watch: {
        openModal() {
            this.show = this.openModal;
        },
        show(val) {
            if (!val) {
                this.toggleModal();
            }
        },
    },
    methods: {
    }
};
</script>

<style scoped>
.pdf-container {
    position: relative;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 98%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.0);
    /* Color semi-transparente */
    pointer-events: auto;
    /* Habilitar eventos de ratón en la capa */
}
</style>
