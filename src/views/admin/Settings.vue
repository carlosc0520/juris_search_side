<template>
  <section class="settings-container mt-4 pt-2">
    <div class="settings-header">
      <div class="settings-header-content">
        <div class="header-title-section">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="header-icon">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m8.66-15.66l-4.24 4.24m-4.24 4.24l-4.24 4.24M23 12h-6m-6 0H1m15.66 8.66l-4.24-4.24m-4.24-4.24l-4.24-4.24"/>
          </svg>
          <div>
            <h1 class="settings-title">Configuración de Cuenta</h1>
            <p class="settings-subtitle">Gestiona tu información personal y contactos</p>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-content">
      <div class="tabs-modern">
        <button 
          class="tab-button" 
          :class="{ 'tab-active': active === 'informacionPersonal' }"
          @click="updateActive('informacionPersonal')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Información Personal</span>
        </button>
        <button 
          class="tab-button" 
          :class="{ 'tab-active': active === 'contactos' }"
          @click="updateActive('contactos')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
          <span>Contactos</span>
        </button>
      </div>

      <div class="tab-content">
        <div v-if="active === 'informacionPersonal'" class="fade-in">
          <!-- Profile Picture Section -->
          <div class="profile-card">
            <div class="profile-card-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <h2>Foto de Perfil</h2>
            </div>
            <div class="profile-card-content">
              <div class="avatar-section">
                <div class="avatar-wrapper" @click="openFileInput">
                  <img :src="this.modelo.RTAFTO || team2" alt="imagen_usuario" class="avatar-image" @error="e => e.target.src = team2" />
                  <div class="avatar-overlay">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </div>
                </div>
                <input type="file" id="avatar-input" @change="changeAvatar" ref="avatarInput" class="avatar-input" accept="image/*" />
              </div>
              <div class="avatar-info">
                <h3>Actualiza tu foto de perfil</h3>
                <p>Formatos: JPG, PNG o GIF. Máximo 5MB</p>
                <div class="avatar-actions">
                  <button class="btn-upload" @click="openFileInput">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                    </svg>
                    Cambiar foto
                  </button>
                  <button class="btn-remove" @click="() => { modelo.RTAFTO = null }" v-if="modelo.RTAFTO">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Personal Information Form -->
          <form @submit.prevent="save" class="settings-form">
            <div class="form-section">
              <div class="form-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <h3>Datos Personales</h3>
              </div>
              
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">
                    Nombres completos <span class="required">*</span>
                  </label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input 
                      v-model="modelo.NOMBRES" 
                      :class="['form-input', { 'input-error': validation.hasError('modelo.NOMBRES') }]" 
                      type="text"
                      placeholder="Ingresa tus nombres"
                      maxlength="100" />
                  </div>
                  <span class="error-message" v-if="validation.hasError('modelo.NOMBRES')">
                    {{ validation.firstError('modelo.NOMBRES') }}
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    Apellido paterno <span class="required">*</span>
                  </label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input 
                      v-model="modelo.APATERNO" 
                      :class="['form-input', { 'input-error': validation.hasError('modelo.APATERNO') }]" 
                      type="text"
                      placeholder="Ingresa tu apellido paterno"
                      maxlength="50" />
                  </div>
                  <span class="error-message" v-if="validation.hasError('modelo.APATERNO')">
                    {{ validation.firstError('modelo.APATERNO') }}
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    Apellido materno <span class="required">*</span>
                  </label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input 
                      v-model="modelo.AMATERNO" 
                      :class="['form-input', { 'input-error': validation.hasError('modelo.AMATERNO') }]" 
                      type="text"
                      placeholder="Ingresa tu apellido materno"
                      maxlength="50" />
                  </div>
                  <span class="error-message" v-if="validation.hasError('modelo.AMATERNO')">
                    {{ validation.firstError('modelo.AMATERNO') }}
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    Fecha de Nacimiento <span class="required">*</span>
                  </label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <date-picker 
                      placeholder="YYYY-MM-DD" 
                      v-model="modelo.FNACIMIENTO"
                      :class="['form-input date-picker-custom', { 'input-error': validation.hasError('modelo.FNACIMIENTO') }]" 
                      :value="modelo.FNACIMIENTO"
                      valueType="format" 
                      :disabledDate="time => time.getTime() > Date.now()"
                      @change="(date) => modelo.FNACIMIENTO = date" />
                  </div>
                  <span class="error-message" v-if="validation.hasError('modelo.FNACIMIENTO')">
                    {{ validation.firstError('modelo.FNACIMIENTO') }}
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">Profesión</label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                    </svg>
                    <input 
                      v-model="modelo.PROFESION" 
                      class="form-input" 
                      type="text"
                      placeholder="Ej: Abogado, Contador, etc."
                      maxlength="100" />
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Cargo</label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                    <input 
                      v-model="modelo.CARGO" 
                      class="form-input" 
                      type="text"
                      placeholder="Ej: Gerente, Director, etc."
                      maxlength="100" />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-section">
              <div class="form-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
                <h3>Datos de Contacto</h3>
              </div>
              
              <div class="form-grid">
                <div class="form-group form-group-full">
                  <label class="form-label">
                    Correo electrónico <span class="required">*</span>
                  </label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input 
                      v-model="modelo.EMAIL" 
                      :class="['form-input', { 'input-error': validation.hasError('modelo.EMAIL') }]" 
                      type="email"
                      placeholder="correo@ejemplo.com"
                      maxlength="100" />
                  </div>
                  <span class="error-message" v-if="validation.hasError('modelo.EMAIL')">
                    {{ validation.firstError('modelo.EMAIL') }}
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    Teléfono <span class="required">*</span>
                  </label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    <input 
                      v-model="modelo.TELEFONO" 
                      :class="['form-input', { 'input-error': validation.hasError('modelo.TELEFONO') }]" 
                      type="tel"
                      placeholder="987654321"
                      maxlength="15"
                      @input="modelo.TELEFONO = modelo.TELEFONO.replace(/[^0-9]/g, '')" />
                  </div>
                  <span class="error-message" v-if="validation.hasError('modelo.TELEFONO')">
                    {{ validation.firstError('modelo.TELEFONO') }}
                  </span>
                </div>

                <div class="form-group form-group-full">
                  <label class="form-label">Dirección</label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <input 
                      v-model="modelo.DIRECCION" 
                      class="form-input" 
                      type="text"
                      placeholder="Ej: Av. Principal 123, Lima"
                      maxlength="200" />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-section">
              <div class="form-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <h3>Seguridad</h3>
              </div>
              
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Usuario</label>
                  <div class="input-wrapper input-disabled">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input 
                      v-model="modelo.EMAIL" 
                      class="form-input" 
                      type="text"
                      disabled />
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    Contraseña <span class="required">*</span>
                  </label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    <input 
                      :type="visualizar ? 'text' : 'password'"
                      v-model="modelo.PASSWORD" 
                      :class="['form-input', { 'input-error': validation.hasError('modelo.PASSWORD') }]"
                      placeholder="••••••••"
                      maxlength="50" />
                    <button type="button" class="input-toggle" @click="visualizar = !visualizar">
                      <i :class="visualizar ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                    </button>
                  </div>
                  <span class="error-message" v-if="validation.hasError('modelo.PASSWORD')">
                    {{ validation.firstError('modelo.PASSWORD') }}
                  </span>
                  <div class="password-hint" v-if="!validation.hasError('modelo.PASSWORD')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    Mínimo 8 caracteres, incluye letra, número y caracter especial
                  </div>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button class="btn-save" type="submit" :disabled="isLoading">
                <svg v-if="!isLoading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                <span v-if="isLoading" class="spinner"></span>
                {{ isLoading ? 'Guardando...' : 'Guardar Cambios' }}
              </button>
            </div>
          </form>
        </div>

        <div v-if="active === 'contactos'" class="fade-in">
          <div class="contacts-section">
            <div class="search-card">
              <div class="search-card-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <h3>Buscar Contactos</h3>
              </div>
              <AutoComplete 
                v-model="contacto.search" 
                :suggestions="contacto.data" 
                @complete="searchSugges"
                optionLabel="DESCP" 
                class="autocomplete-modern"
                placeholder="Busca amigos por nombre o correo electrónico">
                <template #option="slotProps">
                  <div class="contact-suggestion">
                    <div class="contact-suggestion-info">
                      <img :src="slotProps.option.RTAFTO || team2" alt="imagen_usuario" class="contact-avatar" @error="e => e.target.src = team2" />
                      <div class="contact-details">
                        <p class="contact-name">{{ slotProps.option.DESCP }}</p>
                        <span class="contact-email">{{ slotProps.option.EMAIL.toLowerCase() }}</span>
                      </div>
                    </div>
                    <button class="btn-add-contact" type="button" @click.stop="createContact(slotProps.option)">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                      </svg>
                      Agregar
                    </button>
                  </div>
                </template>
              </AutoComplete>
            </div>

            <div class="contacts-table-wrapper">
              <card-table 
                title="Mis Contactos" 
                :search="searchContacto" 
                :fields="contacto.fields" 
                :items="contacto.datos"
                :grid="contacto.grid" 
                :actions="contacto.actions" />
            </div>
          </div>
        </div>

      </div>
    </div>
    <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />
  </section>
