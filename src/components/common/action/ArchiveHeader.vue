<template>
	<div class="ArchiveHeader" >
		<div class="btnwrap">
			<!--<el-button type="primary" :loading="false">确认搜索</el-button>-->
			<span @click="searchingfor">搜索</span>
		</div>
		<div class="selectwrap">
			<div class="selectitemwrap">
				<div class="label bg">
					单位名称
				</div>
				<div class="selectitem">
					<el-select class="lib1" v-model="selectlib"  placeholder="请选择库点" popper-class='headerSelectlib1' @change="selectlibChange1">
						<el-option v-for="item2 in libraryList1" :label="'中央储备粮'+item2.libraryName+'直属库有限公司'" :key="item2.id" :value="item2.id"></el-option>								        									        
					</el-select>
				</div>
			</div>
			<div class="selectitemwrap">
				<div class="label bg">
					储存库点
				</div>
				<div class="selectitem">
					<el-select class="lib2" v-model="selectlib2"  placeholder="请选择库点" popper-class='headerSelectlib1' @change="selectlibChange">
						<el-option v-for="item3 in libraryList2" :label="item3.libraryName" :key="item3.id" :value="item3.id"></el-option>								        									        
					</el-select>
				</div>
			</div>
			<div class="selectitemwrap">
				<div class="label bg">
					入库时间
				</div>
				<div class="selectitem">
					<el-date-picker
				      size='mini'
				      :clearable='false'
				      v-model="date_select"
				      type="month"
				      @change="dateChange2"
				      value-format="yyyy-MM"
				      placeholder="选择年份">
				      <!--value-format="timestamp"-->
				    </el-date-picker>
				</div>
			</div>
			<div class="selectitemwrap">
				<div class="label bg">
					仓号
				</div>
				<div class="selectitem">
					<el-input v-model="position" placeholder="请输入仓号"></el-input>
				</div>
			</div>
		</div>

		
	</div>
</template>
<style>
	div.ArchiveHeader{
		width:auto;
		height: 0.5rem;
		line-height:0.5rem;
		border: solid 1px #ccc;
		/*border-bottom: none;*/
		margin-top: 0.05rem;
		overflow: hidden;
	}
	div.ArchiveHeader .btnwrap{
		width:0.9rem;
		height: 0.5rem;
		float:right;
		/*margin:-1px -1px -1px 0;
		background:white;*/
	}
	div.ArchiveHeader .btnwrap span{
		display:block;
		width:0.76rem;
		height:0.36rem;
		line-height:0.36rem;
		background-color: #58b481;
		color: #ffffff;
		font-size: 0.16rem;
		margin:0.06rem auto 0;
		text-align: center;
		cursor:pointer;
		/*border-radius:0.1rem;*/
	}
	div.ArchiveHeader .selectwrap{
		width:auto;
		height: 0.5rem;
		line-height:0.5rem;
		overflow: hidden;
	}
	div.ArchiveHeader .selectwrap .selectitemwrap{
		width:25%;
		height: 0.5rem;
		line-height:0.5rem;
		overflow: hidden;
		float:left;
	}
	div.ArchiveHeader .selectwrap .selectitemwrap .label{
		width:0.8rem;
		height: 0.5rem;
		line-height:0.5rem;
		float:left;
		color: #333333;
		text-align: center;
		font-size:0.16rem;
	}
	div.ArchiveHeader .selectwrap .selectitemwrap .selectitem{
		width:auto;
		height: 0.5rem;
		line-height:0.48rem;
		overflow: hidden;
		color: #333333;
		font-size:0.16rem;
		border-left: solid 1px #ccc;
		border-right: solid 1px #ccc;
		padding:0 0.07rem;
	}
	/*下拉框样式*/
	div.ArchiveHeader .el-select{
		width:100%;
	}

	div.ArchiveHeader .el-select .el-input input{
		height:0.36rem;
		width:100%;
		line-height:0.34rem;
		border:solid  0.01rem #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		border-radius:0;
		text-align: center;
	}
	div.ArchiveHeader .el-select.lib1 .el-input input{
		padding:0;
	}
	.headerSelectlib1{
		padding:0;
		text-align:center;
	}
	.headerSelectlib1 li{
		padding:0;
		text-align:center;
	}
	/*时间选择*/
	
	div.ArchiveHeader .el-date-editor{
		width:100%;
		height:0.36rem;
		font-size:0.16rem;
		background:#f2f2f2;
		text-align: center;
		display:inline-flex;
	}
	div.ArchiveHeader .el-date-editor input{
		width:100%;
		height:0.36rem;
		border-radius:0;
		border:0.01rem solid #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		text-align: center;
		color:#333;
		padding-right:30px;
	}
	div.ArchiveHeader .el-input__prefix{
		line-height: 0.34rem;
	}

	div.ArchiveHeader .el-input input{
		height:0.36rem;
		width:100%;
		line-height:0.34rem;
		border:solid  0.01rem #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		border-radius:0;
		text-align: center;
	}
	div.ArchiveHeader .bg{
		background-color: #fbfbfb;
	}

</style>
<script>
//import SinograinModal from '@/components/common/action/Modal.vue';
import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';

export default {
    props: ['listHeader'],
    data() {
        return {
        	true:true,
        	false:false,
        	pickerOptions2: {
		        shortcuts: [{
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		        }, {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		        }, {
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		              picker.$emit('pick', [start, end]);
		            }
		        }]
	        },	
	        date_select: '',
	        selectlib:'',
	        selectlib2:'',
		    position:'',
        };
    },
    created(){

    },
    methods:{
		
    	dateChange(){
//  		console.log(this.date_select);
			var datearr=[];
			    datearr[0]=Date.parse(this.date_select[0]);
			    datearr[1]=Date.parse(this.date_select[1]);
//			console.log(datearr)
    		this.$emit('dateChange',this.date_select);
    	},
    	dateChange2(){
//  		console.log(this.date_select);
//  		this.$emit('dateChange',this.date_select);
    	},
//  	直属库
    	selectlibChange1(){
			this.selectlib2='';
    	},
//  	二级库
    	selectlibChange(){
    		
    	},	
		searchingfor(){
			if(!this.selectlib2){
				this.$notify({
		          	title: '错误提示',
		          	message: '请选择储存库点！！！',
		          	type: 'warning',
		        });
		        return
			}
			if(!this.date_select){
				this.$notify({
		          	title: '错误提示',
		          	message: '请选择入库时间！！！',
		          	type: 'warning',
		        });
		        return
			}
			if(!this.position){
				this.$notify({
		          	title: '错误提示',
		          	message: '请填写仓号！！！',
		          	type: 'warning',
		        });
		        return
			}
			var searchparams={};
			searchparams.libraryId=this.selectlib2;
			searchparams.barnTime=this.date_select;
			searchparams.position=this.position;
    		this.$emit('getSearchParams',searchparams);
		},

    },
    computed: {
  		...mapGetters(["remarkses"]),
       	libraryList1(){
//	    	if(this.selectlib=='全部'){
//	    		return [];
//	    	}else{    		
	    		return	this.listHeader.libraryList.filter((item)=>{
	    			return item.pLibraryId==-1
	    		})
//	    	}
	    },
	    libraryList2(){
	    	if(this.selectlib=='全部'){
	    		return [];
	    	}else{    		
	    		return	this.listHeader.libraryList.filter((item)=>{
	    			return item.pLibraryId==this.selectlib
	    		})
	    	}
	    },

	},

}
</script>