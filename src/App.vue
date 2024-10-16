<template>
  <div id="app">
    <router-view />
    <div class="floating-whatsapp" @click="openWhatsApp">
      <i class="fab fa-whatsapp"></i>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openWhatsApp() {
      // Cambia el número de teléfono al que quieres dirigir a los usuarios
      const phoneNumber = '902430068'; // Primer número
      const message = 'Hola, tengo una consulta.';
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  }
}
</script>

<style>
/* // crear root */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.floating-whatsapp {
  position: fixed;
  bottom: 20px;
  /* Ajusta la distancia desde la parte inferior */
  right: 20px;
  /* Ajusta la distancia desde la derecha */
  background-color: #25D366;
  /* Color de fondo de WhatsApp */
  border-radius: 50%;
  /* Forma circular */
  width: 60px;
  /* Ancho del icono */
  height: 60px;
  /* Alto del icono */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  /* Sombra para el efecto de flotación */
  cursor: pointer;
  /* Cambia el cursor al pasar por encima */
  z-index: 1000;
  /* Asegura que esté en la parte superior */
  transition: background-color 0.3s;
}

.floating-whatsapp:hover {
  background-color: #52c4b6;
  /* Color más oscuro al pasar el mouse */
}

.fab {
  color: white;
  /* Color del icono */
  font-size: 28px;
  /* Tamaño del icono */
}

/* // crear root */

body {
  background-color: #f9fafb !important;
}

:root {
  --azul-primary: #1764ffff;
  --lila-primary: #e81eb2ff;

  /* // los de arriba en color bebe */
  --azul-primary-b: #d4e1fc;
  --lila-primary-b: rgba(245, 200, 233, 0.8);
  --gray-primary: #fcfcfcff;
}

a {
  text-decoration: none !important;
}

nav a {
  color: #636363!important;
}

.bg-blueGray-700 {
  background-color: #2b3945 !important;
}

.bg-blueGray-100 {
  background-color: #f9fafb !important;
}

.bg-blueGray-200 {
  background-color: #edf2f7 !important;
}

.bg-blueGray-300 {
  background-color: #e2e8f0 !important;
}

.bg-blueGray-400 {
  background-color: #cbd5e0 !important;
}

.bg-blueGray-500 {
  background-color: #a0aec0 !important;
}

.bg-blueGray-600 {
  background-color: #718096 !important;
}

.bg-blueGray-800 {
  background-color: #1a202c !important;
}

.text-blueGray-100 {
  color: #f9fafb !important;

}

.text-blueGray-200 {
  color: #edf2f7 !important;
}

.text-blueGray-300 {
  color: #e2e8f0 !important;
}

.text-blueGray-400 {
  color: #cbd5e0 !important;
}

.text-blueGray-500 {
  color: #a0aec0 !important;
}

.text-blueGray-600 {
  color: #718096 !important;
}

.text-blueGray-700 {
  color: #2b3945 !important;
}

.bg-app-primary {
  background-color: var(--azul-primary);
}

.bg-app-secondary {
  background-color: var(--lila-primary);
}

.bg-app-tercery {
  background-color: var(--gray-primary);
}

.bg-app-primary:hover {
  background-color: #5aa3e6;
  /* Un azul más oscuro pero aún suave */
}

.bg-app-secondary:hover {
  background-color: #d195d3;
  /* Un lila más oscuro pero en la misma tonalidad pastel */
}

.hover:hover {
  cursor: pointer;
}

.bg-app-primary-b {
  background-color: rgb(212, 225, 252);
}

.bg-app-secondary-b {
  background-color: rgba(245, 200, 233, 0.8);
}

.text-app-primary {
  color: var(--azul-primary);
}

.text-app-secondary {
  color: var(--lila-primary);
}

.text-app-primary-b {
  color: rgb(212, 225, 252);
}

.text-app-secondary-b {
  color: rgba(245, 200, 233, 0.8);
}

.text-primary-p {
  color: rgba(100, 116, 139, 1)
}

/* .vue-treeselect__input-container {
  padding: 0 !important;
  width: 100% !important;
  height: 2.8rem !important;
}

.vue-treeselect__control {
  padding: 0 !important;
}

.vue-treeselect--multi .vue-treeselect__input {
  padding-top: none !important;
}

.vue-treeselect__input {
  padding: 0.5rem !important;
  width: 100% !important;
  height: 1.8rem !important;
} */

.el-select__wrapper {
  width: 100% !important;
  height: 3rem !important;
}

.el-select__input {
  padding: 0.5rem !important;
  width: auto;
}

.el-tree-select__popper {
  position: absolute;
  top: 100%;
  /* Hace que aparezca justo debajo del campo */
  left: 0;
  z-index: 1000;
  /* Asegura que esté por encima de otros elementos */
}

