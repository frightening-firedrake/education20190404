<template>
    <el-form ref="form" :inline-message="errorinline" class="sampling casedetails"  :model="formdatas.form" :label-width="labelWidth" style="position:relative;border-bottom:1px solid #ccc;">
        <template>
            <p class="tableName">
            	{{formdatas.title}}
            </p>
        	<!--<div class="newbtns">							
				<div class="create" @click="addsafety" style="background-image:url('static/images/sys/create.png');">
					新增安全问题报告
				</div>
			</div>-->
        </template>      
		<el-form-item label="线报地域：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
		    <el-input v-model="formdatas.form.threadArea" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="线报详址：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
		    <el-input v-model="formdatas.form.clueAddress" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="行业领域：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
		    <el-input v-model="industryField" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="举报类别：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
		    <!--<el-input v-model="formdatas.form.informType" :disabled="disabled"></el-input>-->
		    <el-input
		    	  class="row2"
				  type="textarea"
				  autosize
				  disabled
				  v-model="informType">
			</el-input>
<!--			placeholder="请输入内容"-->
		</el-form-item>
		<!--<el-form-item label="问题状态：" class="full select">
			<div class="status">				
			    <el-radio-group v-model="problemStatic" text-color="white" fill="#1bb45f" @change="problemStatusChange">
					<el-radio-button v-for="item in formdatas.statusItems" :key="item.label" :label="item.label">{{item.text}}</el-radio-button>			    
				</el-radio-group>
			</div>
		</el-form-item>-->
		<!--问题组-->
		
		<div class="emptymargin"></div>
		<template v-for="(item, index) in reportFilter">
			<!--<el-form-item label="创建时间：" class="disabled full">
			    <el-input v-model="item.createTime" disabled></el-input>
			</el-form-item>
			<el-form-item label="检查人：" class="disabled full">
			    <el-input v-model="item.rummager" disabled></el-input>
			</el-form-item>-->
				<!--:label="'问题' + (index+1)+'：'"-->
			<el-form-item 
				label="举报内容：" 
				class="problem autoheight" 
				>
				<el-input
				  type="textarea"
				  autosize
				  disabled
				  v-model="item.report">
				</el-input>
