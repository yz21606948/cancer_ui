<template>
  <v-card class="mx-auto" max-width="1200">
    <v-app-bar color="teal lighten-3" dark scroll-target="#scrolling-projects">
      <v-toolbar-title>项目推荐</v-toolbar-title>
    </v-app-bar>
    <v-sheet id="scrolling-projects" class="overflow-y-auto" max-height="600">
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <v-subheader>项目描述</v-subheader>
          </v-col>
          <v-col class="auto">
            <v-textarea readonly row-height="12" filled auto-grow v-model="description"></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-subheader>病种分类</v-subheader>
          </v-col>
          <v-col class="auto">
            <v-text-field readonly filled v-model="category"></v-text-field>
          </v-col>
        </v-row>
        <v-row v-show="person">
          <v-col cols="2">
            <v-subheader>项目负责</v-subheader>
          </v-col>
          <v-col class="auto">
            <v-text-field readonly filled v-model="person"></v-text-field>
          </v-col>
        </v-row>
        <v-row v-show="exclusion">
          <v-col cols="2" >
            <v-subheader>排除标准</v-subheader>
          </v-col>
          <v-col class="auto">
            <v-textarea readonly row-height="12" filled auto-grow v-model="exclusion"></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
  export default {
    props: ['description', 'category', 'person', 'exclusion']
  }
</script>