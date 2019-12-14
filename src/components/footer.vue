<template>
  <v-footer class="pa-3" fixed>
    <v-spacer></v-spacer>
    <div>© {{ new Date().getFullYear() }} 阿里通数据有限公司</div>
  </v-footer>
</template>

<script>
  export default {

  }
</script>

<style>
.footer {
  bottom: -10px;
  height: 20px;
}
</style>