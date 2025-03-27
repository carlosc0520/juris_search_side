<template>
  <div class="container-inicio pt-5">
    <h2 class="text-center text-xl font-bold mb-2 pt-5">Síguenos en Instagram</h2>
    <p class="text-center mb-5">Descubre nuestras últimas publicaciones y actualizaciones.</p>
    <iframe src="https://www.instagram.com/juris.search/embed" class="frame-instagram m-0" frameborder="0"
      scrolling="no" allowfullscreen></iframe>
  </div>
</template>
<script>

export default {
  name: "dashboard-page",
  components: {

  },
  data() {
    return {
      head: {
        USUARIOS: 0,
        ENTRADAS: 0
      },
    };
  },
};
</script>

<style scoped>
.frame-instagram {
  width: 100%;
  height: 100%;
  min-height: 1100px;
  border: 0;
  margin: 20px 0 50px 0;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 8px 2px 14px 1px rgba(214, 214, 214, 0.45);
  -webkit-box-shadow: 8px 2px 14px 1px rgba(214, 214, 214, 0.45);
  -moz-box-shadow: 8px 2px 14px 1px rgba(214, 214, 214, 0.45);
}

.container-inicio{
  margin: 0 auto;
  max-width: 80%!important;
}

@media (max-width: 768px) {
  .container-inicio{
    max-width: 95%!important;
  }

  .frame-instagram {
    min-height: 500px;
  }
}
</style>