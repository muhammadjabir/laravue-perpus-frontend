<template>
  <div class="anggota">
	<h1 class="subheading grey--text">Data Anggota</h1>
		<v-container fluid class="mt-2" style="">
		<div class="text-xs-right mb-2">
			<v-btn small color="success" @click="tambah()">+ Tambah Anggota</v-btn>
		</div>

		<v-card class="">
		
			<v-card-title color="light-blue">
			<v-layout warp>
			<v-flex xs6>Data Anggota</v-flex>
			<v-flex xs6 class="text-xs-right">Data Anggota</v-flex>
			</v-layout>
			
			</v-card-title>

			  <div>
			    <v-data-table
			      :headers="headers"
			      :items="anggota"
			      :loading="loading"
			      hide-actions
			      class="elevation-1"
			    >
			      <template v-slot:items="props">
			      	 <td >{{ props.item.kode_anggota}}</td>
			        <td class="text-xs-left">
			        	<v-list style="background:transparent">
			        	  <v-list-tile>
			        	    <v-list-tile-avatar>
			        	      <img :src="getImage(props.item.foto)">
			        	    </v-list-tile-avatar>

			        	    <v-list-tile-content>
			        	      <v-list-tile-title v-html="props.item.nama_anggota"></v-list-tile-title>
			        	    </v-list-tile-content>
			        	  </v-list-tile>
			        	</v-list>
			        </td>
			        <td >{{ props.item.alamat}}</td>
			        <td >{{ props.item.tanggal_lahir | formatDate}}</td>
			        <td class="text-xs-center">
			        <v-layout row wrap>
			        	<v-flex xs12 md6>
			        	<v-btn  small flat class="pink--text" round @click="hapus(props.item.id)">Hapus</v-btn>
			        	</v-flex>			        	
			        	<v-flex xs12 md6>
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
import {mapActions, mapGetters} from 'vuex'
import moment from 'moment'
import authmixins from '../mixins/authmixins'
	export default{
		data(){
			return{
				headers:[
				 { text: 'Kode Anggota', value: 'kode_anggota' },
				 { text: 'Nama Anggota', value: 'nama_anggota' },
				 { text: 'Alamat', value: 'alamat' },
				 { text: 'Tanggal Lahir', value: 'tanggal_lahir' },
				 { text: 'Actions', value: 'actions',sortable: false,width: '250px' },
				],
				
		        selected: [],
		        loading: false
        		
			}
		},

		filters:{
			formatDate: function(value){
				if (value) {
				  return moment(String(value)).format('DD-MM-YYYY')
				}
			}
		},

		methods: {
			...mapActions({
				setAlert: 'alert/seta',
				setAnggota: 'data/setAnggota',
				setPage: 'data/setPage',
				setLengthpage: 'data/setLengthpage',
				setDialog: 'dialog/setDialog',
				setComponent: 'dialog/setComponent',
				setID:'dialog/setID'
			}),
			go(){
				this.loading=true
				let url = '/api/anggota'
				if(this.page>0) {
				url = '/api/anggota?page='+ this.page
				}
				this.axios.get(url,this.config())
				.then((response)=>{
					this.loading=false
					this.setAnggota(response.data.data)
					let lengthpage = response.data.meta.last_page
					this.setLengthpage(lengthpage)
					this.setPage(response.data.meta.current_page)
				})
				.catch((error)=>{
					console.log(error)
				})
			},
			edit(id){
				this.setDialog(true)
				this.setComponent('CUAnggota')
				this.setID(id)
			},

			tambah(){
					this.setDialog(true)
					this.setComponent('CUAnggota')
			},

			hapus(id){
				this.axios.delete('/api/anggota/' + id,this.config())
				.then((response)=>{
					this.setPage(1)
					this.go()
					this.setAlert({
							type:'success',
							status:true,
							text: response.data.message
					})
				})
				.catch((error)=>{
					console.log(error)
				})
			}
		},
		
		created(){
			this.setPage(1)
			this.go()
		},
		beforeDestroy(){
			this.setLengthpage(null)
		},
		mixins:[authmixins],
		computed:{
			...mapGetters({
				anggota:'data/anggota',
				page:'data/page',
				lengthpage:'data/lengthpage',
				user: 'auth/user'
			}),
			ubahpage:{
				get(){
					return this.page
				},
				set(value){
					this.setPage(value)
				}
			}
		}
	}
</script>
