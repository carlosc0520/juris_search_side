<template>
    <b-modal
        id="modal-directorio-compartido"
        v-model="show"
        hide-footer="true"
        centered
        size="xl"
        title=""
        dialog-class="modern-modal"
        body-class="modern-modal-body"
    >
        <div class="modal-header-custom">
            <div class="modal-header-icon">
                <i class="fas fa-users"></i>
            </div>
            <div>
                <h5 class="modal-title-custom">Usuarios con los que se comparte el directorio</h5>
                <p class="modal-subtitle">Visualiza los usuarios que tienen acceso a este directorio</p>
            </div>
        </div>
        <div class="modal-body-custom">
            <div class="directory-info">
                <div class="directory-info-icon">
                    <i class="fas fa-folder"></i>
                </div>
                <div>
                    <h6 class="directory-info-name">{{ data.label || 'Sin nombre' }}</h6>
                    <p class="directory-info-details">{{ (data.children || []).length }} documento(s)</p>
                </div>
            </div>

            <div class="input-group mb-4 search-bar">
                <input
                    type="text"
                    v-model="SEARCH"
                    class="form-control search-input"
                    placeholder="Buscar por nombre o email"
                    aria-label="Buscar por nombre o email"
                    @keyup.enter="filterUsers()"
                >
                <button @click="filterUsers()" class="btn btn-search-modal" type="button">
                    <i class="fas fa-search"></i> Buscar
                </button>
            </div>

            <div class="user-list">
                <div v-if="filteredUsers.length === 0" class="no-users">
                    <i class="fas fa-user-slash"></i> No hay usuarios compartidos.
                </div>
                <div v-for="(user, index) in filteredUsers" :key="index" class="user-row">
                    <div class="user-info">
                        <img :src="'https://placehold.co/50x50'" class="user-avatar" alt="avatar">
                        <div class="user-details">
                            <span class="user-name">{{ user.NOMBRES + ' ' + user.APATERNO + ' ' + (user.AMATERNO || '') }}</span>
                            <span class="user-email">{{ user.EMAIL }}</span>
                        </div>
                    </div>
                    <div class="user-permission">
                        <span class="permission-badge" :class="getPermissionClass(user.ISPERM)">
                            {{ getPermissionLabel(user.ISPERM) }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="modal-footer-custom">
                <button class="btn btn-cancel-modal" @click="show = false">Cerrar</button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue-next';

export default {
    name: "ModalDirectorioCompartido",
    components: {
        BModal
    },
    data() {
        return {
            show: false,
            SEARCH: "",
            users: [],
            filteredUsers: [],
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
        loadUsers() {
            try {
                const compartidos = this.data.COMPARTIDS || '[]';
                const users = typeof compartidos === 'string' ? JSON.parse(compartidos) : compartidos;
                this.users = Array.isArray(users) ? users : [];
                this.filteredUsers = [...this.users];
            } catch (error) {
                console.error('Error parsing COMPARTIDS:', error);
                this.users = [];
                this.filteredUsers = [];
            }
        },
        filterUsers() {
            if (!this.SEARCH.trim()) {
                this.filteredUsers = [...this.users];
                return;
            }

            const search = this.SEARCH.toLowerCase().trim();
            this.filteredUsers = this.users.filter(user => {
                const fullName = `${user.NOMBRES} ${user.APATERNO} ${user.AMATERNO || ''}`.toLowerCase();
                const email = (user.EMAIL || '').toLowerCase();
                return fullName.includes(search) || email.includes(search);
            });
        },
        getPermissionLabel(isperm) {
            const permissions = {
                1: 'Lector',
                2: 'Editor',
                3: 'Administrador'
            };
            return permissions[isperm] || 'Lector';
        },
        getPermissionClass(isperm) {
            const classes = {
                1: 'permission-reader',
                2: 'permission-editor',
                3: 'permission-admin'
            };
            return classes[isperm] || 'permission-reader';
        }
    },
    watch: {
        openModal() {
            this.show = this.openModal;
        },
        show(val) {
            if (!val) {
                this.toggleModal();
                this.SEARCH = "";
                this.filteredUsers = [];
            } else {
                this.loadUsers();
            }
        },
    },
}
</script>

<style scoped>
/* Modern modal custom styles */
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
    box-shadow: 0 2px 8px rgba(99,102,241,0.12);
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

.directory-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.directory-info-icon {
    background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.directory-info-name {
    font-weight: 700;
    color: #1F2937;
    margin: 0;
    font-size: 1.1rem;
}

.directory-info-details {
    color: #6B7280;
    margin: 0;
    font-size: 0.9rem;
}

.search-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    flex-direction: row;
}

.search-input {
    flex: 1 1 0%;
    min-width: 0;
    border-radius: 12px;
    border: 1.5px solid #c7d2fe !important;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    background: #fff;
    transition: border 0.2s;
}

.search-input:focus {
    border-color: #6366f1 !important;
    outline: none;
}

.btn-search-modal {
    flex-shrink: 0;
    min-width: 130px;
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
    box-shadow: 0 2px 8px rgba(99,102,241,0.08);
    transition: all 0.2s;
}

.btn-search-modal:hover {
    background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%);
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    gap: 1rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #E5E7EB;
}

.user-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.user-name {
    font-weight: 700;
    color: #1F2937;
    font-size: 1.05rem;
}

.user-email {
    color: #6B7280;
    font-size: 0.95rem;
}

.user-permission {
    min-width: 120px;
    display: flex;
    justify-content: flex-end;
}

.permission-badge {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
}

.permission-reader {
    background: #DBEAFE;
    color: #1E40AF;
}

.permission-editor {
    background: #FEF3C7;
    color: #92400E;
}

.permission-admin {
    background: #DCFCE7;
    color: #166534;
}

.no-users {
    text-align: center;
    color: #9CA3AF;
    font-size: 1.1rem;
    margin: 3rem 0;
    padding: 2rem;
}

.no-users i {
    margin-right: 0.5rem;
    font-size: 2rem;
    display: block;
    margin-bottom: 1rem;
}

.modal-footer-custom {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
}

.btn-cancel-modal {
    background: #E5E7EB;
    color: #374151;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 1rem;
    transition: background 0.2s;
}

.btn-cancel-modal:hover {
    background: #D1D5DB;
}

@media (max-width: 768px) {
    .modal-header-custom, .modal-body-custom {
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
        justify-content: center;
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
    
    .directory-info {
        padding: 1rem;
    }
}
</style>
<style scoped src="@/assets/styles/modal-styles.css"></style>
