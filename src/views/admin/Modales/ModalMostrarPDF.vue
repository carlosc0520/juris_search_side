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
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pdf-container iframe {
    border: none !important;
    width: 100%;
    height: calc(100vh - 140px);
    border-radius: 12px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 98%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.0);
    pointer-events: auto;
}

/* Header styling */
:deep(.modal-header) {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
}

:deep(.modal-body) {
    padding: 1rem;
    background: #f8fafc;
}
</style>
