<template>
  <v-toolbar dark class="header primary">
    <v-toolbar-title class="white--text headline">
      <router-link :to="{name: 'home'}" class="white--text no-text-decoration">临床招募助手</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
  export default {
    
  }
</script>

<style>
  .center {
    text-align:center !important;
  }
  .my-avatar {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    text-align: center;
    padding-top: 5px;
  }
  .no-margin {
    margin: 0px;
  }
</style>