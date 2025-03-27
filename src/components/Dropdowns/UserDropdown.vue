<template>
  <div class="user-menu">
    <a href="javascript:void(0);" class="icon-btn">
      <img src="@/assets/img/icons/campany.svg" alt="Notificaciones" />
    </a>

    <div class="linea-separadora"></div>

    <a class="avatar-wrapper" href="javascript:void(0);">
      <span class="avatar">
        <img
          id="IMAGEN_AVATAR_LOGIN"
          alt="Avatar"
          class="avatar-img"
          :src="RTAFTO || team2"
          v-on:error="team2"
        />
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
  color: white!important;
  padding: 8px 16px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  text-align: center;
}


</style>

<script>
import { createPopper } from "@popperjs/core";

import team2 from "@/assets/img/resources/perfil.png";
import LoginProxy from "../../proxies/LoginProxy";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      team2,

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
    async signOut() {
      await LoginProxy.logout();

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      this.$router.push("/auth/login");
    },
  },
  mounted() {
    this.USUARIO = JSON.parse(localStorage.getItem("user")) || {};
  },
};
</script>