<!--				placeholder="请输入内容"-->
			</el-form-item>
			<el-form-item v-if="item.images.length" label="举报图片：" prop="images" class="images uploadedit autoheight">
				<!--<img v-if="item.isDeal!==-1" src="static/images/sys/over.png" alt="" class="hege"/>-->
			    <el-upload
				  disabled
				  ref='upload'
				  :limit='limit'
				  action="/liquid/images"
				  list-type="picture-card"
				  :on-preview="handlePictureCardPreview"
				  
				  :file-list="item.images"
				  :on-remove="handleRemove">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" size="tiny">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>	
			<el-form-item  v-if="item.videos.length" label="举报视频：" class="problem autoheight videoPreview">
				<div class="videobox" v-for="(itemv, index) in item.videos" >	
					<video-player  class="video-player vjs-custom-skin"
					  ref="videoPlayer"
					  :playsinline="true"
					  :options="playerOptions(itemv.src)"
					></video-player>
				</div>

				<!--<el-dialog
				  title="提示"
				  :visible.sync="dialogVisible"
				  width="30%"
				  :before-close="handleClose">
				  <span>这是一段信息</span>
				
				</el-dialog>-->
			</el-form-item>
			<!--<el-form-item v-if="item.isDeal!==-1" label="审批通过人：" class="disabled full">
			    <el-input v-model="item.approver" disabled></el-input>
			</el-form-item>
			<el-form-item v-if="item.isDeal!==-1" label="图片：" prop="images" class="images uploadedit">
			    <el-upload
				  disabled
				  ref='upload'
				  :limit='limit'
				  action="/liquid/images"
				  list-type="picture-card"
				  :on-preview="handlePictureCardPreview"
				  
				  :file-list="item.images2"
				  :on-remove="handleRemove">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" size="tiny">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>	-->
			
			<!--<el-form-item label="" class="full button" label-width="0">
				<div class="btn">					
					<el-button class="yes" type="primary" @click="pass(item.id)" :disabled="item.isDeal!==-1">该问题已整改</el-button>
				</div>
		   </el-form-item>-->
		   
		</template>
		<div class="emptymargin"></div>
		    <!--举报人基本信息-->
		   	<el-form-item label="举报人姓名：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
		    	<el-input v-model="formdatas.form.informerName" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="举报人电话：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
			    <el-input v-model="formdatas.form.phoneNumber" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="举报人其他联系方式：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
			    <el-input v-model="formdatas.form.otherContactWay" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="举报时间：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
			    <el-input v-model="formdatas.form.createTime" :disabled="disabled"></el-input>
			</el-form-item>
			<!--案件进度-->
			<!--未立案-->
			<template v-if="this.$route.query.state==4">
				<el-form-item label="案件进度：" class="" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
				    <el-input class="state4" v-model="state4" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="审核员：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
				    <el-input v-model="formdatas.state[0].assessor" :disabled="disabled"></el-input>
				</el-form-item>	
			</template>
			<!--待审核-->
			<template v-if="this.$route.query.state==-1">
				<el-form-item label="案件进度：" class="full" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
				    <el-input class="state0" v-model="state0" :disabled="disabled"></el-input>
				</el-form-item>
			</template>
			<!--已接案-->
			<template v-if="this.$route.query.state!=4&&this.$route.query.state>-1">
				<el-form-item label="案件进度：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
				    <el-input class="state1" v-model="state1" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="审核员：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
				    <el-input v-model="formdatas.state[0].assessor" :disabled="disabled"></el-input>
				</el-form-item>				
			</template>
			<!--侦办中-->
			<template v-if="this.$route.query.state!=4&&this.$route.query.state>1">
				<el-form-item label="案件进度：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
				    <el-input class="state2" v-model="state2" :disabled="disabled"></el-input>
				    <div class="fujian">
				    	<p @click="fujian1(formdatas.state[1].url)">				    		
				    		<i class="iconfont icon-fujian"></i>
				    		<span>附件</span>
				    	</p>
				    </div>
				</el-form-item>
				<el-form-item label="审核员：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
				    <el-input v-model="formdatas.state[1].assessor" :disabled="disabled"></el-input>
				</el-form-item>
			</template>
			<!--已结案-->
			<template v-if="this.$route.query.state!=4&&this.$route.query.state>2">
				<el-form-item label="案件进度：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
				    <el-input class="state3" v-model="state3" :disabled="disabled"></el-input>
				    <div class="fujian">
				    	<p @click="fujian2(formdatas.state[2].url)">				    		
				    		<i class="iconfont icon-fujian"></i>
				    		<span>附件</span>
				    	</p>
				    </div>
				</el-form-item>
				<el-form-item label="审核员：" prop="pnumber"  v-bind:class="{disabled:disabledshow}">
				    <el-input v-model="formdatas.state[2].assessor" :disabled="disabled"></el-input>
				</el-form-item>				
			</template>
			
		<template v-if="!reportFilter.length">
			<el-form-item label="" class="full empty">
				<div class="empty">					
					<!--佳敏说空着吧-->
				</div>
		    </el-form-item>
		</template>
		 

        <div class="clear"></div>
    </el-form>
