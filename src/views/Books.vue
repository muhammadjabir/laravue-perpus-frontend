<template>
  <div class="books">
	<h1 class="subheading grey--text">Books</h1>
		<v-container fluid class="mt-2" style="">
		<div class="text-xs-right mb-2">
			<v-btn small color="success" @click="tambah()">+ Tambah Buku</v-btn>
		</div>

		<v-card class="">
		
			<v-card-title color="light-blue">
			<v-layout warp>
			<v-flex xs6>Data Buku</v-flex>
			<v-flex xs6 class="text-xs-right">Data Buku</v-flex>
			</v-layout>
			</v-card-title>
			  <div>
			    <v-data-table
			      :headers="headers"
			      :items="books"
			      :loading="loading"
			      hide-actions
			      class="elevation-1"
			    >
			    <template v-slot:items="props">
			    
			    <td >{{ props.item.kode_buku}}</td>
			      <td class="text-xs-left">
			      	<v-list style="background:transparent">
			      	  <v-list-tile>
			      	    <v-list-tile-avatar>
			      	      <img :src="getImage(props.item.foto)">
			      	    </v-list-tile-avatar>

			      	    <v-list-tile-content>
			      	      <v-list-tile-title v-html="props.item.judul_buku"></v-list-tile-title>
			      	    </v-list-tile-content>
			      	  </v-list-tile>
			      	</v-list>
			      </td>
			      <td >{{ props.item.deskripsi}}</td>
			      <td >
			      	{{props.item.status == 1 ? "Tersedia" : "Dipinjam"}}
			      		
			      </td>
			      <td class="text-xs-center">
			      <v-layout row wrap>
			      	<v-flex xs12 md4>
			      	<v-btn  small flat class="pink--text" round @click="hapus(props.item.id)">Hapus</v-btn>
			      	</v-flex>
			      	<v-flex xs12 md4>
			      	<v-btn  small flat class="pink--text" round @click="show(props.item.id)">Lihat</v-btn>
			      	</v-flex>					        	
			      	<v-flex xs12 md4>
			      	<v-btn small flat class="pink--text" round @click="edit(props.item.id)">Edit</v-btn>
			      	</v-flex>
			      </v-layout>
			      	
			      </td>
			    
			    </template>
			    </v-data-table>
			    <div class="text-xs-center pt-2">
			      <template>
	      			<div class="text-xs-center">
	      				<v-pagination v-model="ubahpage" 
	      				@input="go"
	      				:length="lengthpage"
	      				:total-visible="7">	
	      				</v-pagination>
	      			</div>
			      </template>
			    </div>
			  </div>

		</v-card>
		</v-container>
</div>
</template>
<script>
import CRUDMixins from '../mixins/CRUDMixins'
	export default{
		data(){
			return{
				headers:[
					{ text: 'Kode Buku', value: 'kode_buku' ,width: '150px'},
					{ text: 'Judul Buku', value: 'judul_buku',width: '250px' },
					{ text: 'Deskripsi', value: 'deskripsi' },
					{ text: 'Status', value: 'status' },
					{ text: 'Actions', value: 'actions',sortable: false,width: '300px' },
				],
				loading:false,
				table:'books',
				thisComponent: 'CUBooks',
				showComponent:'ShowBook'
			}
		},	
		created(){
			this.go()
		},

		updated(){
			this.loading=false
		},
		mixins:[CRUDMixins]
	}
</script>
