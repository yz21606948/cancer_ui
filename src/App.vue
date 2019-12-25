<template>
  <v-app application--light class="wrapper mb-6">
    <app-header></app-header>
    <div class="content mb-3 pb-3">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>
<style>
html,
body {
  margin:0;
  padding:0;
  height: 100%;
}

.application {
  background: white;
}
.wrapper {
  min-height:100%;
}
.content {
  width: 100%;
  min-height:100%;
  position: relative;
}

.rigth {
  text-align:right !important;
}

.no-text-decoration {
  text-decoration: none ;
}

</style>

