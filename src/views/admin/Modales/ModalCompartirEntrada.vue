<template>

    <b-modal id="modal-resolucion-compartir" hide-footer="true" v-model="show" centered size="xl" title="" dialog-class="modern-modal"
        body-class="modern-modal-body">
        <div class="modal-header-custom">
            <div class="modal-header-icon">
                <i class="fas fa-share-alt"></i>
            </div>
            <div>
                <h5 class="modal-title-custom">Comparte documentos con tus contactos</h5>
                <p class="modal-subtitle">Selecciona los contactos con los que deseas compartir tus documentos.</p>
            </div>
        </div>
        <div class="modal-body-custom">
            <div class="row search-bar gx-2 align-items-center mb-4">
                <div class="col-12 col-md-6 mb-2 mb-md-0">
                    <input type="text" v-model="SEARCH" class="form-control search-input h-100"
                        placeholder="Buscar por nombre o email" aria-label="Buscar por nombre o email"
                        @keyup.enter="getContactos()" style="min-height:48px;">
                </div>
                <div class="col-12 col-md-3 mb-2 mb-md-0">
                    <select class="form-select user-select w-100 h-100" v-model="ISPERM"
                        aria-label="Permiso de compartición" style="min-height:48px;">
                        <option value="1">Lector</option>
                        <option value="2">Editor</option>
                    </select>
                </div>
                <div class="col-12 col-md-3 d-flex justify-content-md-end mt-2 mt-md-0">
                    <button @click="getContactos()" class="btn btn-search-modal w-100 w-md-auto" type="button"
                        id="button-addon2" style="min-height:48px;">
                        <i class="fas fa-search"></i> Buscar
                    </button>
                </div>
            </div>
            <div class="selected-count">
                <span class="selected-number">{{ contactosSelected.length }}</span> contactos seleccionados
            </div>
            <div class="user-list">
                <div v-if="contactos.length === 0" class="no-users">
                    <i class="fas fa-user-slash"></i> No hay contactos disponibles.
                </div>
                <div v-for="(contacto, index) in contactos" :key="index" class="user-row">
                    <div class="user-info">
                        <img :src="contacto.RTAFTO || 'https://placehold.co/50x50'" class="user-avatar" alt="avatar">
                        <div class="user-details">
                            <span class="user-name">{{ contacto.NOMBRES + ' ' + contacto.APELLIDOS }}</span>
                            <span class="user-email">{{ contacto.EMAIL }}</span>
                        </div>
                    </div>
                    <div class="user-permission">
                        <input type="checkbox" class="check-head form-check-input" :id="'check' + index"
                            :checked="contacto.CHECKED"
                            @change="onSelectedContactos(contacto, $event.target.checked)" />
                    </div>
                </div>
            </div>
            <div class="modal-footer-custom">
                <button class="btn btn-cancel-modal" @click="show = false">Cancelar</button>
                <button class="btn btn-save-modal" @click="submit($event)">Guardar</button>
            </div>
        </div>
    </b-modal>

</template>


<script>
import { BModal } from 'bootstrap-vue-next';
import { toast } from 'vue3-toastify';
import UserProxy from '@/proxies/UserProxy';

