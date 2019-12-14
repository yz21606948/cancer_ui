<template>
  <span>
    <v-container class="content">
      <v-layout row wrap>
        <v-flex sm12 class="component_margin">
          <v-card color="blue-grey darken-1" dark :loading="isUpdating" class="mx-auto" max-width="1200">  
            <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg">
              <v-row class="pa-4" align="center" justify="center">
                <v-col class="text-center">
                  <h3 class="headline">病种选择</h3>
                  <span class="grey--text text--lighten-1">请输入病种，并按回车结束进入搜素详情</span>
                </v-col>
              </v-row>
            </v-img>
            <v-form>
              <v-container>
                <v-row>
                  <v-col col="12">
                    <v-autocomplete v-model="cancer_id" :items="cancer_id_list" filled chips color="blue-grey lighten-2" label="病种选择" item-text="name" item-value="id" @change='getCancerDetail'>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" v-show="cancer.cancer_properties_list">
                    <v-autocomplete v-model="cancer.cancer_properties" :items="cancer.cancer_properties_list" filled chips color="blue-grey lighten-2" label="病种描述" item-text="name" item-value="name" multiple>
                      <template v-slot:selection="data">
                        <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" @click:close="remove_properties(data.item)">
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-content>
                            <v-list-item-title v-html="data.item.name"></v-list-item-title>
                            <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" v-show="cancer.gene_list">
                    <v-autocomplete v-model="cancer.gene" :items="cancer.gene_list" filled chips color="blue-grey lighten-2" label="基因检测" item-text="name" item-value="name" multiple>
                      <template v-slot:selection="data">
                        <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" @click:close="remove_gene(data.item)">
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-content>
                            <v-list-item-title v-html="data.item.name"></v-list-item-title>
                            <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" v-show="cancer.treated_history_list">
                    <v-autocomplete v-model="cancer.treated_history" :items="cancer.treated_history_list" filled chips color="blue-grey lighten-2" label="既往治疗" item-text="name" item-value="name" multiple>
                      <template v-slot:selection="data">
                        <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" @click:close="remove_treated_history(data.item)">
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-content>
                            <v-list-item-title v-html="data.item.name"></v-list-item-title>
                            <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col col="12" v-show="cancer.menopause_show">
                    <v-radio-group v-model="cancer.menopause" row>
                      <v-radio label="是" value="1"></v-radio>
                      <v-radio label="否" value="0"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col col="12" v-show="cancer.treated_num_show">
                    <v-select :items="treated_num_list" label="既往治疗次数" filled v-model="cancer.treated_num"></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions v-show="cancer_id">
              <v-spacer></v-spacer>
              <v-btn :loading="isUpdating" color="blue-grey darken-3" depressed @click="search_projects">
                提交
              </v-btn>
            </v-card-actions> 
          </v-card>
        </v-flex>
        <v-container fluid v-show="projects">
          <v-flex sm12 class="component_margin" v-for="(item, index) in projects" :key="index">
            <project-detail :description="item.description" :category="item.category_L1" :person="item.person_in_charge" :exclusion="item.exclusion"></project-detail>
          </v-flex>
        </v-container>
      </v-layout>
    </v-container>
  </span>
</template>

<script>
  import HTTP from '@/HTTP'
  import Project_detail from '@/components/project_detail'
  import helper from '@/help/helper.js'

  export default {
    components: {
      'project-detail': Project_detail
    },
    data () {
      return {
        cancer_id: null,
        cancer: {
          cancer_name: '',
          cancer_properties: [],
          gene: [],
          menopause: null,
          treated_num: null,
          treated_history: [],
          cancer_properties_list: null,
          gene_list: null,
          treated_history_list: null,
          menopause_show: false,
          treated_num_show: false
        },
        projects: null,
        isUpdating: false,
        cancer_id_list: [],
        treated_num_list:[0,1,2,3,4,5,6,7,8,9],
        title: 'The summer breeze'
      }
    },

    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },

    methods: {
      remove_properties (item) {
        const index = this.cancer.cancer_properties.indexOf(item.name)
        if (index >= 0) this.cancer.cancer_properties.splice(index, 1)
      },
      remove_gene(item) {
        const index = this.cancer.gene.indexOf(item.name)
        if (index >= 0) this.cancer.gene.splice(index, 1)
      },
      remove_treated_history(item) {
        const index = this.cancer.treated_history.indexOf(item.name)
        if (index >= 0) this.cancer.treated_history.splice(index, 1)
      },
      getCancerDetail(){
        this.cancer = helper.initCancerDetail()
        HTTP.get('cancer/' + this.cancer_id)
        .then(response => {
          var key_words = {}
          this.cancer.cancer_name = response.data.name
          key_words = JSON.parse(response.data.key_word)
          if (key_words.hasOwnProperty('cancer_properties_list')){
            this.cancer.cancer_properties_list = key_words.cancer_properties_list
          }
          if (key_words.hasOwnProperty('gene_list')){
            this.cancer.gene_list = key_words.gene_list
          }
          if (key_words.hasOwnProperty('treated_history_list')){
            this.cancer.treated_history_list = key_words.treated_history_list
          }
          if (key_words.hasOwnProperty('menopause')){
            this.cancer.menopause_show = true
          }
          if (key_words.hasOwnProperty('treated_num')){
            this.cancer.treated_num_show = true
          }
        })
      },
      search_projects(){
        var search_fitlers = {}
        search_fitlers.type_str = this.cancer.cancer_name + ";" + this.cancer.cancer_properties.join(';')
        if (this.cancer.gene.length > 0){
          search_fitlers.gene_str = this.cancer.gene.join(';')
        }
        if (this.cancer.treated_history.length > 0){
          search_fitlers.treated_str = this.cancer.treated_history.join(';')
        }
        if (this.cancer.menopause){
          search_fitlers.menopause_str = parseInt(this.cancer.menopause)
        }
        if (this.cancer.treated_num != null){
          search_fitlers.treated_num = parseInt(this.cancer.treated_num)
        }
        var api_url = 'cancer/' + this.cancer_id + '/project/search'
        HTTP.post(api_url, search_fitlers)
        .then(response => {
          this.projects = response.data
        })
      }
    },
    created () {
      HTTP.get('cancer')
      .then(response => {
        var data = response.data
        if (data && data.length > 0){
          for (var i = 0; i < data.length; i++) {
            var temp_name = data[i].name
            var temp_id = data[i].id
            this.cancer_id_list.push({'name':temp_name,'id':temp_id})
          }
        }
      })
    }
  }
</script>

<style>
.half {
  width: 50%;
}
.full {
  width: 100%;
}
.main {
  margin-top: 25px;
}
.component_margin {
  margin: 60px;
}
</style>