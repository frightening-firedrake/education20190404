<template>
    <div class='listpagewrap home'>
    	<div class="rowL1">
    		
    		<div class="right">
    			<ul>
    				<li v-for="(item,index) in menu">
    					<div class="box" >
	    					<span>
	    						{{item.title}}
	    					</span>
	    					<p>
	    						{{item.subtitle}}
	    						<i>起</i>
	    					</p>
	    					<div class="img" :style="styleRight[index]"></div>
    					</div>
    				</li>
    			</ul>
    		</div>
    		<div class="left">
    			<div class='banner'>
		    		<ul>
		    			<li v-for="item in banner" :style="item">
		    			</li>
		    		</ul>
		    	</div>
    		</div>
    	</div>
    	<div class="rowL2">
    		
    		<div class="right">
    			<p class="title">
    				<span>
	    				<!--<el-badge :value="12" class="item">-->
	    					新消息通知
	    					<b class="wrap" @click="viewList">    						
		    					<el-badge class="mark" style="line-height:normal;margin-left:0.1rem;cursor:pointer;"  :value="msgTotal" />
	    					</b>
						<!--</el-badge>-->
    					<!--<i></i>-->
    				</span>
    			</p>
    			<ul>
    				<li v-for="(item,index) in msg">
    					<div class="btnwrap">
    						<span class="btn" @click="view(item)">    							
    							查看详情
    						</span>
    					</div>
    					<div class="msgwrap">
    						<span>{{index-0+1+'、'}}</span>
    						<p class="msg">
		    					{{item.informContent}}
		    					<!--<el-badge v-if="item.state==-1" class="mark" style="" value="new" />-->
    						</p>
    					</div>
    				</li>
    				<template v-if="!msg.length">
    					<div class="empty">暂无新消息通知</div>
    				</template>
    			</ul>
    		</div>
    		<div class="left">
				<p class="title">
    				<span>扫黑除恶案件数量质量统计表</span>
    			</p>
    			<div class="chart" id="chartH">
    				
    			</div>
    		</div>
    	</div>
    </div>
</template>

<style>
.listpagewrap.home{
	padding-left:0;
	padding-right:0;
	/*border-top:1px solid rgba(0,0,0,0);*/
	/*background-color:rgba(241, 241, 241, 1);*/
	background:#fdfdfd;
	border-top:0.4rem solid rgba(241, 241, 241, 1);
	height:auto;
	padding-bottom:0.4rem;
}
.home .rowL1{
	width:auto;
	height:2.5rem;
	margin:0 0 0.15rem 0;
	padding-top:0.25rem;
	/*background:#fff;*/
	box-sizing: content-box;
}
.home .rowL1 .right{
	float:right;
	height:2.5rem;
	width:6.3rem;
}
.home .rowL1 .right ul{
	height:100%;
	width:100%;
	position:relative;
}

.home .rowL1 .right ul li{
	height:1.2rem;
	margin-bottom:0.1rem;
	padding-right:0.25rem;
	width:50%;
	background-color: #ffffff;
	float:left;
}
.home .rowL1 .right ul li div.box{
	height:1.2rem;
	width:auto;
	padding:0.2rem 1.12rem 0 0.12rem;
	position:relative;
	background-color: #ffffff;
	border: solid 1px #e4ebf1;
}
.home .rowL1 .right ul li div.box span{
	font-size:0.16rem;
	color: #666666;
}
.home .rowL1 .right ul li div.box p{
	font-size:0.43rem;
	color: #333333;
}
.home .rowL1 .right ul li div.box p i{
	font-size:0.18rem;
	color: #333333;
	font-style: normal;
}
.home .rowL1 .right ul li div.box .img{
	position:absolute;
	top:50%;
	margin-top:-0.45rem;
	right:0.22rem;
	width:0.9rem;
	height:0.9rem;
	border-radius:0.1rem;
	background-position: center;
	background-repeat: no-repeat;
	background-size:0.9rem 0.9rem;
}
.home .rowL1 .left{
	height:2.5rem;
	overflow: hidden;
	padding:0 0.25rem;
}

