<template>
	<div class="ArchiveTable">
		<div class="title">
			<p>
				中央事权粮检查（验）档案
			</p>
			<span>
				单位：t，kg，m、m3，g/l，kg/m3，％，检验标准单位
			</span>
		</div>
		<div class="base17">
			<div class="row2 nbb bg">
				<span>基本信息</span>
			</div>
			<div class="row1 bg">单位名称</div>
			<div class="row1 col3">{{tabledatas.pLibraryName?'中央储备粮'+tabledatas.pLibraryName+'直属库有限公司':''}}</div>
			<div class="row1 bg">仓号</div>
			<div class="row1">{{tabledatas.position}}</div>
			<div class="row1 bg">仓型</div>
			<div class="row1">{{tabledatas.barnType}}</div>
			<div class="row1 bg">性质</div>
			<div class="row1">{{tabledatas.quality}}</div>
			<div class="row1 bg">收获年度</div>
			<div class="row1">{{tabledatas.gainTime}}</div>
			<div class="row1 bg">主任</div>
			<div class="row1">{{tabledatas.libraryName?'贺顺平':''}}</div>
			<div class="row1 bg">科长</div>
			<div class="row1 nbr">{{tabledatas.libraryName?'陈刚':''}}</div>
			
			<div class="row1 bg nbb">储存库点</div>
			<div class="row1 nbb col3">{{tabledatas.libraryName}}</div>
			<div class="row1 bg nbb">品种</div>
			<div class="row1 nbb">{{tabledatas.sort}}</div>
			<div class="row1 bg nbb">仓容</div>
			<div class="row1 nbb">{{tabledatas.cangrong}}</div>
			<div class="row1 bg nbb">数量</div>
			<div class="row1 nbb">{{tabledatas.amount}}</div>
			<div class="row1 bg nbb">入库时间</div>
			<div class="row1 nbb">{{tabledatas.barnTime|dateM}}</div>
			<div class="row1 bg nbb">分管主任</div>
			<div class="row1 nbb">{{tabledatas.libraryName?'姚理刚':''}}</div>
			<div class="row1 bg nbb">
				<span>保管员监管员</span>
			</div>
			<div class="row1 nbr"></div>	
			<div class="clear"></div>
		</div>
		
		<div class="checkres">
			<div class="row7 bg nbb" style='line-height: 0.6rem;border-right:1px solid #333;'>
				<div class="xuhao">
					<span>
						检查序号事项
					</span>
				</div>
				<span class="num">
					NO.{{currentPage}}
				</span>
			</div>
			<div class="row7 col5 nbb" style='border-right:1px solid #333;'>
				<div class="row7 bg nbb">
					<span>数量情况</span>
				</div>
				<div class="row1 bg">粮堆形状</div>	
				<div class="row1">{{tabledatas.shape}}</div>	
				<div class="row1 bg">容重</div>	
				<div class="row1 nbr">{{tabledatas.realCapacity?tabledatas.realCapacity.toFixed(0):''}}</div>	
				<div class="row1 bg">长度</div>	
				<div class="row1">{{tabledatas.length?tabledatas.length.toFixed(2):''}}</div>	
				<div class="row1 bg">修正系数</div>	
				<div class="row1 nbr">{{tabledatas.correctioFactor?tabledatas.correctioFactor.toFixed(2):''}}</div>	
				<div class="row1 bg">宽度</div>	
				<div class="row1">{{tabledatas.wide?tabledatas.wide.toFixed(2):''}}</div>	
				<div class="row1 bg">平均密度</div>	
				<div class="row1 nbr">{{tabledatas.aveDensity?tabledatas.aveDensity.toFixed(1):''}}</div>	
				<div class="row1 bg">平均高度</div>	
				<div class="row1">{{tabledatas.high?tabledatas.high.toFixed(2):''}}</div>	
				<div class="row1 bg">测量计算数</div>	
				<div class="row1 nbr">{{tabledatas.unQuality?tabledatas.unQuality.toFixed(0):''}}</div>	
				<div class="row1 bg">测算体积</div>	
				<div class="row1">{{tabledatas.measuredVolume?tabledatas.measuredVolume.toFixed(1):''}}</div>	
				<div class="row1 bg">保管账面数</div>	
				<div class="row1 nbr">{{tabledatas.grainQuality?tabledatas.grainQuality.toFixed(0):''}}</div>	
				<div class="row1 bg">扣除体积</div>	
				<div class="row1">{{tabledatas.deductVolume?tabledatas.deductVolume.toFixed(1):''}}</div>	
				<div class="row1 bg">差率</div>	
				<div class="row1 nbr">{{tabledatas.slip?tabledatas.slip.toFixed(1):''}}</div>	
				<div class="row1 bg nbb">测算净体积</div>	
				<div class="row1 nbb">{{tabledatas.realVolume?tabledatas.realVolume.toFixed(1):''}}</div>	
				<div class="row1 nbb"></div>	
				<div class="row1 nbr nbb"></div>	
			</div>
			<div class="row7 col6 nbb" style='border-right:1px solid #333;'>
				<div class="row7 bg nbb">
					<span>质量情况</span>
				</div>
				<template v-if="this.tabledatas.sort=='小麦'">
					<div class="row1 bg col2">等级</div>	
					<div class="row1">{{tabledatas.qualityGrade==1?"一等":tabledatas.qualityGrade==2?"二等":tabledatas.qualityGrade==3?"三等":""}}</div>	
					<div class="row1 bg">硬度指数</div>	
					<div class="row1 nbr">{{tabledatas.yingduzhishu}}</div>	
					<div class="row1 bg col2">容重</div>	
					<div class="row1">{{tabledatas.rongzhong}}</div>	
					<div class="row1 bg">面筋吸水量</div>	
					<div class="row1 nbr">{{tabledatas.mianjinxishuiliang}}</div>	
					<div class="row1 bg col2">水分</div>	
					<div class="row1">{{tabledatas.shuifen}}</div>	
					<div class="row1 bg">品尝评分</div>	
					<div class="row1 nbr">{{tabledatas.pinchangpingfen}}</div>	
					<div class="row2 bg col03">杂质</div>	
					<div class="row1 bg col07">总量</div>	
					<div class="row1">{{tabledatas.zazhi}}</div>	
					<div class="row1 bg">色泽气味</div>	
					<div class="row1 nbr">{{tabledatas.sezeqiwei2}}</div>	
					<div class="row1 bg col07">
						<span>其中：矿物质</span>		
					</div>	
					<div class="row1">{{tabledatas.kuangwuzhi}}</div>	
					<div class="row1"></div>	
					<div class="row1 nbr"></div>	
					<div class="row1 bg col2">不完善粒</div>	
					<div class="row1">{{tabledatas.buwanshanli}}</div>	
					<div class="row1"></div>	
					<div class="row1 nbr"></div>	
					<div class="row1 bg col2 nbb">色泽气味</div>	
					<div class="row1 nbb">{{tabledatas.sezeqiwei1}}</div>	
					<div class="row1 nbb"></div>	
					<div class="row1 nbr nbb"></div>						
				</template>
				
				<template v-if="this.tabledatas.sort=='玉米'">
					<div class="row1 bg col2">等级</div>	
					<div class="row1">{{tabledatas.qualityGrade==1?"一等":tabledatas.qualityGrade==2?"二等":tabledatas.qualityGrade==3?"三等":""}}</div>	
					<div class="row1 bg">脂肪酸值</div>	
					<div class="row1 nbr">{{tabledatas.zhifangsuanzhi}}</div>	
					<div class="row1 bg col2">容重</div>	
					<div class="row1">{{tabledatas.rongzhong}}</div>	
					<div class="row1 bg">品尝评分</div>	
					<div class="row1 nbr">{{tabledatas.pinchangpingfen}}</div>	
					<div class="row1 bg col2">水分</div>	
					<div class="row1">{{tabledatas.shuifen}}</div>	
					<div class="row1 bg">色泽气味</div>	
					<div class="row1 nbr">{{tabledatas.sezeqiwei2}}</div>	
					<div class="row1 bg col2">杂质</div>	
					<div class="row1">{{tabledatas.zazhi}}</div>	
					<div class="row1"></div>	
					<div class="row1 nbr"></div>	
					<div class="row2 bg col03">					
						<span>不完善粒</span>
					</div>	
					<div class="row1 bg col07">总量</div>	
					<div class="row1">{{tabledatas.buwanshanli}}</div>	
					<div class="row1"></div>	
					<div class="row1 nbr"></div>	
					<div class="row1 bg col07">
						<span>其中：生霉粒</span>		
					</div>	
					<div class="row1">{{tabledatas.shengmeili}}</div>	
					<div class="row1"></div>	
					<div class="row1 nbr"></div>	
					
					<div class="row1 bg col2 nbb">色泽气味</div>	
					<div class="row1 nbb">{{tabledatas.sezeqiwei1}}</div>	
					<div class="row1 nbb"></div>	
					<div class="row1 nbr nbb"></div>						
				</template>
			</div>
			
			<div class="row7 col51 nbb">
				<div class="row7 bg nbb">
					<span>主要存在问题</span>
				</div>
				<div class="problem">
					<p>监督检查报告中的问题：</p>
					<p v-if="tabledatas.problem[0]!=='null'" v-for="(item,index) in tabledatas.problem">问题{{index+1+':'+item}}</p>
				</div>
			</div>	
			<div class="clear"></div>
		</div>
		<div class="checker">
			<div class="row1 bg">检查人</div>
			<div class="row1 col3 ot" :title="tabledatas.gzdgRummager">{{tabledatas.gzdgRummager}}</div>
			<div class="row1 bg">时间</div>
			<div class="row1" style='border-right:1px solid #333;'>{{tabledatas.gzdgTime|dateD}}</div>
			<div class="row1 bg">检验员</div>
			<div class="row1 col31 ot" :title="tabledatas.jianyanyuan">{{tabledatas.jianyanyuan}}</div>
			<div class="row1 bg">时间</div>
			<div class="row1" style='border-right:1px solid #333;'>{{tabledatas.jianceTime|dateD}}</div>
			<div class="row1 bg">记录人</div>
			<div class="row1 col32 ot" :title="tabledatas.rummager=='null'?'':tabledatas.rummager">{{tabledatas.rummager=='null'?'':tabledatas.rummager}}</div>
			<div class="row1 bg">时间</div>
			<div class="row1 nbr">{{tabledatas.jianduTime|dateD}}</div>
			<div class="clear"></div>
		</div>
		
		
	</div>
