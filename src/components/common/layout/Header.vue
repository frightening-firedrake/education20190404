<template>
	<div class="header">
	    <div class="logo">
	    	  <img src="static/images/sys/logo.png" alt="" />
	    </div>
	    <div class="headerR">
	    	<div class="exitwrap">
	    		<img class="exit" @click="loginout()" src="static/images/sys/exit.png" alt="" />
	    	</div>
	    	<img class="line" src="static/images/sys/lineH.png" alt="" />
	    	<div class="user">
	    		{{userName?userName:"未登录"}}
	    	</div>
	    	<div class="mphoto">
				<img src="static/images/test/photo_01.png" alt="" />
			</div>
	    </div>
	</div>
</template>
<script>
require("../../../assets/style/index/index.css")
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
export default {
	computed:{
		...mapState([]),
		...mapGetters(["libraryId","libraryName","userName","roleName"]),
  	},
  	methods:{
  		...mapMutations(['logout']),
  		...mapActions([]),
  		loginout(){
  			this.$router.push({ path: '/login'});
  			this.logout()
  		},
  	},
	data(){
		return {

		}
	}
}
</script>
