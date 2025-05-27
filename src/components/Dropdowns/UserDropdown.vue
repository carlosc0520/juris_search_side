<template>
  <div class="user-menu">
    <a href="javascript:void(0);" class="icons-notificaciones icon-btn" @click="toggleSidebarNotificaciones">
      <img src="@/assets/img/icons/campany.svg" alt="Notificaciones" />
      <p
      v-if="totalNotificaciones > 0"
      >
        {{ totalNotificaciones }}
    </p>
    </a>

    <div class="overlay-degrad" v-if="sidebarNotificacionesShow" @click="closeSidebarNotificaciones">
    </div>

    <!-- Sidebar (off-canvas) -->
    <div
      class="fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 w-sidebar"
      v-if="sidebarNotificacionesShow"
      :class="{ 'translate-x-0': sidebarNotificacionesShow, 'translate-x-full': !sidebarNotificacionesShow }">

      <div class="flex justify-between items-center p-4 border-b">
        <span class="font-bold">Notificaciones</span>
        <button class="float-right text-gray-500" @click="closeSidebarNotificaciones">
          <img src="@/assets/img/icons/close.svg" alt="Cerrar" class="w-4 h-4" />
        </button>
      </div>

      <!-- Iterar notificaciones -->
      <div class="p-4">
        <div v-for="(notificacion, index) in notificaciones" :key="index" class="flex items-center mb-4 border-b pb-2">
          <div style="width: fit-content" v-if="notificacion.TIPO == 1"
            class="flex-shrink-0 mr-3 w-10 bg-blue-100 rounded-full flex flex-col">
            <p class="text-sm font-semibold text-gray-700 notificacion-text">{{ notificacion.DESCP }}</p>
            <div class="flex justify-between items-end mt-2">
              <p class="m-0 flex align-items-end text-xs text-gray-500 notificacion-text">{{ notificacion.FECHA }}</p>
              <div class="flex items-center gap-2" v-if="notificacion.ESTADO == 0">
                <img src="@/assets/img/icons/check.svg" alt="check" class="cursor-pointer w-4 h-4"
                  @click="updateContacto(notificacion)" />
                <img src="@/assets/img/icons/delete.svg" alt="delete" class="cursor-pointer w-4 h-4"
                  @click="deleteContacto(notificacion)" />
              </div>
            </div>
          </div>
          <div style="width: fit-content" v-if="notificacion.TIPO == 2"
            class="flex-shrink-0 mr-3 w-10 bg-blue-100 rounded-full flex flex-col">
            <p class="text-sm font-semibold text-gray-700 notificacion-text">{{ notificacion.DESCP }}</p>
            <div class="flex justify-between items-end mt-2">
              <p class="m-0 flex align-items-end text-xs text-gray-500 notificacion-text">{{ notificacion.FECHA }}</p>
            </div>
          </div>
        </div>
        <div v-if="notificaciones.length === 0" class="text-center text-gray-500">
          No hay notificaciones disponibles.
        </div>
      </div>
    </div>


    <div class="linea-separadora"></div>

    <a class="avatar-wrapper" href="javascript:void(0);">
      <span class="avatar">
        <img id="IMAGEN_AVATAR_LOGIN" alt="Avatar" class="avatar-img" :src="RTAFTO || team2" v-on:error="team2" />
      </span>
    </a>

    <a href="javascript:void(0);" ref="btnDropdownRef" class="dropdown-btn" v-on:click="toggleDropdown">
      <img src="@/assets/img/icons/flecha-bottom.svg" alt="Abrir menú" />
    </a>

    <div ref="popoverDropdownRef" class="dropdown-menu mt-4" v-bind:class="{ show: dropdownPopoverShow }">
      <div class="dropdown-header">
        <span>Bienvenido, {{ USUARIO.NOMBRES }}</span>
        <span>{{ USUARIO.EMAIL?.toLowerCase() }}</span>
      </div>
      <div class="dropdown-divider"></div>
      <a href="javascript:void(0);" class="dropdown-item" :onclick="signOut">
        Cerrar Sesión
      </a>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