</template>

<script>
import CardTable from "@/components/Cards/CardTable.vue";
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';

import UserProxy from "@/proxies/UserProxy";
import moment from 'moment';
import team2 from "@/assets/img/resources/perfil.png";
import AutoComplete from 'primevue/autocomplete';

export default {
  components: {
    AutoComplete,
    CardTable,
  },
  data() {
    return {
      team2,
      isLoading: true,
      visualizar: false,
      active: "informacionPersonal",
      modelo: {
        APATERNO: "",
        AMATERNO: "",
        NOMBRES: "",
        EMAIL: "",
        TELEFONO: "",
        FNACIMIENTO: "",
        CDESTDO: "",
        PASSWORD: "",
        FCRCN: "",
        PROFESION: "",
        CARGO: "",
        DIRECCION: "",
        DATOS: {},
        RTAFTO: "",
      },
      contacto: {
        search: null,
        data: null,
        datos: [],
        grid: {
          items: [],
          currentPage: 1,
          perPage: 10,
          totalRows: 120,
          isLoading: false,
          pageOptions: [5, 10, 15, 50],
        },
        fields: [
          { key: "RN", label: "", },
          {
            key: "RTAFTO",
            label: "Avatar",
            formatter: (value) => {
              return `<img src="${value || team2}" 
              style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; cursor: pointer;"
              alt="imagen_usuario" class="avatarMiniun" @error="function (e) { e.target.src = team2 }" />`;
            },
          },
          { key: "NOMBRES", label: "Nombres" },
          { key: "APELLIDOS", label: "Apellidos" },
          { key: "EMAIL", label: "Correo" },
          { key: "ESTADO", label: "Estado" },
          {
            key: "ACCIONES",
            label: "Acciones",
            class: "text-center w-130",
          },
        ],
        actions: {
          delete: {
            label: "Eliminar",
            icon: "fas fa-trash",
            class: "btn-delete",
            action: null,
          },
        },
      }
    };
  },
  validators: {
    'modelo.NOMBRES': function (value) {
      return Validator.value(value).required('Campo requerido');
    },
    'modelo.APATERNO': function (value) {
      return Validator.value(value).required('Campo requerido');
    },
    'modelo.AMATERNO': function (value) {
      return Validator.value(value).required('Campo requerido');
    },
    'modelo.EMAIL': function (value) {
      return Validator.value(value).required('Campo requerido')
        .email('El correo electrónico no es válido')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo electrónico no es válido');
    },
    'modelo.TELEFONO': function (value) {
      return Validator.value(value).required('Campo requerido')
        .regex(/^\d+$/, 'El teléfono solo puede contener números')
        .minLength(9, 'El teléfono debe tener al menos 9 dígitos')
        .maxLength(15, 'El teléfono no puede tener más de 15 dígitos');
    },
    'modelo.FNACIMIENTO': function (value) {
      return Validator.value(value).required('Campo requerido');
    },
    'modelo.PASSWORD': function (value) {
      return Validator.value(value)
        .required('Campo requerido')
        .minLength(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
          'La contraseña debe tener al menos 1 letra, 1 número y 1 caracter especial'
        );
    }
  },
  props: {
    UPDATERTAFTO: {
      type: Function, default: () => { },
    },
    RTAFTO: {
      type: String, default: null,
    },
  },
  methods: {
    async save(e) {
      e.preventDefault();
      let validate = await this.$validate();
      if (!validate) return;

      let formData = new FormData();
      Object.keys(this.modelo).forEach(key => {
        if (key !== 'RTAFTO') formData.append(key, this.modelo[key]);
      });

      formData.append('files', this.$refs.avatarInput.files[0]);

      if (!this.$refs.avatarInput.files[0]) {
        formData.append('files', "");
      }
      this.isLoading = true;
      const loadingToast = toast.loading("Espere un momento...");
      await UserProxy.editarFoce(formData)
        .then(async response => {
          const toastMessage = response.STATUS ? "Datos actualizados con éxito" : response.MESSAGE;
          if (response.STATUS) {
            toast.success(toastMessage);
            await this.getUser();
          } else {
            toast.error(toastMessage);
          }

        })
        .catch(err => toast.error(err?.MESSAGE || "Error al actualizar sus datos"))
        .finally(() => {
          toast.remove(loadingToast);
          this.isLoading = false;
        });
    },
    async getUser() {
      this.isLoading = true;
      await UserProxy.getUsuario()
        .then((response) => {
          this.modelo = {
            APATERNO: response.APATERNO,
            AMATERNO: response.AMATERNO,
            NOMBRES: response.NOMBRES,
            EMAIL: response.EMAIL,
            TELEFONO: response.TELEFONO,
            FNACIMIENTO: response.FNACIMIENTO,
            CDESTDO: response.CDESTDO,
            PASSWORD: response.PASSWORD,
            FCRCN: response.FCRCN?.split("T")[0],
            PROFESION: response.PROFESION,
            CARGO: response.CARGO,
            DIRECCION: response.DIRECCION,
            DATOS: JSON.parse(response.DATOS)?.[0] || {},
            RTAFTO: response.RTAFTO,
          }

          let USUARIO = JSON.parse(localStorage.getItem("user")) || {};
          USUARIO.RTAFTO = this.modelo.RTAFTO;
          localStorage.setItem("user", JSON.stringify(USUARIO));
          this.$refs.avatarInput.value = null;

          this.UPDATERTAFTO();
        })
        .catch((error) => {
          toast.error(error?.MESSAGE || 'Error al cargar los magistrados', { toastId: 'error-magistrados' })
        })
        .finally(() => this.isLoading = false);
    },
    updateActive(text) {
      this.active = text;
    },
    reset() {
      this.modelo = {
        ...this.modelo,
        APATERNO: null,
        AMATERNO: null,
        NOMBRES: null,
        EMAIL: null,
        TELEFONO: null,
        FNACIMIENTO: null,
        CDESTDO: null,
        FCRCN: null,
        PASSWORD: null,
        PROFESION: null,
        CARGO: null,
        DIRECCION: null,
        DATOS: null
      };
    },
    formatDate(fecha, formato) {
      return moment(fecha).format(formato);
    },
    openFileInput() {
      this.$refs.avatarInput.click();
    },
    changeAvatar(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.modelo.RTAFTO = e.target.result;
        };
        reader.readAsDataURL(file);
      } else if (file) {
        toast.warning("El archivo seleccionado no es una imagen", { toastId: 'error-avatar' });
      }
    },
    // CONTACTO
    async searchSugges() {
      if (this.contacto.search.length < 6) return;

      await UserProxy.list({
        ROWS: 10000,
        INIT: 0,
        DESC: this.contacto.search.trim(),
        CESTDO: 'A'
      }, '10')
        .then((dataresponse) => {
          this.contacto.data = dataresponse.map((item) => {
            return {
              ...item,
              DESCP: this.formatearTexto((item?.NOMBRES || '') + " " + (item?.APATERNO || '') + " " + (item?.AMATERNO || '')),
            };
          });
        })
        .catch((error) => {
          this.contacto.data = null;
          toast.error(error?.MESSAGE || 'Error al cargar los contactos', { toastId: 'error-contactos' });
        })
    },
    formatearTexto(texto) {
      return texto
        .split(" ")
        .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
        .join(" ");
    },
    searchContacto() {
      this.contacto.grid.isLoading = true;
      console.log({
        ROWS: this.contacto.grid.perPage,
        INIT: (this.contacto.grid.currentPage - 1) * this.contacto.grid.perPage,
        CDESTDO: 'A'
      })
      UserProxy.getContactos({
        ROWS: this.contacto.grid.perPage,
        INIT: (this.contacto.grid.currentPage - 1) * this.contacto.grid.perPage,
        CDESTDO: 'A'
      })
        .then((dataresponse) => {
          this.contacto.datos = dataresponse.map((item, index) => {
            return {
              RN: index + 1,
              ...item,
              DESCP: this.formatearTexto((item?.NOMBRES || '') + " " + (item?.APATERNO || '') + " " + (item?.AMATERNO || '')),
            };
          });
          this.contacto.grid.totalRows = dataresponse[0]?.TOTALROWS || 0;
        })
        .catch((error) => {
          this.contacto.datos = null;
          toast.error(error?.MESSAGE || 'Error al cargar los contactos', { toastId: 'error-contactos' });
        })
        .finally(() => this.contacto.grid.isLoading = false);
    },
    async createContact(data) {
      this.$swal({
        title: "Agregar contacto",
        text: `¿Está seguro de agregar a ${data.DESCP} como contacto?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No, cancelar",
        confirmButtonText: "Sí, continuar",
        dangerMode: true,
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            await UserProxy.createContacto({
              IDRECEPT: data.ID,
              ESTADO: 'false',
              CDESTDO: 'A'
            })
              .then((response) => {
                const toastMessage = response.STATUS ? "Solicitud de contacto creado con éxito" : response.MESSAGE;
                if (response.STATUS) {
                  toast.success(toastMessage);
                  this.contacto.search = null;
                  this.contacto.data = null;
                  this.searchContacto();
                } else {
                  toast.error(toastMessage);
                }
              })
              .catch((error) => {
                toast.error(error?.MESSAGE || 'Error al agregar contacto', { toastId: 'error-contactos' });
              })
              .finally(() => this.isLoading = false);
          }
        })
        .catch((err) => toast.error(err?.MESSAGE || 'Error al iniciar sesión'));

      return;
    },
    async deleteContacto(item) {
      this.$swal({
        title: "Eliminar contacto",
        text: `¿Está seguro de eliminar a ${item.NOMBRES} ${item.APELLIDOS} como contacto?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No, cancelar",
        confirmButtonText: "Sí, continuar",
        dangerMode: true,
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            await UserProxy.deleteContacto(item.ID)
              .then((response) => {
                const toastMessage = response.STATUS ? "Contacto eliminado con éxito" : response.MESSAGE;
                if (response.STATUS) {
                  toast.success(toastMessage);
                  this.contacto.search = null;
                  this.contacto.data = null;
                  this.searchContacto();
                } else {
                  toast.error(toastMessage);
                }
              })
              .catch((error) => {
                toast.error(error?.MESSAGE || 'Error al eliminar contacto', { toastId: 'error-contactos' });
              })
              .finally(() => this.isLoading = false);
          }
        })
        .catch((err) => toast.error(err?.MESSAGE || 'Error al iniciar sesión'));
      return;
    }
  },
  watch: {
    active(newValue) {
      if (newValue === 'contactos') {
        this.searchContacto();
      }
    },
  },
  mounted() {
    this.contacto.actions = {
      ...this.contacto.actions,
      delete: {
        ...this.contacto.actions.delete,
        action: (item) => {
          this.deleteContacto(item);
        },
      },
    }
    this.getUser();
  },
};
</script>