</template>
<style>
	.ArchiveTable{
		margin-top:0.1rem;
	}
	.ArchiveTable .title{
		border-radius: 0.1rem 0.1rem 0px 0px;
		border: solid 1px #cccccc;
		overflow: hidden;
		border-bottom:none;
	}
	.ArchiveTable .title p{
		background-color: #eeeeee;
		border-bottom: solid 1px #cccccc;
		color: #333333;
		font-size:0.2rem;
		height:0.6rem;
		line-height: 0.6rem;
		text-align: center;
	}
	.ArchiveTable .title span{
		background-color: #fff;
		color: #333333;
		font-size:0.16rem;
		height:0.4rem;
		line-height: 0.4rem;
		text-align: center;
		padding-right:0.13rem;
		text-align: right;
		display: block;
	}
	.ArchiveTable .base17{
		border: solid 1px #333333;
	}
	.ArchiveTable .base17 .row1{
		float:left;
		height:0.5rem;
		line-height:0.5rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-right: solid 1px #cccccc;
		border-bottom: solid 1px #cccccc;
		width:6%;
	}
	.ArchiveTable .base17 .row2{
		float:left;
		height:1rem;
		line-height:1rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-right: solid 1px #cccccc;
		border-bottom: solid 1px #cccccc;
		width:6%;
	}
	.ArchiveTable .base17 .row2 span{
		display: inline-block;
		width:2em;
		line-height:0.2rem;
		vertical-align: middle;
	}
	.ArchiveTable .base17 .row1 span{
		display: inline-block;
		width:3em;
		line-height:0.2rem;
		vertical-align: middle;
	}
	.ArchiveTable .base17 .row1.col3{
		width:16%;
	}
	.ArchiveTable .nbb{
		border-bottom:none!important;
	}
	.ArchiveTable .nbr{
		border-right:none!important;
	}
	.clear{
		width:0;
		height:0;
		clear:both;
	}
	.ArchiveTable .checkres{
		margin-top:0.1rem;
		border: solid 1px #333333;
	}
	.ArchiveTable .checkres .col5 .row1{
		float:left;
		height:0.5rem;
		line-height:0.5rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-right: solid 1px #cccccc;
		border-bottom: solid 1px #cccccc;
		width:20%;
	}
	.ArchiveTable .checkres .col6 .row1{
		float:left;
		height:0.5rem;
		line-height:0.5rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-right: solid 1px #cccccc;
		border-bottom: solid 1px #cccccc;
		width:18%;
	}
	.ArchiveTable .checkres .col6 .row2{
		float:left;
		height:1rem;
		line-height:1rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-right: solid 1px #cccccc;
		border-bottom: solid 1px #cccccc;
		width:18%;
	}
	.ArchiveTable .checkres .row7{
		float:left;
		height:3.5rem;
		line-height:3.5rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-right: solid 1px #cccccc;
		border-bottom: solid 1px #cccccc;
		width:6%;
	}
	.ArchiveTable .checkres .row7.col5 .row7{
		float:left;
		height:3.5rem;
		line-height:3.5rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-right: solid 1px #cccccc;
		border-bottom: solid 1px #cccccc;
		width:20%;
	}
	.ArchiveTable .checkres .row7.col51 .row7{
		float:left;
		height:3.5rem;
		line-height:3.5rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-right: solid 1px #cccccc;
		border-bottom: solid 1px #cccccc;
		width:19%;
	}
	.ArchiveTable .checkres .row7.col6 .row7{
		float:left;
		height:3.5rem;
		line-height:3.5rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-right: solid 1px #cccccc;
		border-bottom: solid 1px #cccccc;
		width:18%;
	}
	.ArchiveTable .checkres .row7 .xuhao{
		height:1rem;
		line-height:1rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-bottom: solid 1px #cccccc;
	}
	.ArchiveTable .checkres .row7 .xuhao span{
		display: inline-block;
		width:2em;
		line-height:0.2rem;
		vertical-align: middle;
	}
	.ArchiveTable .checkres .row7 .row7 span{
		display: inline-block;
		width:1em;
		line-height:0.2rem;
		vertical-align: middle;
	}
	.ArchiveTable .checkres .col6 .col2{
		width:28%;
	}
	.ArchiveTable .checkres .col5{
		width:30%;
	}
	.ArchiveTable .checkres .col51{
		width:31%;
	}
	.ArchiveTable .checkres .col6{
		width:33%;
	}
	.ArchiveTable .checkres .row2.col03{
		width:11%;
		height:0.999rem;
	}
	.ArchiveTable .checkres .row1.col07{
		width:17%;
	}
	.ArchiveTable .checkres .row2.col03 span{
		display: inline-block;
		width:2em;
		line-height:0.2rem;
		vertical-align: middle;
	}
	.ArchiveTable .checkres .row1.col07 span{
		display: inline-block;
		width:4em;
		line-height:0.2rem;
		vertical-align: middle;
	}
	.ArchiveTable .checkres .problem{
		float:left;
		height:3.5rem;
		line-height:0.5rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: left;
		overflow: auto;
		/*border-right: solid 1px #cccccc;*/
		/*border-bottom: solid 1px #cccccc;*/
		width:81%;
		padding:0 0.3rem;
	}
	.ArchiveTable .checker{
		margin-top:0.1rem;
		border: solid 1px #333333;
	}
	.ArchiveTable .checker .row1{
		float:left;
		height:0.5rem;
		line-height:0.5rem;
		font-size: 0.16rem;
		color: #333333;
		text-align: center;
		border-right: solid 1px #cccccc;
		width:6%;
	}
	.ArchiveTable .checker .row1.col3{
		width:18%;
	}
	.ArchiveTable .checker .row1.col31{
		width:15%;
	}
	.ArchiveTable .checker .row1.col32{
		width:13%;
	}
	.ArchiveTable .bg{
		background-color: #fbfbfb;
	}
	.ArchiveTable .checker .ot{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
<script>

//import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';

export default {
    props: ['tabledatas','currentPage'],
    created(){
		
    },
    computed: {
  		...mapGetters(["remarkses"]),
	    
	},
    methods:{

    },
    filters: {
	   	dateY:function (input) {
	   		if(!input){
	   			return
	   		}
	       	var d = new Date(input);
	       	var year = d.getFullYear();
	     	var month = d.getMonth() + 1;
	        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
	        var hour = d.getHours();
	        var minutes = d.getMinutes();
	        var seconds = d.getSeconds();
	        return  year;
	//      return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	   	},
	   	dateM:function (input) {
	   		if(!input){
	   			return
	   		}
	       	var d = new Date(input);
	       	var year = d.getFullYear();
	     	var month = d.getMonth() + 1;
	        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
	        var hour = d.getHours();
	        var minutes = d.getMinutes();
	        var seconds = d.getSeconds();
	        return  year+ '.' + month;
	   	},
	   	dateD:function (input) {
	   		if(!input){
	   			return
	   		}
	       	var d = new Date(input);
	       	var year = d.getFullYear();
	     	var month = d.getMonth() + 1;
	        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
	        var hour = d.getHours();
	        var minutes = d.getMinutes();
	        var seconds = d.getSeconds();
	        return  year+ '.' + month + '.' + day;
	   	},
   	},
    data() {
        return {
       
        }
    },

}
</script>