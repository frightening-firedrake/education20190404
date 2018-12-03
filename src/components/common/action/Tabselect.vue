<template>
	<div class="tabs">
		<div class="status">
			<!--<div>
			    <el-radio-group v-model="currentTab" text-color="white" fill="#2d82e2" @change="TabChange">
				    <el-radio-button v-for="item in Tabs" :key="item.label" :label="item.label">{{item.text}}</el-radio-button>			    
			    </el-radio-group>
			</div>
		</div>
		<div class="status" style='margin-left:20px;'>-->
			<div>
			    <el-radio-group v-model="currenthege" text-color="white" fill="rgb(255, 76, 120)" @change="hegeChange">
				    <el-radio-button v-for="item in hege" :key="item.label" :label="item.label">{{item.text}}</el-radio-button>			    
			    </el-radio-group>
			</div>
		</div>
	</div>
</template>
<style>
div.tabs{
	height:0.5rem;
	margin-top:-0.2rem;
}
div.tabs div.status{
	float:left;
}
div.tabs div.status >p:before{
	background:#ff4c78;
}
div.tabs div.status >div{
	float:left;
	/*width:2.85rem;*/
	line-height:0.54rem;
}
div.tabs div.status >div .el-radio-group{
	float:left;
	margin-top:0.14rem;
}
div.tabs div.status .el-radio-button{
	height:0.26rem;
	line-height:0.26rem;
	border-radius:0.04rem;
	margin-right:0.15rem;
}
div.tabs div.status .el-radio-button__inner{
	height:0.26rem;
	line-height:0.24rem;
	border-radius:0.04rem;
	padding:0 0.14rem;
	border: solid 0.01rem #d5d5d5;
	font-size:0.14rem;
	color: #999999;
}	
</style>
<script>
//import SinograinModal from '@/components/common/action/Modal.vue';
//import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';

export default {
    props: ['Tabs','hege'],
    data() {
        return {
	        currentTab:0,
	        currenthege:0,
        };
    },
    created(){

    },
    methods:{
    	TabChange(){
    		this.$emit('TabChange',this.currentTab);
    	},
    	hegeChange(){
    		this.$emit('hegeChange',this.currenthege);
    	},
    },
    computed: {

	},
    mounted:function(){
 
    }
}
</script>