<template>
    <div class="option_title">
        <div class="option_title_name">
            <p>{{title.name?title.name:Route}}</p>
        </div>
        <div class="titlebtn" v-if="title.btn" @click="titlebtn">
			<span>
				{{title.btntext}}
			</span>					
		</div>
		<el-upload
			v-if="title.importbtn"
			class="importbtn"
			:action="title.importURL" 
			:headers="{'Authorization':Token}"  
			:show-file-list="false"
  			:on-success="readdata"				
			>
			<span>
				{{title.importbtn}}		       	
			</span>	
        </el-upload>
    </div>
</template>
<style>
.option_title div.titlebtn{
	float:right;
	margin-top:0.07rem;
	height:0.4rem;
	line-height: 0.34rem;
	/*margin:0 0 0 0.3rem;*/
	font-size: 0.24rem;
	cursor: pointer;
	background-color: #58b481;
	border-radius: 0.05rem;
	box-sizing: border-box;
	padding:0.04rem;
	color:#ffffff;
	margin-left:0.2rem;
}
.option_title div.titlebtn span{
	border:1px solid #FFFFFF;
	border-radius:0.04rem;
	padding:0 0.2rem;
	font-weight: 500;
}
.option_title .importbtn{
	float:right;
	margin-top:0.07rem;
	height:0.4rem;
	line-height: 0.33rem;
	/*margin:0 0 0 0.3rem;*/
	font-size: 0.24rem;
	cursor: pointer;
	border-radius: 0.05rem;
	box-sizing: border-box;
	padding:0.04rem;
	color:#ffffff;
	margin-left:0.2rem;
	
	background-color: #fff;
	border: 1px solid #58b481;
	color: #58b481;
	width:auto;
    /*line-height:0.25rem;
    border-radius: 0.04rem;
    padding: 0 0.2rem;
    font-weight: 500;
    text-align:center;
    width:100%;
    height:100%;
    display:block;*/
}
.option_title .importbtn .el-upload:focus{
	color:inherit;
}
.option_title .importbtn span{
	border:1px solid #58b481;
	border-radius:0.04rem;
	padding:0 0.2rem;
	font-weight: 500;
}
</style>
<script>
import "@/assets/style/common/Option_title.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
export default {
	props:['title'],
	data() {
	    return {
	      
	    }
	},
	methods:{
		titlebtn(){
			this.$emit('titleEvent');
		},
		readdata(response,file,fileList){
			this.$emit('readdata',response);
		},
	},
    computed:{
		...mapGetters(["Token","userName"]),
        Route:function(){
        	if(this.title.title){
        		return this.title.title;
        	}
//      	if(this.actions.undefinedpath){
//      		return this.actions.undefinedpath;
//      	}
            const route = this.$route.name.split("/")
            return route[route.length-1]
        }
    },
    mounted:function(){
    	
    }
    
}
</script>