<template>
	<nav>
		<v-toolbar flat app color="light-blue" class="white--text">
		    <v-toolbar-side-icon color="white--text"
		    @click="setSidebar(!sideBar)"></v-toolbar-side-icon>
		    <v-toolbar-title>Perpustakaan</v-toolbar-title>
		    <v-spacer></v-spacer>
		    <v-toolbar-items class="hidden-sm-and-down" >
		      <v-btn flat class="white--text">Link One</v-btn>
		    </v-toolbar-items>
		  </v-toolbar>
	</nav> 
	
</template>

<script>
 import { mapGetters , mapActions} from 'vuex'
	export default{
		name: 'navbar',
		methods:{
			...mapActions({
				setSidebar: 'setSidebar'
			})
		},

		computed:{
			...mapGetters({
				sideBar:'sideBar'
			})
		}
	}
</script>