// layouts

import Admin from "@/layouts/Admin.vue";
import Usuario from "@/layouts/Usuario.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
// import Tables from "@/views/admin/Tables.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";

// * CONTACTO
import Contacto from "@/views/Contacto.vue";
import Question from "@/views/Question.vue";
import Politicas from "@/views/Politicas.vue";
import Cookies from "@/views/Cookies.vue";

// * ADMIN
import Usuarios from "@/views/admin/Usuarios.vue";
import Mantenimiento from "@/views/admin/Mantenimiento.vue";
import Entradas from "@/views/admin/Entradas.vue";
import Filtros from "@/views/admin/Filtros.vue";
import Busqueda from "@/views/admin/Busqueda.vue";
import Favorites from "../views/admin/Favorites.vue";
import Boletines from "../views/admin/Boletines.vue";

import UserProxy from "../proxies/UserProxy";
import BusquedaUser from "../views/admin/BusquedaUser.vue";
import FavoritesUser from "../views/admin/FavoritesUser.vue";
import DashboardUser from "../views/admin/DashboardUser.vue";
import Reporte from "../views/admin/Reporte.vue";

const ifAuthenticatedAuth = async (to, from, next) => {
  await UserProxy.validate()
    .then((response) => {
      if (response?.STATUS && response.DATA.IDR === 2) {
        to.params.role = response.DATA;
        next();
      } else {
        next("/auth/login");
      }
    })
    .catch(() => {
      next("/auth/login");
    });
};

const ifAuthenticatedAdmin = async (to, from, next) => {
  try {
    await UserProxy.validate()
      .then((response) => {
        if (response?.STATUS && (response.DATA.IDR === 0 || response.DATA.IDR === 1)) {
          to.params.role = response.DATA;
          next();
        } else {
          next("/auth/login");
        }
      })
      .catch(() => {
        next("/auth/login");
      });
  } catch (error) {
    next("/auth/login");
  }
};

const routes = [
  {
    path: "/redirect",
    beforeEnter: async (to, from, next) => {
      try {
        await UserProxy.validate()
          .then((response) => {
            if (response?.STATUS) {
              if (response.DATA.IDR === 0 || response.DATA.IDR === 1) {
                next("/admin");
              }

              if (response.DATA.IDR === 2) {
                next("/usuario");
              }
            } else {
              next("/auth/login");
            }
          })
          .catch(() => {
            next("/auth/login");
          });
      } catch (error) {
        next("/auth/login");
      }
    },
  },
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        beforeEnter: ifAuthenticatedAdmin,
        component: Dashboard,
      },
      {
        path: "/admin/entradas",
        beforeEnter: ifAuthenticatedAdmin,
        component: Entradas,
        props: (route) => {
          return {
            role: route?.params?.role || [],
          };
        }
      },
      {
        path: "/admin/usuarios",
        beforeEnter: ifAuthenticatedAdmin,
        component: Usuarios,
        props: (route) => {
          return {
            role: route?.params?.role || [],
          };
        }
      },
      {
        path: "/admin/mantenimiento",
        beforeEnter: ifAuthenticatedAdmin,
        component: Mantenimiento,
        props: (route) => {
          return {
            role: route?.params?.role || [],
          };
        }
      },
      {
        path: "/admin/filtros",
        beforeEnter: ifAuthenticatedAdmin,
        component: Filtros,
        props: (route) => {
          return {
            role: route?.params?.role || [],
          };
        }
      },
      {
        path: "/admin/settings",
        beforeEnter: ifAuthenticatedAdmin,
        component: Settings,
        props: (route) => {
          return {
            role: route?.params?.role || [],
          };
        }
      },
      {
        path: "/admin/busqueda",
        beforeEnter: ifAuthenticatedAdmin,
        component: Busqueda,
        props: (route) => {
          return {
            role: route?.params?.role || [],
          };
        }
      },
      {
        path: "/admin/favoritos",
        beforeEnter: ifAuthenticatedAdmin,
        component: Favorites,
        props: (route) => {
          return {
            role: route?.params?.role || [],
          };
        }
      },
      {
        path: "/admin/boletines",
        beforeEnter: ifAuthenticatedAdmin,
        component: Boletines,
        props: (route) => {
          return {
            role: route?.params?.role || [],
          };
        }
      },
      {
        path: "/admin/reportes",
        beforeEnter: ifAuthenticatedAdmin,
        component: Reporte,
        props: (route) => {
          return {
            role: route?.params?.role || [],
          };
        }
      }
    ],
  },
  {
    path: "/usuario",
    redirect: "/usuario/dashboard",
    component: Usuario,
    children: [
      {
        path: "/usuario/dashboard",
        component: DashboardUser,
        beforeEnter: ifAuthenticatedAuth,
      },
      {
        path: "/usuario/settings",
        component: Settings,
        beforeEnter: ifAuthenticatedAuth,
      },
      {
        path: "/usuario/busqueda",
        component: BusquedaUser,
        beforeEnter: ifAuthenticatedAuth,
        props: (route) => {
          return {
            role: route?.params?.role || [],
          };
        },
      },
      {
        path: "/usuario/favoritos",
        component: FavoritesUser,
        beforeEnter: ifAuthenticatedAuth,
        props: (route) => ({
          role: route?.params?.role || [],
        }),
      },
      {
        path: "/usuario/reportes",
        beforeEnter: ifAuthenticatedAuth,
        component: Reporte,
        props: (route) => {
          return {
            isUser: true,
            role: route?.params?.role || [],
          };
        }
      }
    ],
  },
  {
    path: "/auth",
    redirect: "/auth",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/autoUser/:token",
        component: Register,
      },
    ],
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/",
    component: Index,
  },
  {
    path: "/contacto",
    component: Contacto,
  },
  {
    path: "/questions",
    component: Question,
  },
  {
    path: "/politicas&privacidad",
    component: Politicas,
  },
  {
    path: "/cookies",
    component: Cookies,
  },
  {
    path: "/noticias",
    component: () => import("@/views/Noticias.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

export default routes;
