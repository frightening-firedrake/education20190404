<template>
	<div class="AdvancedSearchWrap">
	    <div class="AdvancedSearch">
	       	<div class="bg" style="background-image:url(static/images/sys/searchbg.png)"></div>
	       	<p>——粮食是关系人民福祉，关乎民族未来的长远大计</p>
	       	<div class="inputwrap">
	       		<div class="searchbtn" @click="searchingfor">
	       			<span>生成检验报告</span>
	       		</div>
	       		<div class="inputwrap2">
	       			<div class="inputwrap3">       				
	       				<span class="el-icon-search"></span>
	       				<input id="AdvancedSearch" v-model="searchText" type="text" placeholder="请输入检验编号" @keydown="searchChange"  @focus="focus" @blur="blur"/>	
	       			</div>
	       		</div>
	       	</div>
	    </div>
		
	    <div v-show="listShow" class="resultList" :style="{width:listWidth}">
	       	<ul>
	       		<li v-for="(item,index) in resultListfilter" :key="item.id" v-html="likeColorFull(item.sampleNum)" @click="selectKeyWord(item.sampleNum)">

	       		</li>
	       	</ul>
	    </div>
	</div>
</template>
<style>
.AdvancedSearchWrap{	
	margin:auto;
	width:8.2rem;
	position:relative;
}
.AdvancedSearch{
	width:8.2rem;
	height:3.9rem;
	background-color:#fff;
	margin:auto;
	border:1px solid #e9eaeb;
	border-radius:0.1rem 0.1rem 0 0;
	box-shadow: 0 0.08rem 0.06rem 0.01rem 
		rgba(67, 67, 67, 0.12);
	overflow-x: hidden;
	position:relative;
}
.AdvancedSearch .bg{
	height:2.7rem;
	background-position:center;
	background-size: cover;
	background-repeat:no-repeat;
}
.AdvancedSearch .inputwrap{
	position:absolute;
	top:2.7rem;
	margin-top:-0.3rem;
	left:0.6rem;
	right:0.6rem;
	height:0.6rem;
	background-color: #e8edf1;
	box-shadow: 0 0.05rem 0.07rem 0 
		rgba(98, 98, 98, 0.26);
	border-radius:0.05rem;
	overflow: hidden;
}
.AdvancedSearch .inputwrap .inputwrap2{
	width:auto;
	height:0.6rem;
	overflow: hidden;
	padding:0.1rem 0.18rem;
}
.AdvancedSearch .inputwrap .inputwrap2 .inputwrap3{
	position:relative;
	background-color:#fff;	
	width:100%;
	height:100%;
}
.AdvancedSearch .inputwrap .inputwrap2 input{
	padding-left:0.46rem;
	width:100%;
	height:100%;
	border:none;
	outline: none;
	font-size:0.18rem;
	color:#333333;
}
.AdvancedSearch .inputwrap .inputwrap2 span{
	position:absolute;
	font-size:0.25rem;
	top:50%;
	left:0.1rem;
	color:#9eb0c3;
	margin-top:-0.12rem;
}
.AdvancedSearch .inputwrap .searchbtn{
	cursor:pointer;
	width:25%;
	height:0.6rem;
	float:right;
	background-color:#58b481;
	padding:0.03rem 0.05rem 0.03rem 0.08rem;
}
.AdvancedSearch .inputwrap .searchbtn span{
	border-radius:0 0.03rem 0.03rem 0;
	text-align: center;
	/*height:0.5rem;*/
	line-height:0.5rem;
	border:1px solid #fff;
	font-size:0.2rem;
	color:#fff;
	display: block;
}
.AdvancedSearch p{
	color:#333333;
	line-height:1.5rem;
	text-align: right;
	padding-right:0.3rem;
	position:absolute;
	font-size:0.16rem;
	width:100%;
	height:1.15rem;
	overflow: hidden;
}
.AdvancedSearchWrap .resultList{
	position:absolute;
	top:3.1rem;
	left:0.78rem;
	background:#fff;
	height:auto;
	border: solid 1px #e6e7e8;
	border-radius:0.05rem;
}
.AdvancedSearchWrap .resultList:before{
	content: '';
	position:absolute;
	top:-7px;
	left:0.2rem;
	width:0;
	height:0;
	border-left: solid 5px rgba(0,0,0,0);
	border-right: solid 5px rgba(0,0,0,0);
	border-bottom: solid 7px #e6e7e8;
	z-index: 6;
}
.AdvancedSearchWrap .resultList:after{
	content: '';
	position:absolute;
	top:-6px;
	left:0.2rem;
	width:0;
	height:0;
	border-left: solid 5px rgba(0,0,0,0);
	border-right: solid 5px rgba(0,0,0,0);
	border-bottom: solid 7px rgba(255,255,255,1);
	z-index: 7;
}
.AdvancedSearchWrap .resultList ul{
	display: block;
	padding:0.08rem 0;
	background-color:#fff;
	height:auto;
	min-height:0.46rem;
}
.AdvancedSearchWrap .resultList ul li{
	cursor:pointer;
	display: block;
	padding:0 0 0 0.46rem;
	background-color:#fff;
	height:0.46rem;
	line-height:0.46rem;
	color:#666666;
	font-size:0.18rem;
}
.AdvancedSearchWrap .resultList ul li:hover{
	background-color:#f6f7fb;
}
</style>
<script>

import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
export default {
	props:['resultList'],
	created(){

	},
	mounted(){
		this.listWidth=document.querySelector('#AdvancedSearch').offsetWidth+'px';
	},
    computed:{
		...mapGetters(["Token","userName"]),
		resultListfilter(){
			var res=[]
			var searchText=this.searchText.startsWith('监')?this.searchText.slice(1):this.searchText;
			if(!this.searchText){
				return [];
			}
			var result=this.resultList.filter((value,index)=>{
				return value.sampleNum.indexOf(searchText)!=-1;
			})
			for(var i=0;i<result.length;i++){
				res.push(result[i]);
				if(i==5){
					break
				}
			}
			return res
		},

    },
    methods:{
		searchingfor(){
			if(!this.searchText){
				this.$notify.error({
		          	title: '错误',
		          	message: '请填写检验编号！！！',
		        });
				return
			}
			this.$emit('searchingfor',this.searchText);
		},
		likeColorFull(Num){
			var sampleNum='监'+Num;
			if(!this.searchText){
				return sampleNum;
			}
			return sampleNum.replace(this.searchText,"<span style='color:#e7023a;'>"+this.searchText+"</span>");
		},
		selectKeyWord(num){
			console.log('监'+num)
			this.searchText='监'+num;
		},
		blur(){
			setTimeout(function(){				
				this.listShow=false;
			}.bind(this),300)
		},
		focus(){
//			console.log(this.resultListfilter)
//			if(!this.resultListfilter.length){
//				this.listShow=false;
//			}
			this.listShow=true;
		},
		searchChange(val){
//			console.log(val)
////			this.$emit('searchChange');
//			if(!this.resultListfilter.length){
//				this.listShow=false;
//			}else{				
//				this.listShow=true;
//			}
		},
	},
    data() {
	    return {
	      	listWidth:'',
	      	searchText:'',
	      	listShow:false,
	    }
	},
}
</script>