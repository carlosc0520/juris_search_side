<template>
    <b-modal no-close-on-backdrop no-close-on-esc title="Estado del registro" v-model="showModal" hide-footer centered
        @ok="action" @cancel="closeHandler" @hidden="closeHandler">
        <div class="modal-body">
            <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeHandler">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="action({}, true)">
                {{ buttonOk }}
            </button>
        </div>
    </b-modal>
</template>



<script>

import { BModal } from 'bootstrap-vue-next';

export default {
    props: {
        message: {
            type: String,
            default: '¿Está seguro de cambiar el estado de este registro?'
        },
        buttonOk: {
            type: String,
            default: 'Si, cambiar'
        },
        action: {
            type: Function,
            required: true
        },
        closeHandler: {
            type: Function,
            default: () => { }
        },
        openDelete: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showModal: false
        }
    },
    components: {
        BModal
    },
    watch: {
        openDelete: {
            handler(value) {
                this.showModal = value;
            }
        }
    }
}
</script>