<template>
  <div class="user-menu">
    <button class="notification-btn" @click="toggleSidebarNotificaciones">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
      <span v-if="totalNotificaciones > 0" class="notification-badge">
        {{ totalNotificaciones > 99 ? '99+' : totalNotificaciones }}
      </span>
    </button>

    <div class="overlay-backdrop" v-if="sidebarNotificacionesShow" @click="closeSidebarNotificaciones"></div>

    <!-- Notifications Sidebar -->
    <transition name="slide-fade">
      <div v-if="sidebarNotificacionesShow" class="notifications-sidebar">
        <div class="sidebar-header">
          <div class="header-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <h3>Notificaciones</h3>
          </div>
          <button class="close-btn" @click="closeSidebarNotificaciones">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="notifications-content">
          <div v-for="(notificacion, index) in notificaciones" :key="index" class="notification-card">
            <div class="notification-icon" :class="notificacion.TIPO == 1 ? 'type-request' : 'type-info'">
              <svg v-if="notificacion.TIPO == 1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
            
            <div class="notification-body">
              <p class="notification-message">{{ notificacion.DESCP }}</p>
              <div class="notification-footer">
                <span class="notification-time">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ notificacion.FECHA }}
                </span>
                <div v-if="notificacion.ESTADO == 0" class="notification-actions">
                  <button class="action-btn accept-btn" @click="updateContacto(notificacion)" title="Aceptar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                  <button class="action-btn decline-btn" @click="deleteContacto(notificacion)" title="Eliminar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="notificaciones.length === 0" class="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <p>No hay notificaciones</p>
            <span>Estás al día</span>
          </div>
        </div>
      </div>
    </transition>

    <div class="divider"></div>

    <div class="user-avatar">
      <img :src="RTAFTO || team2" @error="$event.target.src = team2" alt="Avatar" />
    </div>

    <button ref="btnDropdownRef" class="dropdown-toggle" @click="toggleDropdown">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
           :class="{ 'rotate-180': dropdownPopoverShow }">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <transition name="dropdown-fade">
      <div v-if="dropdownPopoverShow" ref="popoverDropdownRef" class="user-dropdown">
        <div class="dropdown-user-info">
          <div class="user-avatar-large">
            <img :src="RTAFTO || team2" @error="$event.target.src = team2" alt="Avatar" />
          </div>
          <div class="user-details">
            <span class="user-name">{{ USUARIO.NOMBRES }}</span>
            <span class="user-email">{{ USUARIO.EMAIL?.toLowerCase() }}</span>
          </div>
        </div>
        
        <div class="dropdown-divider"></div>
        
        <button class="logout-btn" @click="signOut">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </transition>
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
      // ACTUALIZAR NOTIFICACIONES A 0 
      if (this.totalNotificaciones > 0) {
        UserProxy.updateView()
          .then(() => {
            this.totalNotificaciones = 0;
          })
          .catch((error) => {
            console.error("Error al actualizar la vista de notificaciones:", error);
          });
      }
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
            this.totalNotificaciones = this.notificaciones.filter((notificacion) => notificacion.CESTDO =='A').length;
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
/* ===== USER MENU MODERN ===== */
.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

/* Notification Button */
.notification-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-btn svg {
  color: #4a5568;
  transition: all 0.3s ease;
}

.notification-btn:hover {
  background: linear-gradient(135deg, rgba(223, 45, 178, 0.05) 0%, rgba(24, 92, 230, 0.05) 100%);
  border-color: #DF2DB2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(223, 45, 178, 0.15);
}

.notification-btn:hover svg {
  color: #DF2DB2;
  transform: scale(1.1);
}

.notification-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: linear-gradient(135deg, #DF2DB2 0%, #E71FB3 100%);
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(223, 45, 178, 0.4);
  animation: pulse-badge 2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Overlay */
.overlay-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 998;
  animation: fadeIn 0.3s ease;
}

/* Notifications Sidebar */
.notifications-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  z-index: 999;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
  color: white;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-title h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: rotate(90deg);
}

.close-btn svg {
  color: white;
}

/* Notifications Content */
.notifications-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.notification-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.notification-card:hover {
  border-color: #DF2DB2;
  box-shadow: 0 4px 12px rgba(223, 45, 178, 0.1);
  transform: translateX(-4px);
}

.notification-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.notification-icon.type-request {
  background: linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(56, 161, 105, 0.1) 100%);
  color: #48bb78;
}

.notification-icon.type-info {
  background: linear-gradient(135deg, rgba(24, 92, 230, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
  color: #185CE6;
}

.notification-body {
  flex: 1;
  min-width: 0;
}

.notification-message {
  font-size: 0.875rem;
  color: #2d3748;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
  word-break: break-word;
}

.notification-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.notification-time {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: #718096;
}

.notification-time svg {
  flex-shrink: 0;
}

.notification-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.accept-btn {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.accept-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
}

.decline-btn {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
}

.decline-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-state svg {
  color: #cbd5e0;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1.125rem;
  font-weight: 600;
  color: #4a5568;
  margin: 0 0 0.5rem 0;
}

.empty-state span {
  font-size: 0.875rem;
  color: #a0aec0;
}

/* Divider */
.divider {
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, transparent, #e2e8f0, transparent);
}

/* User Avatar */
.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.user-avatar:hover {
  border-color: #DF2DB2;
  box-shadow: 0 4px 12px rgba(223, 45, 178, 0.2);
  transform: scale(1.05);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Dropdown Toggle */
.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dropdown-toggle svg {
  color: #4a5568;
  transition: all 0.3s ease;
}

.dropdown-toggle:hover {
  background: linear-gradient(135deg, rgba(223, 45, 178, 0.05) 0%, rgba(24, 92, 230, 0.05) 100%);
  border-color: #DF2DB2;
}

.dropdown-toggle:hover svg {
  color: #DF2DB2;
}

.dropdown-toggle svg.rotate-180 {
  transform: rotate(180deg);
}

/* User Dropdown */
.user-dropdown {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  min-width: 280px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  z-index: 1000;
  border: 2px solid #e2e8f0;
}

.dropdown-user-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.user-avatar-large {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
  flex-shrink: 0;
}

.user-avatar-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.user-name {
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-email {
  font-size: 0.875rem;
  color: #718096;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 1rem 0;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #DF2DB2 0%, #E71FB3 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(223, 45, 178, 0.3);
  background: linear-gradient(135deg, #c528a0 0%, #d01aa4 100%);
}

.logout-btn:active {
  transform: translateY(0);
}

/* Animations */
.slide-fade-enter-active {
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  animation: slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease;
}

.dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive */
@media (max-width: 768px) {
  .notifications-sidebar {
    width: 100%;
  }
  
  .user-dropdown {
    right: -1rem;
  }
}
</style>