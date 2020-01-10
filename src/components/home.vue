<template>
  <span>
    <v-container class="content mb-3 pb-3">
      <v-flex class="mt-6 sm12">
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
            <v-row>
              <v-col col="12">
                <v-autocomplete v-model="cancer_id" :items="cancer_id_list" filled chips color="blue-grey lighten-2" label="病种选择" item-text="name" item-value="id" @change='getCancerDetail'>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" v-show="cancer.cancer_properties_list">
                <v-combobox v-model="cancer.cancer_properties" :items="cancer.cancer_properties_list" filled chips color="blue-grey lighten-2" label="病种描述" multiple>
                </v-combobox>
              </v-col>
              <v-col cols="12" v-show="cancer.gene_list">
                <v-combobox v-model="cancer.gene" :items="cancer.gene_list" filled chips color="blue-grey lighten-2" label="基因检测" multiple>
                </v-combobox>
              </v-col>
              <v-col cols="12" v-show="cancer.treated_history_list">
                <v-combobox v-model="cancer.treated_history" :items="cancer.treated_history_list" filled chips color="blue-grey lighten-2" label="既往治疗" multiple>
                </v-combobox>
              </v-col>
              <v-col col="12" v-show="cancer.menopause_show">
                <v-radio-group v-model="cancer.menopause" row class="ml-3">
                  <v-radio label="已经绝经" value="1"></v-radio>
                  <v-radio label="尚未绝经" value="0"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col col="12" v-show="cancer.treated_num_show">
                <v-select :items="treated_num_list" label="既往治疗次数" filled v-model="cancer.treated_num"></v-select>
              </v-col>
            </v-row>
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
      <v-flex class="mt-6 sm12" v-for="(item, index) in current_projects" :key="index">
        <project-detail :description="item.description" :category="item.category_L1" :person="item.person_in_charge" :exclusion="item.exclusion"></project-detail>
      </v-flex>
      <div class="text-center mt-4">
        <v-pagination v-model="page" :length="page_lengths" v-show="projects">
        </v-pagination>        
      </div>
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
        current_projects: [],
        isUpdating: false,
        cancer_id_list: [],
        treated_num_list:[0,1,2,3,4,5,6,7,8,9],
        page: 1,
        per_page: 2,
        page_lengths: 0

      }
    },

    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
      page (val) {
        if (val) {
          this.current_projects = []
          if (val * this.per_page > this.projects.length) {
            for (var i = (val-1) * this.per_page; i < this.projects.length; i++) 
            {
              this.current_projects.push(this.projects[i])
            }
          }else{
            for (var j = (val-1) * this.per_page; j < val * this.per_page; j++) 
            {
              this.current_projects.push(this.projects[j])
            }
          }
        }
      }
    },

    methods: {
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
          this.page_lengths = Math.ceil(this.projects.length/2)
          for (var i = 0; i < this.per_page; i++) {
            this.current_projects.push(this.projects[i])
          }
        })
      },
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
  margin-top: 25;
}

</style>