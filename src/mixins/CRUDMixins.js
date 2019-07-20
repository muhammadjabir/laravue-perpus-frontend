import {mapActions, mapGetters} from 'vuex'
export default{
	methods: {
			...mapActions({
				setAlert: 'alert/seta',
				setBooks: 'data/setBooks',
				setPage: 'data/setPage',
				setLengthpage: 'data/setLengthpage',
				setDialog: 'dialog/setDialog',
				setComponent: 'dialog/setComponent',
				setID:'dialog/setID'
			}),

			config(){
				let config= {
						headers: {
							'Authorization' : 'Bearer' + " " + this.user.api_token
						}
				}

				return config
			},

			go(){
				this.loading=true
				let url = '/api/'+this.table
				if(this.page>0) {
				url = '/api/'+ this.table +'?page='+ this.page
				}
				this.axios.get(url,this.config())
				.then((response)=>{
					this.loading=false
					this.setBooks(response.data.data)
					let lengthpage = response.data.meta.last_page
					this.setLengthpage(lengthpage)
					this.setPage(response.data.meta.current_page)
				})
				.catch((error)=>{
					console.log(error)
				})
			},

			show(id){
				this.setID(id)
				this.setComponent(this.showComponent)
				this.setDialog(true)
			},

			edit(id){
				this.setDialog(true)
				this.setComponent(this.thisComponent)
				this.setID(id)
			},

			tambah(){
					this.setDialog(true)
					this.setComponent(this.thisComponent)
			},

			close(){
			  this.setDialog(false)
			  this.setComponent('')
			  this.setID(null)
			  this.editdata=null
			},

			hapus(id){
				this.axios.delete('/api/'+this.table+'/' + id,this.config())
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
			},

			submitEdit(){
			  this.loading=true
			  let form=document.getElementById('form')
			  let formData = new FormData(form)
			  formData.append('_method', 'PUT')
			  this.axios.post('/api/'+ this.table +'/' + this.idedit, formData,this.config())
			  .then((response)=>{
			    this.setID(null)
			    this.go()
			    this.setDialog(false)
			    this.setComponent('')
			    this.setAlert({
			      type:'success',
			      status:true,
			      text: response.data.message
			    })
			  })
			  .catch((error)=>{
			    this.list=error.response.data.errors
			    this.validate=true
			    this.loading=false
			  })
			},

			submit(){
			   this.loading=true
			   if(this.$refs.form.validate()){
			     let form=document.getElementById('form')
			     let formData = new FormData(form)
			     this.axios.post('/api/'+this.table,formData,this.config())
			     .then((response)=>{
			        
			        this.go()
			        this.setDialog(false)
			        this.setComponent('')
			        this.setAlert({
			          type:'success',
			          status:true,
			          text: response.data.message
			        })
			     })
			     .catch((error)=>{
			        this.list=error.response.data.errors
			        this.validate=true
			        this.loading=false
			     })
			   }
			}
		},
		computed:{
			...mapGetters({
				books:'data/books',
				page:'data/page',
				lengthpage:'data/lengthpage',
				id:'dialog/id',
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
		},

		beforeDestroy(){
			this.setLengthpage(null)
		}
		
}