<template>
  <v-card>
      <v-container grid-list-md>
      <v-card-title>
        <span class="headline">Edit User</span>
      </v-card-title>
      <v-card-text>
        <v-alert
        :value="validate"
        type="error"
        >
          <ul>
            <li v-for="(validate,index) in list" :key="index">
              {{ validate[0] }}
            </li>
          </ul>
        </v-alert>
        <v-form ref="form" v-model="valid" lazy validation>
                
          <v-text-field
          v-model="username"
          :rules="usernameRules"
          :counter="12"
          label="Username"
          required>
          </v-text-field>

          <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          hint="minimal 6 karakter"
          counter
          @click:append="showPassword = !showPassword"
          > 
          </v-text-field>

          <v-select
            v-model="role"
            :items="['ADMIN','KEPALA SEKOLAH','PETUGAS PERPUSTAKAAN']"
            :rules="[v => !!v || 'Item is required']"
            label="Roles"
            required
          ></v-select>
        
        </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="accent" :disabled="!valid"
           @click="submit">Save</v-btn>
        </v-card-actions>
      </v-container>
   
  </v-card>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import authmixins from '../mixins/authmixins'
export default {
  name: 'UserEdit',
  data: () => ({
        iduser:null,
        valid: false,
        username:'',
        usernameRules:[
          v => !!v || 'Nama harus diisi',
          v => (v && v.length <=12 ) || 'Tidak boleh lebih dari 12 karakter',
          v => /^[a-zA-Z0-9]+$/.test(v) || 'Format Userna'
        ],
        showPassword:false,
        password:'',
        passwordRules:[
          v => (v.length >= 6) || 'Password harus lebih dari 6'
        ],
        role:null,
        list:[],
        validate:false
  }),

  methods: {
    ...mapActions({
      setUsers: 'data/setUsers',
      setAlert: 'alert/seta',
      setDialog: 'dialog/setDialog',
      setComponent:'dialog/setComponent'
    }),

    submit(){
        let formData = new FormData()
        formData.set('username',this.username)
        formData.set('role',this.role)
        formData.set('password',this.password)
        formData.set('id',this.iduser)

        this.axios.post('/api/users/ubah',formData,this.config())
        .then((response)=>{
          this.validate=false
          this.$refs.form.reset()
          this.go()
          this.setDialog(false)
          this.setComponent('')
          this.setAlert({
              type:'success',
              status:true,
              text: response.data.message
          })
        })
        .catch((error)=>{
          this.list=error.response.data.errors
          this.validate=true
        })
    
    
    },
    close(){
      this.setDialog(false)
      this.setComponent('')
    },

    datauser(){
      
      this.role=this.data.role
      this.iduser=this.id
    },
    go(){
        let url = '/api/users'
        this.axios.get(url,this.config())
        .then((response)=>{
          this.setUsers(response.data.data)
        })
        .catch((error)=>{
          console.log(error)
        })
      }
  },
  mixins:[authmixins],
  computed:{
    ...mapGetters({
      id:'dialog/id',
      user: 'auth/user'
    })
  },

  created(){
    this.axios.get('/api/users/'+this.id+'/edit',this.config())
    .then((response)=>{
    let datauser= response.data.data
     this.username=datauser.username
     this.role=datauser.role
     this.iduser=datauser.id
    })
  }
}
</script>