<style scoped>
/* Settings Container */
.settings-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding-bottom: 4rem;
}

/* Header */
.settings-header {
  background: white;
  border-bottom: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.settings-header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header-title-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  flex-shrink: 0;
  color: #185CE6;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.settings-title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.settings-subtitle {
  color: #6B7280;
  font-size: 0.95rem;
  margin: 0.25rem 0 0 0;
}

/* Content */
.settings-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Modern Tabs */
.tabs-modern {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background: white;
  padding: 0.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-button svg {
  transition: transform 0.3s ease;
}

.tab-button:hover {
  background: rgba(24, 92, 230, 0.05);
  color: #185CE6;
}

.tab-button:hover svg {
  transform: translateY(-2px);
}

.tab-active {
  background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
  color: white !important;
  box-shadow: 0 4px 15px rgba(223, 45, 178, 0.3);
}

.tab-active:hover {
  background: linear-gradient(135deg, #c528a0 0%, #1450c9 100%);
}

/* Tab Content */
.tab-content {
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.4s ease-in;
}

/* Profile Card */
.profile-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #F3F4F6;
}

.profile-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #F3F4F6;
}

.profile-card-header svg {
  color: #185CE6;
}

.profile-card-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
}

.profile-card-content {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

/* Avatar Section */
.avatar-section {
  flex-shrink: 0;
}

.avatar-wrapper {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 4px solid #F3F4F6;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.avatar-wrapper:hover {
  border-color: #185CE6;
  transform: scale(1.05);
}

.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(24, 92, 230, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.avatar-input {
  display: none;
}

.avatar-info {
  flex: 1;
  min-width: 250px;
}

.avatar-info h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 0.5rem 0;
}

.avatar-info p {
  color: #6B7280;
  font-size: 0.95rem;
  margin: 0 0 1.5rem 0;
}

.avatar-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-upload, .btn-remove {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-upload {
  background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(223, 45, 178, 0.3);
}

.btn-upload:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(223, 45, 178, 0.4);
}

.btn-remove {
  background: #FEE2E2;
  color: #DC2626;
}

.btn-remove:hover {
  background: #FECACA;
  transform: translateY(-2px);
}

/* Form Sections */
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #F3F4F6;
}