.home .banner{
	width:100%;
	height:100%;
}
.home .banner ul{
	width:100%;
	height:100%;
}
.home .banner ul li{
	width:100%;
	height:100%;
	background-size: cover;
	background-position:center;
	background-repeat: no-repeat;
}
.home .rowL2{
	width:auto;
	height:6.05rem;
}
.home .rowL2 .right{
	float:right;
	height:6.05rem;
	width:6.3rem;
	padding-right:0.25rem;
}
.home .rowL2 .right ul{
	border-left:solid 1px #e4ebf1;
	border-right:solid 1px #e4ebf1;
	border-bottom:solid 1px #e4ebf1;
	background-color: #ffffff;
	padding:0.07rem 0.22rem 0;
	min-height:5.55rem;
	position:relative;
}
.home .rowL2 .right ul .empty{
	position:absolute;
	top:50%;
	left:50%;
	margin-left:-8em;
	margin-top:-15px;
	width:16em;
	height:30px;
	line-height:30px;
	text-align: center;
	font-size:0.22rem;
	color:#333;
}
.home .rowL2 .right ul li{
	display: block;
	width:auto;
	height: 0.4rem;
	background-color: #f1f1f1;
	border-radius: 0.05rem;
	padding:0 1.3rem 0 0.2rem;
	line-height:0.4rem;
	position:relative;
	margin:0.07rem 0 0.14rem;
	color: #666666;
}
.home .rowL2 .right ul li:hover{
	background-color: #4c90db;
	color: #ffffff;
}
.home .rowL2 .right ul li:hover .btn{
	color: #ffffff;
}
.home .rowL2 .right ul li .btnwrap{
	display: block;
	width:1.3rem;
	position:absolute;
	top:0;
	right:0;
	height:0.4rem;
	line-height:0.4rem;
	text-align: center;
}
.home .rowL2 .right ul li .btn{
	cursor:pointer;
	color: #4c90db;
	text-decoration: underline;
	font-size:0.14rem;
}
.home .rowL2 .right ul li .msgwrap{
	display: block;
	width:auto;
	position:relative;
	height:100%;
	overflow: hidden;
}
.home .rowL2 .right ul li .msgwrap span{
	position:absolute;
	top:0;
	left:0;
	height:100%;
	width:0.3rem;
}
.home .rowL2 .right ul li .msgwrap .msg{
	padding-left:0.3rem;
	/*padding-right:18px;*/
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	position:relative;
}
.home .rowL2 .left{
	/*height:6.05rem;*/
	height:6.1rem;
	overflow: hidden;
	padding:0 0.25rem;
}
.home .rowL2 .left .chart{
	border-left:solid 1px #e4ebf1;
	border-right:solid 1px #e4ebf1;
	border-bottom:solid 1px #e4ebf1;
	background-color: #ffffff;
	min-height:5.55rem;
}
.home .title{
	height:0.48rem;
	line-height:0.48rem;
	border:1px solid #e4ebf1;
	background-color: #f6f5f8;
	box-sizing: content-box;
	padding-left:0.22rem;
}
.home .title span{
	font-size:0.2rem;
	padding-left:0.23rem;
	border-left:3px solid #5278d5;
	color: #333333;
	position:relative;
}
.home .title span i{
	width: 0.12rem;
	height: 0.12rem;
	border-radius: 50%;
	background-color: #fa8564;
	box-shadow: 0px 0px 7px 0px 
		rgba(250, 133, 100, 0.35);
	border: solid 0.01 #ffffff;
	position:absolute;
	top:0.06rem;
	right:-0.16rem;
}

</style>

<script>
import SinograinList from '@/components/common/action/List.vue';
import "@/assets/style/index/home.css";
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
//本地测试要用下面import代码
//import data from '@/util/mock';
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图图组件
require('echarts/lib/chart/line')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require("echarts/lib/component/legend")
require("echarts/lib/component/title");
require("echarts/lib/component/dataZoom");
require("echarts/lib/component/toolbox");


