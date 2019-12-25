<template>
  <v-card class="mx-auto" max-width="1200">
    <v-app-bar color="teal lighten-3" dark>
      <v-toolbar-title>项目推荐</v-toolbar-title>
    </v-app-bar>
    <v-form class="pa-4 pt-6">
      <v-textarea readonly rows="1" filled auto-grow label="项目描述" v-model="description"></v-textarea>
      <v-text-field readonly filled label="病种分类" v-model="category"></v-text-field>
      <v-text-field readonly filled label="病种分类" v-model="person"></v-text-field>
      <v-textarea readonly rows="1" filled auto-grow label="排除标准" v-model="exclusion"></v-textarea>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    props: ['description', 'category', 'person', 'exclusion']
  }
</script>