<template>
  <v-app>
    <div v-if="!guest">
    <navbar/>
    <sidebar/>
    <v-content class="mx-4 mb-4 mt-2">
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>
    <c-alert/>
    <v-dialog v-model="dialog" persistent max-width="600px" transition="dialog-bottom-transition">
      <component :is="currentComponent"></component>
    </v-dialog>
    </div>
    <div v-else>
      <Login/>
    </div> 
  </v-app>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import {mapActions , mapGetters} from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    CAlert: () => import('@/components/CAlert.vue'),
    UserEdit: ()=> import('@/components/UserEdit.vue'),
    CUAnggota: ()=> import('@/components/CUAnggota.vue'),
    CUBooks: ()=> import('@/components/CUBooks.vue'),
    ShowBook: ()=> import('@/components/ShowBook.vue'),
    Login: ()=> import('@/views/Login.vue'),

  },
  data () {
    return {
      //
    }
  },

  methods:{
    ...mapActions({
      setDialog: 'dialog/setDialog',
      setAuth: 'auth/set'
    })
  },

  computed:{
    ...mapGetters({
      statusDialog: 'dialog/statusDialog',
      currentComponent: 'dialog/currentComponent',
      guest:'auth/guest'
    }),

    dialog:{
      get(){
        return this.statusDialog
      },
      set(value){
        this.setDialog(value)
      }
    }
  }
}
</script>