export default {
  components: {
    SinograinList
  },
  computed:{
	...mapState(["mask"]),
	...mapGetters(["modal_id"]),
	
  },
  created(){
//  获取列表数据（第一页）
	this.findSumAndValid()
	this.findNum()
	this.getdata()
	clearInterval(this.T)
//	this.T=setInterval(this.getdata,10000)
	
	
  },
  destroy(){
  	
  },
  beforeRouteLeave(to, from, next){
  	console.log(this.T)
	clearInterval(this.T)
	next();
  },
  mounted() {
//  this.setChart();
  },
  methods: {
  	...mapMutations(['close_modal']),
  	...mapActions(['addAction']),

//	获取数据方法
  	findSumAndValid(){
		this.$http({
		    method: 'post',
			url: this.datalistURL1,
			transformRequest: [function (data) {
				// Do whatever you want to transform the data
				let ret = ''
				for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {
			    
			}
	    }).then(function (response) {
	    	var arr_sum=[];
	    	var arr_validNumber=[];
	    	response.data.forEach((value)=>{
	    		var obj_sum=[];
	    		var obj_validNumber=[];
	    		obj_sum[0]=value.createTime;
	    		obj_sum[1]=value.sum;
	    		obj_validNumber[0]=value.createTime;
	    		obj_validNumber[1]=value.validNumber;
	    		arr_sum.push(obj_sum);
	    		arr_validNumber.push(obj_validNumber);
	    	})
			this.sum=arr_sum;
      		this.validNumber=arr_validNumber;
    		this.setChart();

		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
  	findNum(){
		this.$http({
		    method: 'post',
			url: this.datalistURL2,
			transformRequest: [function (data) {
				// Do whatever you want to transform the data
				let ret = ''
				for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {
			    
			}
	    }).then(function (response) {
			this.menu[0].subtitle=response.data.sum
			this.menu[1].subtitle=response.data.invalidNumber
			this.menu[2].subtitle=response.data.validNumber
			this.menu[3].subtitle=response.data.endNumber
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
  	getdata(){
  		var params={};
		params.state=-1

		this.$http({
		    method: 'post',
			url: this.datalistURL3,
			transformRequest: [function (data) {
				// Do whatever you want to transform the data
				let ret = ''
				for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {
				page:1,
			    rows:10,
			    params: JSON.stringify(params)
			}
	    }).then(function (response) {
			this.msg=response.data.rows
			this.msgTotal=response.data.total
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
	setChart() {
	    let myChart = echarts.init(document.getElementById('chartH'))
		var lastdata=this.sum[this.sum.length-1][0]
	    var dataNow=new Date();//今天
	    var dataLast=new Date(lastdata);//数据最后一天
		var oneDay = 24 * 3600 * 1000;//一天毫秒
//		var datastart = new Date(dataNow-oneDay*7);//默认最后7天
		var datastart = new Date(dataLast-oneDay*7);//默认最后7天
	    myChart.setOption({
	        title: {
		        text: '扫黑除恶案件数量质量统计表',
		        show:false,
		    },
		    color:['#2474bd','#dba85b'],
		    tooltip: {
		        trigger: 'axis',
		        backgroundColor:'#ffffff',
		        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
//		        alwaysShowContent:true,
		        textStyle:{
		        	color:'#333'
		        },
		        formatter: function (params) {
		        	var str2="<div><p><span style='color:#333;'>"+params[0].data[0]+"</span></p><p>&nbsp;&nbsp;&nbsp;总数：<span style='color:"+params[0].color+";'>"+params[0].data[1]+"起</span></p><p>有效数：<span style='color:"+params[1].color+";'>"+params[1].data[1]+"起</span></p><p>有效率：<span style='color:#2abb03;'>"+Math.round(params[1].data[1]/params[0].data[1]*100)+"%</span></p><p style='text-align:center;'><span style='color:#333;'>"+params[0].name+"</span></p></div>";
		            return str2;
		        },
		        padding:[5,10,5,10],
		    },
		    legend: {
		    	top:25,
//		    	bottom:25,
		        data:['扫黑除恶接警总数','扫黑除恶接警有效数']
		    },
		    grid: {
		        left: '80',
		        right: '85',
		     	bottom: '80',
//		      	containLabel: true
		    },
		    toolbox: {
		    	orient:'vertical',
		        feature: {
		            mark: {show: true},
		            dataView: {
		            	show: true,
		            	readOnly: false,
		            	optionToContent: function(opt) {
						    var axisData = opt.series[0].data;
						    var series = opt.series;
						    var table = '<table style="width:100%;text-align:center"><tbody><tr>'
						                 + '<td>时间</td>'
						                 + '<td>' + series[0].name + '</td>'
						                 + '<td>' + series[1].name + '</td>'
						                 + '<td>有效率</td>'
						                 + '</tr>';
						    for (var i = 0, l = axisData.length; i < l; i++) {
						        table += '<tr>'
						                 + '<td>' + axisData[i][0] + '</td>'
						                 + '<td>' + series[0].data[i][1] + '起</td>'
						                 + '<td>' + series[1].data[i][1] + '起</td>'
						                 + '<td>' + Math.round(series[1].data[i][1]/series[0].data[i][1]*100) + '%</td>'
						                 + '</tr>';
						    }
						    table += '</tbody></table>';
						    return table;
						},
						contentToOption:function(a,b){
//							console.log(a,b)
						},
		            },
//		            magicType: {show: true, type: ['line', 'bar','tiled']},
//		            magicType: {show: true, 
//		            	type: ['line', 'bar',]
//		            },
		            restore: {show: true},
		            saveAsImage: {show: true}
		        },
		        itemGap:20, 
		        top:50,
		        right:30,
		    },
		    xAxis: {
		    	type: 'time',
//		        boundaryGap: false,
//		        boundaryGap: [3600 * 24 * 1000, 3600 * 24 * 1000],
//		        min:'dataMin',
//				min: function(value) {
//				    return value.min - 3600 * 24 * 1000;
//				},
//				max: function(value) {
//				    return value.max + 3600 * 24 * 1000;
//				},
				minInterval: 3600 * 24 * 1000,
		        axisLabel:{
			        formatter: function (value, index) {
			        	var date = new Date(value);
		    			var time=date.getFullYear()+'年\n'+(date.getMonth() + 1)+'月'+date.getDate()+'日';
					    return time;
					},		        	
		        },
		    },
		    yAxis: {
		        type: 'value'
		    },
		    dataZoom: [
		    	{
			        type: 'inside',

			        start: 0,
//			        startValue:datastart,
			        end: 100,
//			        minValueSpan:3600 * 24 * 1000 * 7,
			    }, 
			    {
			        start: 0,
			        end: 10,
			        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			        handleSize: '80%',
			        handleStyle: {
			            color: '#fff',
			            shadowBlur: 3,
			            shadowColor: 'rgba(0, 0, 0, 0.6)',
			            shadowOffsetX: 2,
			            shadowOffsetY: 2
			        },
			        labelFormatter: function (value) {
					    var date = new Date(value);
		    			var time=date.getFullYear()+'年\n'+(date.getMonth() + 1)+'月'+date.getDate()+'日';
					    return time;
					}
		    	}
			],
		    series: [
		        {
		            name:'扫黑除恶接警总数',
		            type:'line',
		            data:this.sum
		        },
		        {
		            name:'扫黑除恶接警有效数',
		            type:'line',
		            data:this.validNumber
		        },
		       
		    ]
		});
	},
//	查看详情
	view(item){
//		console.log(item)
		this.$router.push({path: '/index/evilCriminalCases/pendingTrialCaseList/pendingTrialCaseView',query:{id:item.id,state:item.state}})
//		this.$router.push({path: '/index/evilCriminalCases/comprehensiveCriminalCaseList/criminalCasesView',query:{id:item.id,state:item.state}})
	},
	viewList(){
		this.$router.push({path: '/index/evilCriminalCases/pendingTrialCaseList'})
//		this.$router.push({path: '/index/evilCriminalCases/comprehensiveCriminalCaseList'})
	}
  },
  data() {
    return {  	
    	T:'',
      	datalistURL1: this.apiRoot + 'information/findSumAndValid',
      	datalistURL2: this.apiRoot + 'information/findNum',
      	datalistURL3: this.apiRoot + 'information/data',
      	msgTotal:'',
      	sum:[],
      	validNumber:[],
//    	sum:[["2018-10-26", 8],["2018-10-27", 9],["2018-10-28", 66],["2018-10-29", 8],["2018-10-30", 9],["2018-10-31", 66]],
//    	validNumber:[["2018-10-26", 2],["2018-10-27", 2],["2018-10-28", 55],["2018-10-29", 8],["2018-10-30", 9],["2018-10-31", 66]],
      	banner:[
      		{backgroundImage:"url(static/images/index/welcome.png)"}
      	],
		msg:[
			
		],
		styleLeft:[
			{backgroundColor:'#ff4c78',backgroundImage:"url(static/images/index/xiaomai.png)"},//小麦
			{backgroundColor:'#2dc0e8',backgroundImage:"url(static/images/index/yumi.png)"},//玉米
			{backgroundColor:'#ff9940',backgroundImage:"url(static/images/index/shiyongyou.png)"},//食用油
		],
		menu:[
			{
				title:'扫黑除恶案件总数',
				subtitle:'0',
			},
			{
				title:'扫黑除恶无效案件',
				subtitle:'0',
			},
			{
				title:'已接警扫黑除恶案件',
				subtitle:'0',
			},
			{
				title:'已结案扫黑除恶案件',
				subtitle:'0',
			},
		],
		styleRight:[
			{backgroundColor:'#fa8564',backgroundImage:"url(static/images/index/card1.png)"},
			{backgroundColor:'#aec785',backgroundImage:"url(static/images/index/card2.png)"},
			{backgroundColor:'#4c90db',backgroundImage:"url(static/images/index/card3.png)"},
			{backgroundColor:'#ffc100',backgroundImage:"url(static/images/index/card4.png)"},
		],
		
      
      
     
      
    }
  }
}
</script>