</template>
<style>
	.sampling div.status >div{
		float:left;
		/*width:2.85rem;*/
		line-height:0.48rem;
	}
	.sampling div.status >div .el-radio-group{
		float:left;
		margin-top:0.11rem;
	}
	.sampling div.status .el-radio-button{
		height:0.26rem;
		line-height:0.26rem;
		border-radius:0.04rem;
		margin-right:0.15rem;
	}
	.sampling div.status .el-radio-button__inner{
		height:0.26rem;
		line-height:0.24rem;
		border-radius:0.04rem;
		padding:0 0.14rem;
		border: solid 0.01rem #d5d5d5;
		font-size:0.14rem;
		color: #999999;
	}
	form.sampling .el-form-item.select .el-form-item__content .el-radio-group{
		margin-left:0.2rem;
	}
	form.sampling .el-form-item.images .hege{
		position:absolute;
		right:0.4rem;
		top:10%;
		height:80%;
	}
	form.sampling .button{
		height:0.78rem;
		line-height:0.78rem;
	}
	form.sampling .el-form-item.button .el-form-item__content{
		height:0.78rem;
		line-height:0.76rem;
		border-left:none;
	}
	form.sampling .btn{
		clear:both;
		padding:0;
		text-align: center;
		position:relative;
		background:#ffffff;
	}	
	form.sampling .btn button {
	    font-size: 0.18rem;
	    padding: 0rem;
	    line-height: 0.5rem;
	    border-radius: 0.1rem;
	    width:1.3rem;
	    height:0.5rem;
	    text-align: center;
	}
	form.sampling .btn button.yes {
		background-color: rgb(88,180,129);
		border-color:rgb(88,180,129);
	}
	form.sampling .btn button.yes:hover {
		background-color: rgba(88,180,129,0.8);
		border-color:#58b481;
	}
	form.sampling .btn button.is-disabled {
		background-color: #b9b9b9;
		border-color:#cccccc;
	}
	form.sampling .btn button.is-disabled:hover {
		background-color: #b9b9b9;
		border-color:#cccccc;
	}
	form.sampling .el-form-item.empty{
		height:2rem;
		line-height:2rem;
		/*border-bottom:1px solid #cccccc;*/
	}
	form.sampling .el-form-item.empty .el-form-item__content{
		height:2rem;
		line-height:2rem;
		text-align: center;
	}
	form.sampling .el-form-item.uploadedit .el-form-item__content .el-upload--picture-card{
		display:none;
	}
	/*按钮*/
	div.newbtns{
		position:absolute;
		right:0.1rem;
		top:0.14rem;
	}
	div.newbtns div.create{
		height:0.32rem;
		line-height:0.3rem;
		/*width:1.07rem;*/
		padding-left:0.34rem;
		box-sizing: border-box;
		border-radius:0.05rem;
		border:1px solid #58b481;
		color: #58b481;
		font-size:0.2rem;
		text-align:right;
		background-repeat: no-repeat;
		background-position:0.04rem center;
		background-size:0.3rem 0.3rem;
		padding-right:0.07rem;
		cursor:pointer;
	}
	.emptymargin{
		float:left;
		height:0.2rem;
		width:100%;
		position:relative;
		left:-1px;
		border-top:1px solid #d7d7d7;
		background-color:white;
	}
	.casedetails .el-textarea.is-disabled .el-textarea__inner{
		background-color:white;
		color:inherit;
	}
	form.sampling.casedetails .el-form-item .el-form-item__content>.el-textarea.row2{
		line-height:0.43rem;
	}
	form.sampling.casedetails .el-form-item .el-form-item__content>.el-textarea.row2 textarea{
		display: inline-block;
		vertical-align: middle;
		line-height:0.19rem;
		padding-right:3em;
		cursor:default;
	}
	form.sampling.casedetails .el-form-item .el-form-item__content .state0 input{
		color:#fb9d1f;
	}
	form.sampling.casedetails .el-form-item .el-form-item__content .state1 input{
		color:#4c90db;
	}
	form.sampling.casedetails .el-form-item .el-form-item__content .state2 input{
		color:#58b481;
	}
	form.sampling.casedetails .el-form-item .el-form-item__content .state3 input{
		color:#999999;
	}
	form.sampling.casedetails .el-form-item .el-form-item__content .state4 input{
		color:rgb(236,91,60);
	}
	form.sampling.casedetails .el-form-item .el-form-item__content .fujian{
		position:absolute;
		top:0;
		bottom:0;
		right:0;
		width:1.2rem;
		border-left:solid 1px #dfdfdf;
		line-height:0.48rem;
		text-align: center;
		color: #666666;
		font-size:0.16rem;
	}
	form.sampling.casedetails .el-form-item .el-form-item__content .fujian p{
		cursor:pointer;
		display: inline;
	}
	form.sampling.casedetails .el-form-item .el-form-item__content .fujian span{
		text-decoration: underline;
	}
	form.sampling.casedetails .el-form-item .el-form-item__content .fujian i{
		font-size:0.16rem;
	}
	form.sampling.casedetails .el-input.is-disabled .el-input__inner{
		cursor:default;
	}
	form.sampling.casedetails .el-form-item.autoheight{
		height:auto;
	}
	form.sampling.casedetails .el-form-item.autoheight .el-form-item__content{
		height:auto;
		line-height: normal;
	}
	form.sampling.casedetails .el-form-item.autoheight.problem .el-form-item__content{
		line-height:0.9rem;
		padding-top:0.05rem;
		padding-bottom:0.05rem;
	}
	form.sampling.casedetails .el-form-item.autoheight.images .el-form-item__content{
		padding-right:7em;
	}
	form.sampling.casedetails .el-form-item.autoheight .el-form-item__content .el-textarea textarea{

		padding-top:0;
		padding-bottom:0;
		height:auto;
		min-height: auto;
	}
	.video-js .vjs-big-play-button{
     /*播放按钮换成圆形*/
    	height: 2em;
    	width: 2em;
    	line-height: 1.9em;
    	border-radius: 1em;
  	}
  	.vjs-custom-skin > .video-js .vjs-big-play-button{
  		margin-left:-1em;
  	}
  	form.sampling.casedetails .el-form-item.autoheight.videoPreview .el-form-item__content{
		padding:0.2rem 7em 0 0.24rem;
	}
  	.videobox{
  		height: auto;
    	width: 50%;
    	float:left;
    	margin-bottom:0.2rem;
    	padding-right:0.2rem;
  	}
