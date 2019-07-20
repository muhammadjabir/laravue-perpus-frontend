<template>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn small color="success" dark v-on="on">+ Tambah Users</v-btn>
      </template>
      <v-card>
          <v-container grid-list-md>
          <v-card-title>
            <span class="headline">Tambah User</span>
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
            <v-form ref="form" id="form" v-model="valid" lazy validation>
                    
              <v-text-field
              v-model="username"
              :rules="usernameRules"
              :counter="12"
              label="Username"
              name="username"
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
              name="password"
              @click:append="showPassword = !showPassword"
              > 
              </v-text-field>

              <v-select
                v-model="role"
                :items="roles"
                item-text="text"
                item-value="text"
                :rules="[v => !!v || 'Item is required']"
                label="Roles"
                name="role"
                required
              ></v-select>
            
            </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
              <v-btn color="accent"
              :disabled="!valid" @click="submit">Save</v-btn>
            </v-card-actions>
          </v-container>
       
      </v-card>
    </v-dialog>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'DialogUsers',
  data: () => ({
        dialog: false,
        valid: true,
        username:'',
        usernameRules:[
          v => !!v || 'Nama harus diisi',
          v => (v && v.length <=12 ) || 'Tidak boleh lebih dari 12 karakter',
          v => /^[a-zA-Z0-9]+$/.test(v) || 'Format Userna'
        ],
        showPassword:false,
        password:'',
        passwordRules:[
          v => !!v || 'Password harus diisi',
          v => (v && v.length >= 6) || 'Password harus lebih dari 6'
        ],
        role:'',

        roles:[
        { text: 'ADMIN' },
        { text: 'KEPALA SEKOLAH' },
        { text: 'PETUGAS PERPUSTAKAAN' },

        ],
        list:[],
        validate:false
  }),

  computed:{
    ...mapGetters({
      user:'auth/user'
    })
  },
  methods: {
    ...mapActions({
      setUsers: 'data/setUsers',
      setAlert: 'alert/seta',
      setPage: 'data/setPage',
      setLengthpage: 'data/setLengthpage'
    }),

    submit(){
      if(this.$refs.form.validate()){
        let config= {
          headers: {
            'Authorization' : 'Bearer' + " " + this.user.api_token
          }
        }
        let form=document.getElementById('form')
        let formData = new FormData(form)
         //formData.append('username',this.username)
         formData.append('role',this.role)
        // formData.set('password',this.password)

        this.axios.post('/api/users',formData,config)
        .then((response)=>{
          this.validate=false
          this.$refs.form.reset()
          this.go()
          this.dialog=false
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
      }
    
    },

    go(){
        let url = '/api/users'
        let config= {
          headers: {
            'Authorization' : 'Bearer' + " " + this.user.api_token
          }
        }
        this.axios.get(url,config)
        .then((response)=>{
          this.setUsers(response.data.data)
          let lengthpage = response.data.meta.last_page
          this.setLengthpage(lengthpage)
          this.setPage(response.data.meta.current_page)
        })
        .catch((error)=>{
          console.log(error)
        })
      },
  }
}
</script>