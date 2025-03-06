<template>
  <div>
    <a class="text-blueGray-500 block" href="#pablo" ref="btnDropdownRef" v-on:click="toggleDropdown($event)">
      <div class="items-center flex">
        <span class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
          <img id="IMAGEN_AVATAR_LOGIN" alt="..." class="w-full rounded-full align-middle border-none shadow-lg" :src="RTAFTO || team2" v-on:error="team2" /> 
        </span>
      </div>
    </a>
    <div ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48" v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }">
      <a href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        <div>
          <span class="text-sm text-blueGray-400">Bienvenido, {{ USUARIO.NOMBRES }}</span>
        </div>
        <div>
          <span class="text-sm text-blueGray-400">{{ USUARIO.EMAIL?.toLowerCase() }}</span>
        </div>
      </a>
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <a href="javascript:void(0);" :onclick="signOut"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Cerrar Sesión &nbsp;<i class="fas fa-sign-out-alt"></i>
      </a>
    </div>
  </div>
</template>

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
