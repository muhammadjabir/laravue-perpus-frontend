<template>
  <v-card>
      <v-container grid-list-md>
      <v-card-title>
        <span class="headline">Detail Buku</span>
      </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
              <img :src="getImage(book.foto)" height="200px">
            </v-flex>
            <v-flex  xs12 >
              <table class="v-table elevation-2 theme--light" hoover="false">
               <tbody>
                <tr>
                  <th class="text-xs-left" width="150px">Judul Buku</th>
                  <td>: {{ book.judul_buku }}</td>
                </tr>
                <tr>
                  <th class="text-xs-left">Deskripsi</th>
                  <td>: {{ book.deskripsi }}</td>
                </tr>
                <tr>
                  <th class="text-xs-left">Penerbit</th>
                  <td>: {{ book.penerbit }}</td>
                </tr>
                <tr>
                  <th class="text-xs-left">Status</th>
                  <td>: <v-chip small :color="book.status == 1 ? 'primary' : 'red'" text-color="white">{{book.status == 1 ? 'Tersedia' : 'Dipinjam'}}</v-chip></td>
                </tr>
               </tbody>
                
              </table>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
        </v-card-actions>
      </v-container>
  </v-card>
</template>
<script>
import CRUDMixins from '../mixins/CRUDMixins'

export default {
  name: 'ShowBook',
  data: () => ({
      book:{}
  }),
  created(){
    if (this.id) {
      this.axios.get('/api/books/'+ this.id,this.config())
      .then((response)=>{
        this.book=response.data.data
      })
      .catch((error)=>{
        console.log(error.response)
      })
    }
  },
  mixins:[CRUDMixins]
}
</script>
