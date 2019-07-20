<template>
<v-navigation-drawer app v-model="drawer" class="light">
		<v-toolbar flat class="transparent">
	  	<v-list class="pa-0">
	    <v-list-tile avatar>
	      <v-list-tile-avatar>
	        <img src="https://randomuser.me/api/portraits/men/85.jpg">
	      </v-list-tile-avatar>

	      <v-list-tile-content>
	        <v-list-tile-title>{{user.username}}</v-list-tile-title>
	      </v-list-tile-content>
	    </v-list-tile>
	  </v-list>
	  <v-btn icon dark @click="drawer=false" color="grey--text">
	  <v-icon>close</v-icon>
	  </v-btn>
	</v-toolbar>
	<v-list-tile>
		<v-btn
		block
		small
		round
		depressed
		color="error"
		class="white--text"
		@click.stop="logout()"
		>
			Logout
			<v-icon small right dark>settings_power</v-icon>
		</v-btn>
	</v-list-tile>
	<v-list class="pt-0" dense>
	  <v-divider></v-divider>

	  <v-list-tile
	    v-for="item in items"
	    :key="item.title"
	    :href="item.route"
	    :to="{name: item.route}"
	  >
	    <v-list-tile-action>
	      <v-icon>{{ item.icon }}</v-icon>
	    </v-list-tile-action>

	    <v-list-tile-content>
	      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
	    </v-list-tile-content>
	  </v-list-tile>
	</v-list>
</v-navigation-drawer>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'sidebar',
	data: () => ({
	items: [
		{ title: 'Home', icon: 'dashboard', route: 'home' },
		{ title: 'Data Users', icon: 'supervisor_account', route: 'users' },
		{ title: 'Data Anggota', icon: 'supervisor_account', route: 'anggota' },
		{ title: 'Data Buku', icon: 'books', route: 'books' },
		{ title: 'Data Peminjaman', icon: 'note', route: 'peminjaman' },
		{ title: 'About', icon: 'question_answer', route: 'about' },
		]
	}),

	computed: {
		// mapping state sideBar menggunakan map getter
		...mapGetters({
		sideBar : 'sideBar',
		user:'auth/user'
		}),
		// ubah properti data drawer menjadi computed dimana nilainya membaca dari state sideBar
		drawer: {
			get () {
			return this.sideBar
			},
			set (value) {
			this.setSidebar(value)
			}
		},
	},

	methods: {
		// mapping action setSideBar pada store menggunakan map action
		...mapActions({
		setSidebar : 'setSidebar',
		setAuth:'auth/set'
		}),
		logout(){
			let config= {
				headers: {
					'Authorization' : 'Bearer' + " " + this.user.api_token
				}
			}

			this.axios.post('/api/logout', {},config)
			.then((response)=> {
				console.log(response)
				this.setAuth({})
				
			})
			.catch((error)=>{
				console.log(error.response)
				
			})
		}
	}
}
</script>