.h-350-px{
  height: 350px!important;
}

.tree-select-container {
  width: 300px !important;
}

.custom-tree-select {
  width: 100% !important;
}

.el-tree-select__tags {
  flex-wrap: wrap;
  /* Permitir que las etiquetas se envuelvan */
  max-height: 50px;
  /* Altura máxima para las etiquetas */
  overflow-y: auto;
  /* Habilitar scroll si es necesario */
}

.el-input {
  min-height: 38px;
  /* Ajustar altura mínima del input */
}

/*
.el-select__input-wrapper{
  padding: 0.5rem !important;
  width: 100% !important;
} */


.b-form-tags-input {
  padding: 10px !important;
  height: 2.8rem !important;
}

form label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* TIPO TEXT O password */
input[type="text"],
input[type="password"],
input[type="email"],
input[type="number"],
textarea {
  border: 0.6px solid #e4e4e4;
  margin: 0;
  padding: 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #4b5563;
  background-color: #fff !important;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  box-shadow: 0 0 0 1px rgba(209, 213, 219, 0.3);
  outline: none;
  transition: all 0.15s ease;
  width: 100%;
}

textarea {
  margin: 0 !important;
}

input.border-red,
.error textarea {
  border: 1px solid #f87171;
}

div.error select {
  border: 1px solid #f87171;
}

.mx-datepicker {
  width: 100% !important;
  padding: 0px !important;
}

.mx-input-wrapper input {
  padding: 1.4rem !important;
}

button.disabled {
  background-color: #f7f7f7 !important;
  color: #a0aec0 !important;
  cursor: not-allowed !important;
}

button.disabled:hover {
  cursor: no-drop !important;
}

select {
  padding: .75rem !important;
  margin: 0 !important;
}


.btn-create {
  background-color: #10b981 !important;
  color: white !important;
}

.btn-delete {
  background-color: #f87171 !important;
  color: white !important;
  border: none !important;
}

.btn-edit {
  background-color: #f59e0b !important;
  color: white !important;
  border: none !important;
}

.btn-save {
  background-color: #34d399 !important;
  color: white !important;
  border: none !important;
}

.btn-export {
  background-color: #e11d48 !important;
  color: white !important;
}

.btn-search {
  background-color: #3b82f6 !important;
  color: white !important;
  border: none !important;
}

.btn-regresar {
  background-color: #000000 !important;
  color: var(--gray-primary) !important;
  border: none !important;
}

.btn-view {
  background-color: #707070 !important;
  color: rgb(255, 255, 255) !important;
  border: none !important;
}

.bton {
  padding: 0.5rem 1rem !important;
  border-radius: 0.375rem !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.15s ease !important;
  outline: none !important;
  border: none !important;
}

.dropdown-menu li {
  font-size: 0.875rem !important;
  padding: 0.3rem 1rem !important;
  font-weight: 400 !important;
}

.dropdown-menu li:hover {
  background-color: #ecf6ff !important;
}


.mx-calendar-content table td,
.mx-calendar-content table th {
  padding: 0.5rem !important;
  text-align: center !important;
}

.mx-calendar-content table td.active,
.mx-calendar-content table td.active {
  color: var(--azul-primary) !important;
  background-color: #f7f7f7 !important;
}


/* // input file */
input[type=file]::file-selector-button {
  margin-right: 20px;
  border: none;
  background: #084cdf;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background .2s ease-in-out;
}

input[type=file]::file-selector-button:hover {
  background: #0d45a5;
}

input[type=file] {
  background-color: var(--gray-primary) !important;
  border-radius: 0.375rem;
  border: 1px solid #e4e4e4;
}



.mx-calendar-panel-date {
  padding: 0 !important;
}


span.message {
  color: #f87171;
  font-size: 0.75rem;
}

form div.error input {
  border: 1px solid #f87171;
}

@media (max-width: 768px) {
  .sm-text-center {
    text-align: center;
  }
}


.vld-overlay .vld-icon svg {
  fill: var(--azul-primary);
  width: 70px;
  height: 70px;
}


.nav-tabs .nav-link.active {
  background-color: rgb(255, 255, 255) !important;
  color: rgb(96, 96, 96);
}


.form-switch input {
  /* // color */
  color: var(--azul-primary) !important;
}

.form-check-input:checked {
  background-color: var(--azul-primary) !important;
  border-color: var(--azul-primary) !important;
}


input:disabled {
  background-color: #f8f8f8 !important;
  color: #a0aec0;
  cursor: not-allowed;
}

form {
  padding: .5rem;
}

.pagination {
  display: flex !important;
}
</style>