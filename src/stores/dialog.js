export default{
	namespaced: true,
	state: {
		status: false,
		currentComponent:'',
		id:null
	
	},

	mutations: {
		setDialog: (state,status) => {
			state.status = status
		},
		setComponent:(state,value)=>{
			state.currentComponent=value
		},
		setID:(state,value)=>{
			state.id=value
		}
	},

	actions: {
		setDialog: ({commit},status)=>{
			commit('setDialog',status)
		},
		setComponent:({commit},value)=>{
			commit('setComponent',value)
		},
		setID:({commit},value)=>{
			commit('setID',value)
		}
	},

	getters: {
		statusDialog: state=> state.status,
		currentComponent: state=> state.currentComponent,
		id: state=>state.id
	}
}