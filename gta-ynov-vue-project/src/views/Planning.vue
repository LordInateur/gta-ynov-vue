<template>
  <div class="planning">
    <div class="row main">
      <div class="col-xl-4" v-if="canEditName">
        <SearchUser v-on:loadUser="loadUser"/>
      </div>
      <div v-bind:class="{'col-xl-8': canEditName, 'container': !canEditName}">
        
        <h1>Planning</h1>



      </div> 
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchUser from '@/components/SearchUser.vue'

export default {
  name: 'planning',
  components: {
    SearchUser
  },
  created : function() {

  },
  data : function(){
    return {

    }
  },
  methods : {

  },
  computed : {},
  watch : {}
};
</script>



<style scoped>

</style>