import team2 from "@/assets/img/resources/perfil.png";
import LoginProxy from "../../proxies/LoginProxy";
import UserProxy from "../../proxies/UserProxy";
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      dropdownPopoverShowNotificaciones: false,
      sidebarNotificacionesShow: false,
      team2,
      totalNotificaciones: 0,
      notificaciones: [],
      USUARIO: {
        NOMBRES: "",
        EMAIL: "",
        RTAFTO: "",
      }
    };
  },
  props: {
    RTAFTO: {
      type: String,
      default: "",
    },
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
    toggleSidebarNotificaciones() {
      this.sidebarNotificacionesShow = !this.sidebarNotificacionesShow;
    },
    closeSidebarNotificaciones() {
      this.sidebarNotificacionesShow = false;
    },
    async signOut() {
      await LoginProxy.logout();

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      this.$router.push("/auth/login");
    },
    async getNotifications() {
      await UserProxy.getNotificaciones()
        .then((response) => {
          if (response && response?.length > 0) {
            this.notificaciones = response.map((notificacion, index) => {
              return {
                ...notificacion,
                RN: index + 1,
              };
            });
            this.totalNotificaciones = this.notificaciones.length;
          } else {
            this.notificaciones = [];
          }
        })
        .catch((error) => {
          console.error("Error al obtener las notificaciones:", error);
          this.notificaciones = [];
        });
    },
    async deleteContacto(item) {
      await UserProxy.deleteContacto(item.ID)
        .then((response) => {
          const toastMessage = response.STATUS ? "Notificación eliminada." : response.MESSAGE;
          if (response.STATUS) {
            this.notificaciones = this.notificaciones.filter((notificacion) => notificacion.RN !== item.RN);
            this.totalNotificaciones = this.notificaciones.length;
            toast.success(toastMessage);
          } else {
            toast.error(toastMessage);
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la notificación:", error);
          toast.error("Error al eliminar la notificación.");
        });
    },
    async updateContacto(item) {
      await UserProxy.updateContacto({
        ID: item.ID,
        ESTADO: true,
      })
        .then((response) => {
          const toastMessage = response.STATUS ? "Contacto agregado correctamente." : response.MESSAGE;
          if (response.STATUS) {
            toast.success(toastMessage);
            this.notificaciones = this.notificaciones.map((notificacion) => {
              if (notificacion.ID === item.ID) {
                return {
                  ...notificacion,
                  ESTADO: 1,
                };
              }
              return notificacion;
            });

            this.totalNotificaciones = this.notificaciones.filter((notificacion) => notificacion.ESTADO === 0).length;
          } else {
            toast.error(toastMessage);
          }
        })
        .catch((error) => {
          console.error("Error al actualizar la notificación:", error);
          toast.error("Error al actualizar la notificación.");
        });
    }
  },
  mounted() {
    this.USUARIO = JSON.parse(localStorage.getItem("user")) || {};
    this.getNotifications();
  },
};
</script>


<style scoped>
.user-menu {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

/* 🔔 Icono de campana */
.icon-btn img {
  width: 24px;
  height: 24px;
  transition: transform 0.2s ease-in-out;
}

.icon-btn:hover img {
  transform: scale(1.1);
}

.linea-separadora {
  width: 1px;
  height: 24px;
  background-color: #ddd;
  margin: 0 12px;
}

/* 👤 Avatar */
.avatar-wrapper {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 🔽 Botón de menú */
.dropdown-btn img {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease-in-out;
}

.dropdown-btn:hover img {
  transform: rotate(180deg);
}

/* 📌 Dropdown */
.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  min-width: 180px;
  padding: 10px;
  display: none;
  flex-direction: column;
  z-index: 1000;
}

.dropdown-menu.show {
  display: flex;
}

/* Encabezado del dropdown */
.dropdown-header {
  font-size: 14px;
  color: #444;
  padding-bottom: 6px;
}

.dropdown-header span {
  display: block;
  margin-bottom: 4px;
}

/* Separador */
.dropdown-divider {
  height: 1px;
  background: #ddd;
  margin: 8px 0;
}

.dropdown-item {
  background: #E71FB3;
  color: white !important;
  padding: 8px 16px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  text-align: center;
}

.w-sidebar {
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.notificacion-text {
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.overlay-degrad {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

@media (max-width: 768px) {
  .w-sidebar {
    width: 100%;
  }
}

.icons-notificaciones{
  display: flex;
  align-items: center;
  gap: 4px;
}

.icons-notificaciones p {
  background-color: #ff6060;
  color: white !important;
  padding: 2px 6px;
  border-radius: 9999px;
  font-size: 12px;
  margin: 0;
}
</style>