<template>
  <v-card>
      <v-container grid-list-md>
      <v-card-title>
        <span class="headline" v-if="id">Edit Buku</span>
        <span class="headline" v-else>Tambah Buku</span>
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
          v-model="judulbuku"
          :rules="judulRules"
          :counter="40"
          label="Judul Buku"
          name="judul"
          id="judul"
          required>
          </v-text-field>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-text-field
              v-model="penerbit"
              label="Penerbit"
              name="penerbit"
              id="penerbit"
              required>
              </v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
              v-model="penulis"
              label="Penulis"
              name="penulis"
              id="penulis"
              required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-text-field
          v-model="tahun"
          label="Tahun Terbit"
          name="tahun"
          id="tahun"
          required>
          </v-text-field>
          <v-textarea
            v-model="deskripsi"
            name="deskripsi"
            label="Deskripsi"
            id="deskripsi"
            required
          ></v-textarea>
          <div class="">
            <img :src="editfoto ? getImage(imgurl) : this.imgurl" :height="height">
          </div>
          
        <input type="file" name="foto" id="foto" style="display:none" ref="foto" accept="image/*" @change="tampilfoto"></input>
        
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
           @click="idedit ? submitEdit() : submit()"
           v-html="this.id ? 'Update' : 'Save'"
           ></v-btn>
        </v-card-actions>
      </v-container>
  </v-card>
</template>
<script>
import CRUDMixins from '../mixins/CRUDMixins'

export default {
  name: 'CUBooks',
  data: () => ({
        penerbit:'',
        idedit:null,
        tahun:'',
        deskripsi:'',
        penulis:'',
        table:'books',
        editfoto:null,
        valid: false,
        loading:false,
        judulbuku:'',
        height:'',
        imgurl:'',
        judulRules:[
          v => !!v || 'Judul harus diisi',
          v => (v && v.length <=40 ) || 'Tidak boleh lebih dari 40 karakter',
        ],
        list:[],
        validate:false
  }),

  methods:{
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

    
  },

  created(){
    if (this.id) {
       this.axios.get('/api/books/'+this.id+'/edit',this.config())
       .then((response)=>{
        let book=response.data.data
        this.judulbuku=book.judul_buku
        this.imgurl=book.foto
        this.height='150px'
        this.editfoto=1
        this.idedit=book.id
        this.penulis=book.penulis
        this.penerbit=book.penerbit
        this.deskripsi=book.deskripsi
        this.tahun=book.tahun_terbit
       })
       .catch((error)=>{
        console.log(error.response)
       })
    }
  },
  mixins:[CRUDMixins]
}
</script>
