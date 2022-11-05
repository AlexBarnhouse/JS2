Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                   <input type="text" class="search-input" v-model="userSearch">
                   <input type="submit" class="search-submit" value="Search">
               </form>`
})