
<template>
  <div>
    <!-- <navbar /> -->
    <main>
      <section class="relative w-full h-full min-h-screen">
        <router-view />
      </section>
      <!-- <FooterComponent /> -->
    </main>
  </div>
</template>
<script>
// import Navbar from "@/components/Navbars/AuthNavbar.vue";
// import FooterComponent from "@/components/Footers/Footer.vue";

export default {
  data() {
    return {
    };
  },
  components: {
    // Navbar,
    // FooterComponent
  },
};
</script>