export default {
    name: "ModalCompartirEntrada",
    components: {
        BModal
    },
    data() {
        return {
            show: false,
            SEARCH: "",
            ISPERM: 1,
            contactos: [],
            contactosSelected: [],
        }
    },
    props: {
        openModal: {
            type: Boolean,
            default: false
        },
        toggleModal: {
            type: Function,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        // * CONTACTOS
        async getContactos() {
            await UserProxy.getContactos({ ESTADO: true, INIT: 0, ROWS: 10, DESC: this.SEARCH, IDFAV: this.data.ID })
                .then((response) => {
                    this.contactos = response.map(contacto => {
                        return {
                            ...contacto,
                            CHECKED: this.contactosSelected.some(contactoSelected => contactoSelected.ID === contacto.ID)
                        }
                    });
                })
                .catch(() => {
                    this.contactos = [];
                    toast.error("Error al obtener los contactos");
                })
        },
        onSelectedContactos(item, checked) {
            if (checked) {
                if (!this.contactosSelected.some(contacto => contacto.ID === item.ID)) {
                    this.contactosSelected.push(item);
                }
            } else {
                this.contactosSelected = this.contactosSelected.filter(contacto => contacto.ID !== item.ID);
            }
        },
        async submit(e) {
            e.preventDefault();

            if (this.contactosSelected.length === 0) {
                toast.error("Selecciona al menos un contacto");
                return;
            }

            const contactosSelected = this.contactosSelected.map(contacto => {
                return {
                    IDFAV: this.data.ID,
                    IDUSERSHARED: contacto.IDRECEPT,
                    ISPERM: this.ISPERM,
                    CESTDO: 'A'
                }
            });

            await UserProxy.setCompartirEntrada({
                CONTACTOS: JSON.stringify(contactosSelected),
            })
                .then((response) => {
                    if (response.STATUS) {
                        this.show = false;
                        toast.success("Documentos compartidos correctamente");
                    } else {
                        toast.error(response.MESSAGE);
                    }
                })
                .catch(() => {
                    toast.error("Error al compartir los documentos");
                })
        },
    },
    watch: {
        openModal() {
            this.show = this.openModal;
        },
        show(val) {
            if (!val) {
                this.toggleModal();
                this.SEARCH = "";
                this.ISPERM = 1;
                this.contactos = [];
                this.contactosSelected = [];
            } else {
                this.getContactos();
            }
        },
    },
}
</script>


<style scoped>
/* Modern modal custom styles reutilizados */
.modal-header-custom {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%);
    padding: 1.5rem 2rem 1rem 2rem;
    border-radius: 20px 20px 0 0;
    margin-bottom: 0;
}

.modal-header-icon {
    background: #fff;
    color: #6366f1;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.12);
}

.modal-title-custom {
    color: #fff;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.modal-subtitle {
    color: #e0e7ff;
    font-size: 1rem;
    margin-bottom: 0;
}

.modal-body-custom {
    background: #f8fafc;
    padding: 2rem 2rem 1.5rem 2rem;
    border-radius: 0 0 20px 20px;
}

.search-bar {
    margin-bottom: 2rem;
}

.search-bar>.col-12 {
    margin-bottom: 0.5rem;
}

.btn-search-modal {
    width: 100%;
    margin-top: 0.5rem;
    min-width: unset;
    height: 44px;
}

.btn-search-modal {
    background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
    transition: background 0.2s;
    flex-shrink: 0;
    min-width: 130px;
}

.btn-search-modal:hover {
    background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%);
}

.user-select {
    border-radius: 8px;
    border: 1.5px solid #c7d2fe;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background: #f1f5f9;
    color: #374151;
    transition: border 0.2s;
}

.user-select:focus {
    border-color: #6366f1;
    outline: none;
}

.selected-count {
    color: #727370;
    font-size: 14px;
    margin-bottom: 1rem;
}

.selected-number {
    color: #1864FF;
    font-weight: 700;
}

.user-list {
    margin-bottom: 2rem;
}

.user-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.06);
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    gap: 1rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: none;
}

.user-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.user-name {
    font-weight: 700;
    color: #262626;
    font-size: 1.05rem;
}

.user-email {
    color: #262626;
    font-size: 0.95rem;
}

.user-permission {
    min-width: 110px;
    max-width: 150px;
    flex: 0 0 auto;
    justify-content: center;
}

.no-users {
    text-align: center;
    color: #a0aec0;
    font-size: 1.1rem;
    margin: 2rem 0;
}

.no-users i {
    margin-right: 0.5rem;
}

.modal-footer-custom {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
}

.btn-cancel-modal {
    background: #e5e7eb;
    color: #374151;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 1rem;
    transition: background 0.2s;
}

.btn-cancel-modal:hover {
    background: #cbd5e1;
}

.btn-save-modal {
    background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
    transition: background 0.2s;
}

.btn-save-modal:hover {
    background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%);
}

@media (max-width: 768px) {

    .modal-header-custom,
    .modal-body-custom {
        padding: 1rem !important;
    }

    .search-bar {
        flex-direction: column;
        align-items: stretch;
    }

    .btn-search-modal {
        width: 100%;
        margin-top: 0.5rem;
        min-width: unset;
    }

    .user-row {
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
    }

    .user-permission {
        width: 100%;
        min-width: unset;
        margin-top: 0.5rem;
        justify-content: flex-start;
    }

    .modal-footer-custom {
        flex-direction: column;
        gap: 0.5rem;
        align-items: stretch;
    }
}
</style>
<style scoped src="@/assets/styles/modal-styles.css"></style>