.form-section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #F3F4F6;
}

.form-section-header svg {
  color: #185CE6;
}

.form-section-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group-full {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.required {
  color: #DC2626;
  font-weight: 700;
}

/* Input Wrapper */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #9CA3AF;
  pointer-events: none;
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #1F2937;
  background: white;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #185CE6;
  box-shadow: 0 0 0 3px rgba(24, 92, 230, 0.1);
}

.form-input::placeholder {
  color: #9CA3AF;
}

.form-input:disabled {
  background: #F9FAFB;
  color: #9CA3AF;
  cursor: not-allowed;
}

.input-disabled {
  opacity: 0.7;
}

.input-error {
  border-color: #DC2626 !important;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
}

.input-toggle {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.input-toggle:hover {
  color: #185CE6;
}

/* Error & Hint Messages */
.error-message {
  font-size: 0.85rem;
  color: #DC2626;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.password-hint {
  font-size: 0.85rem;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.password-hint svg {
  flex-shrink: 0;
  color: #9CA3AF;
}

/* Date Picker Custom */
.date-picker-custom {
  padding-left: 3rem !important;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
}

.btn-save {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(223, 45, 178, 0.3);
  min-width: 200px;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(223, 45, 178, 0.4);
}

.btn-save:active:not(:disabled) {
  transform: translateY(0);
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Contacts Section */
.contacts-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.search-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #F3F4F6;
}

.search-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.search-card-header svg {
  color: #185CE6;
}

.search-card-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
}

.autocomplete-modern {
  width: 100%;
}

.autocomplete-modern :deep(.p-autocomplete-input) {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #E5E7EB;
  border-radius: 14px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.autocomplete-modern :deep(.p-autocomplete-input:focus) {
  outline: none;
  border-color: #185CE6;
  box-shadow: 0 0 0 3px rgba(24, 92, 230, 0.1);
}

/* Contact Suggestion */
.contact-suggestion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  border-radius: 12px;
  transition: background 0.3s ease;
}

.contact-suggestion:hover {
  background: rgba(24, 92, 230, 0.05);
}

.contact-suggestion-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.contact-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #F3F4F6;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
}

