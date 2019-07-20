<template>
 <div class="users">
	<h1 class="subheading grey--text">Data Users</h1>
		<v-container fluid class="mt-2" style="">
		<div class="text-xs-right mb-2">
			<DialogUsers/>
		</div>

		<v-card class="">
			<v-card-title color="light-blue">
			Data Users
			</v-card-title>

			  <div>
			    <v-data-table
			      :headers="headers"
			      :items="users"
			      hide-actions
			      class="elevation-1"
			    >
			      <template v-slot:items="props">
			        <td >{{ props.item.username }}</td>
			        <td >{{ props.item.role }}</td>
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
import authmixins from '../mixins/authmixins'
import DialogUsers from '@/components/DialogUsers.vue'
	export default{
		data(){
			return{
				headers:[
				 { text: 'Username', value: 'username' },
				 { text: 'Role', value: 'role' },
				 { text: 'Actions', value: 'actions',sortable: false,width: '250px' },
				],
				
        		selected: [],
        		
			}
		},

		methods: {
			...mapActions({
				setAlert: 'alert/seta',
				setUsers: 'data/setUsers',
				setPage: 'data/setPage',
				setLengthpage: 'data/setLengthpage',
				setDialog: 'dialog/setDialog',
				setComponent: 'dialog/setComponent',
				setID:'dialog/setID'
			}),
			go(){
				let url = '/api/users'
				let config= {
					headers: {
						'Authorization' : 'Bearer' + " " + this.user.api_token
					}
				}
				if(this.page>0) {
				url = '/api/users?page='+ this.page
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
			edit(id){
					this.setDialog(true)
					this.setComponent('UserEdit')
				  	this.setID(id)
			},

			hapus(id){
				this.axios.delete('/api/users/' + id,this.config())
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
			this.go()
		},

		components:{
			DialogUsers
		},

		mixins:[authmixins],

		computed:{
			...mapGetters({
				users:'data/users',
				page:'data/page',
				lengthpage:'data/lengthpage',
				statusDialog: 'dialog/statusDialog',
				user:'auth/user'
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