</style>
<script>
import "@/assets/style/common/Form.css";
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
export default {
    props: ["formdatas","reportFilter"],
    created(){
//  	console.log(this.reportFilter)
    },
    mounted: function() {
//		console.log(this.formdatas)
    },
    computed:{
		...mapState(["industryFieldList","informTypeList"]),
		...mapGetters(["Token"]),
 		industryField(){
// 			return this.industryFieldList.filter((value,index)=>{
// 				return value.id==this.formdatas.form.industryField
// 			})[0].name
			return this.formdatas.form.industryField
 		},
 		informType(){
// 			return this.informTypeList.filter((value,index)=>{
// 				return value.id==this.formdatas.form.informType
// 			})[0].name
			return this.formdatas.form.informType
 		},
    },
    data() {
    	
        return {
        	state0:'待审核',
        	state1:'已接案',
        	state2:'侦办中',
        	state3:'已结案',
        	state4:'未立案',
        	limit:5,
			problemStatic:'all',
	        dialogImageUrl: '',
	        dialogVisible: false,
	        labelWidth:'2rem',
	        errorinline:false,
	        disabledshow:false,    
	        disabled:true,    
//	        播放器测试
				

        }
    },
    methods: {  

//      图片上传查看与删除
	    handleRemove(file, fileList) {
	        console.log(file, fileList);
	    },
	    handlePictureCardPreview(file, fileList) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	    },
	    pass(id){
	    	this.$emit("pass",id)
	    },
		addsafety(){
	    	this.$emit("addsafety")		
		},
		fujian1(url){
//			alert(url)
			var loadiframe=document.getElementById('fordownload');
//			console.log(this.apiRoot+'information/fileDownload?id='+url+'&sessionid='+this.Token)
			loadiframe.src=this.apiRoot+'information/fileDownload?id='+url+'&sessionid='+this.Token;
		},
		fujian2(url){
//			alert(url)
			var loadiframe=document.getElementById('fordownload');
			loadiframe.src=this.apiRoot+'information/fileDownloadAgain?id='+url+'&sessionid='+this.Token;
		},
		playerOptions(src){
			var playerOptions={
			        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
			        autoplay: false, //如果true,浏览器准备好时开始回放。
			        muted: false, // 默认情况下将会消除任何音频。
			        loop: false, // 导致视频一结束就重新开始。
			        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
			        language: 'zh-CN',
			        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
			        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
			        sources: [{
			          type: "video/mp4",
			          src:src
			        }],
			        poster: "", //你的封面地址
			        // width: document.documentElement.clientWidth,
			        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
			        controlBar: {
			          timeDivider: true,
			          durationDisplay: true,
			          remainingTimeDisplay: false,
			          fullscreenToggle: true  //全屏按钮
			        }
			    }
			return playerOptions
		}
    }

}
</script>

