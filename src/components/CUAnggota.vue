<template>
  <v-card>
      <v-container grid-list-md>
      <v-card-title>
        <span class="headline" v-if="id">Edit Anggota</span>
        <span class="headline" v-else>Tambah Anggota</span>
      </v-card-title>
      <v-card-text>
        <v-alert
        :value="validate"
        type="error"
        class="mb-1"
        >
          <ul>
            <li v-for="(validate,index) in list" :key="index">
              {{ validate[0] }}
            </li>
          </ul>
        </v-alert>
        <v-form id="form" ref="form" v-model="valid" lazy validation>
          
          <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="40"
          label="Nama Anggota"
          name="name"
          id="name"
          required>
          </v-text-field>

          <v-textarea
           v-model="alamat"
           name="alamat"
           :rules="alamatRules"
           label="Alamat"
           id="alamat"
           required
           :counter="150"
         ></v-textarea>

         <v-menu
         v-model="menu2"
         :close-on-content-click="false"
         :nudge-right="40"
         lazy
         transition="scale-transition"
         offset-y
         full-width
         min-width="290px"
       >
         <template v-slot:activator="{ on }">
           <v-text-field
             v-model="date"
             label="Tanggal Lahir"
             readonly
             v-on="on"
             name="tgl_lahir"
             id="tgl_lahir"
           ></v-text-field>
         </template>
         <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
          
        <input type="file" name="foto" id="foto" style="display:none" ref="foto" accept="image/*" @change="tampilfoto"></input>
        <div class="">
          <img :src="editfoto ? getImage(imgurl) : this.imgurl" :height="height">
        </div>
        
        </v-form>
        
        </v-card-text>
        <v-btn small color="success" class="ml-4" @click="ambilfile">Upload Foto</v-btn>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn 
          color="accent" 
          :disabled="!valid"
          :loading="loading"
           @click="editdata ? edit() : submit()"
           v-html="this.id ? 'Update' : 'Save'"
           ></v-btn>
        </v-card-actions>
      </v-container>
  </v-card>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import authmixins from '../mixins/authmixins'
import moment from 'moment'
export default {
  name: 'CUAnggota',
  data: () => ({
        idanggota:null,
        editdata:null,
        editfoto:null,
        valid: false,
        menu2: false,
        loading:false,
        name:'',
        date: '',
        height:'',
        imgurl:'',
        nameRules:[
          v => !!v || 'Nama harus diisi',
          v => (v && v.length <=40 ) || 'Tidak boleh lebih dari 40 karakter',
          v => /^[a-zA-Z ]+$/.test(v) || 'Format Userna'
        ],
        alamat:'',
        alamatRules:[
          v => !!v || 'Alamat Harus diisi',
          v => (v && v.length <=150 ) || 'Tidak boleh lebih dari 150 karakter',
        ],

        list:[],
        validate:false
  }),

  methods:{
    ...mapActions({
      setAlert: 'alert/seta',
      setAnggota: 'data/setAnggota',
      setPage: 'data/setPage',
      setLengthpage: 'data/setLengthpage',
      setDialog: 'dialog/setDialog',
      setComponent: 'dialog/setComponent',
      setID:'dialog/setID'
    }),

    close(){
      this.setDialog(false)
      this.setComponent('')
      this.setID(null)
      this.editdata=null
    },

    ambilfile(){
      this.$refs.foto.click()
    },

    tampilfoto(event){
      const files = event.target.files
      this.editfoto=null
      const fileReader = new FileReader()
      fileReader.addEventListener('load',()=>{
        this.imgurl=fileReader.result
      })
      this.height='150px'
      fileReader.readAsDataURL(files[0])
    },

    go(){
      let url = '/api/anggota'
      this.axios.get(url,this.config())
      .then((response)=>{
        this.setAnggota(response.data.data)
        let lengthpage = response.data.meta.last_page
        this.setLengthpage(lengthpage)
        this.setPage(response.data.meta.current_page)
      })
      .catch((error)=>{
        console.log(error)
      })
    },

    edit(){
      this.loading=true
      let form=document.getElementById('form')
      let formData = new FormData(form)
      formData.append('_method', 'PUT')
      this.axios.post('/api/anggota/' + this.idanggota, formData,this.config())
      .then((response)=>{
        this.loading=false
        this.validate=false
        this.setID(null)
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
        this.loading=false
      })
    },

    submit(){
       this.loading=true
       if(this.$refs.form.validate()){
         let form=document.getElementById('form')
         let formData = new FormData(form)
         this.axios.post('/api/anggota',formData,this.config())
         .then((response)=>{
            this.loading=false
            this.validate=false
            this.$refs.form.reset()
            this.height=''
            this.imgurl=''
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
            this.loading=false
         })
       }
    }
  },
 
  computed:{
    ...mapGetters({
      id:'dialog/id',
      user:'auth/user'
    })
  },

  created(){
    if (this.id) {
       this.axios.get('/api/anggota/'+this.id+'/edit',this.config())
       .then((response)=>{
        let anggota=response.data.data
        this.name = anggota.nama_anggota
        this.alamat= anggota.alamat
        this.date= moment(String(anggota.tanggal_lahir)).format('YYYY-MM-DD') 
        this.imgurl=anggota.foto
        this.height='150px'
        this.editdata=1
        this.editfoto=1
        this.idanggota=anggota.id

       })
       .catch((error)=>{
        console.log(error.response)
       })
    }
  },
  mixins:[authmixins]
}
</script>
