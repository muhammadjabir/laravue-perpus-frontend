export default{
	namespaced: true,
	state:{
		users:[],
		anggota:[],
		books:[],
		page:0,
		lengthpage:0
	},
	mutations:{
		dataUsers:(state,payload)=>{
			state.users=payload
		},
		setPage:(state,page)=>{
			state.page=page
		},
		setLengthpage:(state,page)=>{
			state.lengthpage=page
		},
		dataAnggota:(state,payload)=>{
			state.anggota=payload
		},
		dataBooks:(state,payload)=>{
			state.books=payload
		},
		test:(state,payload)=>{
			state.books=payload
		}
	},

	actions:{
		setUsers:({commit},payload)=>{
			commit('dataUsers',payload)
		},
		setPage:({commit},page)=>{
			commit('setPage',page)
		},
		setLengthpage:({commit},page)=>{
			commit('setLengthpage',page)
		},
		setAnggota:({commit},payload)=>{
			commit('dataAnggota',payload)
		},
		setBooks:({commit},payload)=>{
			commit('dataBooks',payload)
		},
	},

	getters:{
		users: state => state.users,
		page: state => state.page,
		lengthpage: state => state.lengthpage,
		anggota:state=>state.anggota,
		books:state=>state.books,
	}
}