.contact-email {
  font-size: 0.85rem;
  color: #6B7280;
}

.btn-add-contact {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(223, 45, 178, 0.3);
}

.btn-add-contact:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(223, 45, 178, 0.4);
}

.contacts-table-wrapper {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #F3F4F6;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .settings-header-content {
    padding: 0 1.5rem;
  }

  .settings-content {
    padding: 0 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .settings-header {
    padding: 1.5rem 0;
  }

  .header-title-section {
    gap: 1rem;
  }

  .header-icon {
    width: 24px;
    height: 24px;
  }

  .settings-title {
    font-size: 1.5rem;
  }

  .settings-subtitle {
    font-size: 0.85rem;
  }

  .settings-content {
    padding: 0 1rem;
  }

  .tabs-modern {
    flex-direction: column;
    gap: 0.5rem;
  }

  .tab-button {
    padding: 0.875rem 1rem;
  }

  .profile-card,
  .form-section,
  .search-card,
  .contacts-table-wrapper {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .profile-card-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .avatar-wrapper {
    width: 120px;
    height: 120px;
  }

  .avatar-info {
    width: 100%;
  }

  .avatar-actions {
    width: 100%;
  }

  .btn-upload,
  .btn-remove {
    flex: 1;
    justify-content: center;
  }

  .form-actions {
    justify-content: stretch;
  }

  .btn-save {
    width: 100%;
  }

  .contact-suggestion {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-add-contact {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .settings-header-content {
    padding: 0 1rem;
  }

  .settings-title {
    font-size: 1.25rem;
  }

  .tab-button span {
    font-size: 0.9rem;
  }

  .profile-card-header h2,
  .form-section-header h3,
  .search-card-header h3 {
    font-size: 1.1rem;
  }
}
</style>
