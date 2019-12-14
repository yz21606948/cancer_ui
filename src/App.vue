<template>
  <v-app application--light class="wrapper">
    <app-header></app-header>
    <div class="content">
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
  /*margin-bottom: 30px;*/
}
.content {
  width: 100%;
  min-height:100%;
  position: relative;
  margin-bottom: 30px;
  padding-bottom: 30px;
}

.rigth {
  text-align:right !important;
}

.no-text-decoration {
  text-decoration: none ;
}

</style>

<style scoped>
@media only screen and (min-width: 600px) {
  .container {
      max-width: 1024px;
  }
}  
</style>