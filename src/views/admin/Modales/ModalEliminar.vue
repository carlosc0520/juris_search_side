<template>
    <b-modal no-close-on-backdrop no-close-on-esc v-model="showModal" hide-footer hide-header centered
        @ok="action" @cancel="closeHandler" @hidden="closeHandler" modal-class="modern-modal">
        <div class="modal-modern-content">
            <!-- Header con icono -->
            <div class="modal-modern-header">
                <div class="modal-icon modal-icon-warning">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>
                <h3 class="modal-modern-title">Estado del registro</h3>
            </div>
            
            <!-- Body -->
            <div class="modal-modern-body">
                <p class="modal-message">{{ message }}</p>
            </div>
            
            <!-- Footer -->
            <div class="modal-modern-footer">
                <button type="button" class="modal-btn modal-btn-cancel" @click="closeHandler">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>Cancelar</span>
                </button>
                <button type="button" class="modal-btn modal-btn-danger" @click="action({}, true)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    <span>{{ buttonOk }}</span>
                </button>
            </div>
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

<style scoped>
.modal-modern-content {
    padding: 0;
}

.modal-modern-header {
    text-align: center;
    padding: 2rem 2rem 1rem;
}

.modal-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s ease-in-out infinite;
}

.modal-icon-warning {
    background: linear-gradient(135deg, #FFB2B2 0%, #FCA5A5 100%);
    box-shadow: 0 8px 24px rgba(255, 77, 77, 0.3);
}

.modal-icon svg {
    color: #DC2626;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.modal-modern-title {
    font-family: Lato, sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.modal-modern-body {
    padding: 0 2rem 1.5rem;
    text-align: center;
}

.modal-message {
    font-family: Lato, sans-serif;
    font-size: 1rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
}

.modal-modern-footer {
    display: flex;
    gap: 12px;
    padding: 1.5rem 2rem 2rem;
    justify-content: center;
}

.modal-btn {
    flex: 1;
    padding: 12px 24px;
    border: none;
    border-radius: 12px;
    font-family: Lato, sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    max-width: 180px;
}

.modal-btn svg {
    width: 18px;
    height: 18px;
}

.modal-btn-cancel {
    background: #f1f5f9;
    color: #64748b;
    border: 2px solid #e2e8f0;
}

.modal-btn-cancel:hover {
    background: #e2e8f0;
    color: #475569;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal-btn-danger {
    background: linear-gradient(135deg, #FF4D4D 0%, #FF1744 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(255, 77, 77, 0.3);
}

.modal-btn-danger:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 77, 77, 0.4);
}

.modal-btn:active {
    transform: translateY(0);
}
</style>