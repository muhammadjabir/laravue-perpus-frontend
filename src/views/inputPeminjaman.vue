<template>
 <div class="peminjaman">
	<h1 class="subheading grey--text">
	Tambah Peminjaman
	</h1>
	<div class="mt-4" style="">
		<v-layout row wrap>
      <v-flex xs12 md7 class="pr-2 mb-2">
        <v-toolbar
          color="light-blue"
          dark        
        >
        <v-toolbar-title>Form Peminjaman</v-toolbar-title>
       
      </v-toolbar>
      <v-card
       >
      <v-container>
      <v-alert
       :value="validate"
       color="error"
       class="mb-3"
       >
         <ul v-if="errors.errors">
           <li v-for="(validate,index) in errors.errors" :key="index">
             {{ validate[0] }}
           </li>
         </ul>

         <ul v-else>
           <li>{{ errors.message }}</li>
         </ul>
       </v-alert>
        <v-form id="form" ref="form">
          <v-text-field
          v-model="kodebuku"
          label="Kode Buku"
          name="kode"
          id="kode"
          required>
          </v-text-field>
          <v-text-field
          label="Kode Anggota"
          name="kode_anggota"
          id="kode_anggota"
          required>
          </v-text-field>
          <v-text-field
          v-model="date"
          label="Batas Pengembalian"
          name="batas_pengembalian"
          id="batas_pengembalian"
          disabled
          required
          >
          </v-text-field>
        </v-form>

        <v-spacer></v-spacer>
        <div class="text-xs-right">
          <v-btn 
          color="accent"
          @click="submit"
          :loading="loading" 
           >Submit</v-btn>
        </div>
       
      </v-container>
      </v-card>
      </v-flex>

      <!-- data buku -->
       <v-flex xs12 md5 class="pr-2">
        <v-toolbar
          color="light-blue"
          dark
          
        >
        <v-toolbar-title>Buku Tersedia</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
        <v-card
       >
        <v-container>
          <v-list two-line>
            <div class="test" v-for="book in books" :key="book.id">
              <v-divider           
              ></v-divider>
              <v-list-tile               
                avatar
                @click="add(book.kode_buku)"
              >
                <v-list-tile-avatar>
                  <img :src="getImage(book.foto)">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title >{{book.judul_buku}}</v-list-tile-title>
                  <v-list-tile-sub-title>Kode Buku : {{ book.kode_buku }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
          </v-list>
        </v-container>
      </v-card>
      </v-flex>    
    </v-layout>
        
	</div>
</div>
</template>

<script>
import moment from 'moment'
import {mapActions , mapGetters} from 'vuex'
  export default {
    data: () => ({
      books:[],
      kodebuku:'',
      date:'',
      table:'peminjaman',
      loading:false,
      errors:[],
      validate:false,
      config:{}
    }),
    methods:{
      ...mapActions({
        setAlert:'alert/seta'
      }),
      add(kode){
        this.kodebuku=kode
      },
      submit(){
          this.loading=true
         let form=document.getElementById('form')
         let formData = new FormData(form)
         this.axios.post('/api/'+this.table,formData)
         .then((response)=>{
          this.loading=false
            this.setAlert({
              type:'success',
              status:true,
              text: response.data.message
            })
            this.$router.push('/peminjaman')
         })
         .catch((error)=>{
            this.loading=false
            this.validate=true
            this.errors= error.response.data
            console.log(this.errors)
         })  
      }
    },

    computed:{
      ...mapGetters({
        user:'auth/user'
      })
    },
    created(){
      this.config = {
          headers: {
            'Authorization' : 'Bearer' + " " + this.user.api_token
          }
      }
      this.axios.get('/api/books?filter=ada',this.config)
      .then((response)=>{
        this.books=response.data.data
      })
      .catch((error)=>{
        console.log(error.response)
      })
      this.date=new Date()
      this.date.setDate(this.date.getDate() + 7)
      this.date=moment(String(this.date)).format('DD-MM-YY') 
    },

  }
</script>