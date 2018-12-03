<template>
	<div class="tfootbtns" :class="{'editModel':tfbtns.editModel,'borderTop':tfbtns.borderTop}">
		<!--editModel表格添加一行按钮-->
		<div v-if="tfbtns.editModel" class="editModelWrap">
			<div class="tableAdd"  @click="tableAdd">
				<p style="background-image:url('static/images/sys/create.png');">					
					{{tfbtns.addbtnText?tfbtns.addbtnText:'新增一行表格'}}
				</p>
			</div>
			<div class="tableDel"  @click="tableDel">
				<p style="background-image:url('static/images/sys/icons2.png');">					
					删除表格当前行
				</p>
			</div>
		</div>
		<!--基础双按钮-->
		<div class="btn-center" v-if="tfbtns.btnCenter">
		    <el-button v-if="tfbtns.btnCenter.btnTextS" class="lbtn red" :loading="tfbtns.loading" :disabled="tfbtns.btnCenter.ldisabled" :class="{no:tfbtns.btnCenter.doubleColor}" type="primary" @click="btnCenterS">{{tfbtns.btnCenter.btnTextS?tfbtns.btnCenter.btnTextS:'不同意'}}</el-button>
		    <el-button class="lbtn" :loading="tfbtns.loading" :disabled="tfbtns.btnCenter.ldisabled" :class="{no:tfbtns.btnCenter.doubleColor}" type="primary" @click="btnCenterNo">{{tfbtns.btnCenter.btnTextL?tfbtns.btnCenter.btnTextL:'不同意'}}</el-button>
		    <el-button :loading="tfbtns.loading" :disabled="tfbtns.btnCenter.rdisabled" v-if="tfbtns.btnCenter.doubleColor" class="rbtn yes"  type="primary" @click="btnCenterYes" >{{tfbtns.btnCenter.btnTextR?tfbtns.btnCenter.btnTextR:'同  意'}}</el-button>
		    <el-button :loading="tfbtns.loading" :disabled="tfbtns.btnCenter.rdisabled" v-else class="rbtn"  @click="btnCenterYes" >{{tfbtns.btnCenter.btnTextR?tfbtns.btnCenter.btnTextR:'同  意'}}</el-button>
	    </div>
		<!--左按钮-->
		<div class="btn-left btntfoot"  v-if="tfbtns.btnLeft" @click="btnLeft">
			<span>
				{{tfbtns.btnLeft.btnText}}
			</span>					
		</div>
		<!--右按钮-->
		<div class="btn-right btntfoot" v-if="tfbtns.btnRight" @click="btnRight">
			<span>
				{{tfbtns.btnRight.btnText}}
			</span>					
		</div>
		<!--中单按钮-->
		<div class="btn-one btntfoot" :class="{btnloading:tfbtns.loading}" v-if="tfbtns.btnOne" @click="btnOne">
			<i v-if="tfbtns.loading" class="el-icon-loading"></i>
			<span>
				{{tfbtns.btnOne.btnText}}
			</span>					
		</div>
	</div>
</template>
<style>
.tfootbtns{
	/*height:0.75rem;*/
	min-height:0.75rem;
	background:#ffffff;
	position:relative;
	text-align: center;
}
.tfootbtns.borderTop{
	border-top:1px solid #e6e7e7;
}
.tfootbtns.editModel{
	height:2rem;
}
.editModel .editModelWrap{
	height:1.25rem;
	position:relative;
	border:1px solid #e6e7e7;
	/*border-top:none;*/
}
.btn-center{
	text-align: center;
	/*padding:0.12rem 0;*/
	padding:0.4rem 0;
}
.btn-center button {
    font-size: 0.18rem;
    padding: 0rem;
    line-height: 0.5rem;
    border-radius: 0.1rem;
    width:1.3rem;
    height:0.5rem;
    text-align: center;
}
.btn-center .el-button+.el-button{
	margin-left:0.3rem;
}
.btn-center button.lbtn {
	background-color: rgb(88,180,129);
	border-color:rgb(88,180,129);
}
.btn-center button.lbtn.red {
	background-color:rgb(233, 88, 88);
	border-color:rgb(233, 88, 88);
}
.btn-center button.lbtn.red:hover {
	background-color:rgba(233, 88, 88,0.8);
	border-color:rgb(233, 88, 88);
}
.btn-center button.lbtn.is-disabled,.btn-center button.lbtn.is-disabled:hover  {
	background-color: #999999;
	border-color:#999999;
}
.btn-center button.lbtn:hover {
	background-color: rgba(88,180,129,0.8);
	border-color:rgb(88,180,129);
}
.btn-center button.rbtn {
	color: #58b481;
	border-color:#58b481;
}
.btn-center button.rbtn:hover {
	background:rgba(88,180,129,0.1);
}
.btn-center button.rbtn.is-disabled,.btn-center button.rbtn.is-disabled:hover {
	color: #999999;
	border-color:#999999;
	background:#fff;
}
.btn-center button.yes {
	color: #ffffff;
	background-color: rgb(88,180,129);
	border-color:rgb(88,180,129);
}
.btn-center button.yes:hover {
	background-color: rgba(88,180,129,0.8);
	border-color:rgb(88,180,129);
}
.btn-center button.no {
	background-color: rgba(255, 76, 120, 1);
	border-color:rgba(255, 76, 120, 1);
}
.btn-center button.no:hover {
	background-color: rgba(255, 76, 120, 0.8);
	border-color:rgba(255, 76, 120, 1);
}
.tfootbtns div.btntfoot{
	position:absolute;
	top:0.125rem;
	height:0.4rem;
	line-height: 0.33rem;
	/*margin:0 0 0 0.3rem;*/
	/*font-size: 0.24rem;*/
	font-size: 0.18rem;
	cursor: pointer;
	/*background-color: #58b481;*/
	background-color: rgb(76,144,219);
	/*border-radius: 0.05rem;*/
	border-radius: 0.1rem;
	box-sizing: border-box;
	padding:0.04rem;
	color:#ffffff;
	z-index: 6;
}
.tfootbtns div.btntfoot span{
	/*border:1px solid #FFFFFF;
	border-radius:0.04rem;*/
	padding:0 0.2rem;
	font-weight: 500;
}
.tfootbtns div.btntfoot.btn-left{
	left:0;
}
.tfootbtns div.btntfoot.btn-right{
	right:0;
}
.tfootbtns div.btntfoot.btn-one{
	display: inline-block;
	/*margin-top:0.125rem;*/
	padding:0;
	margin:0.4rem auto;
	height:0.5rem;
	line-height:0.5rem;
	position: static;
}
.editModel .editModelWrap .tableAdd {
    /*position: absolute;
    right: 0;
    top: 0;*/
    /*width: 1.14rem;*/
    float:right;
   	padding:0 0.07rem;
    height: 0.35rem;
    line-height: 0.35rem;
    text-align: center;
    border-radius: 0 0 0.1rem 0.1rem;
    background-color: #ffffff;
    border: solid 1px #58b481;
    color: #58b481;
    font-size: 0.16rem;
    cursor: pointer;
}
.editModel .editModelWrap .tableAdd p{
    padding-left:0.35rem;
    background-repeat:no-repeat;
    background-position:left center;
    background-size:0.3rem 0.3rem;
    font-size:0.16rem;
}
.editModel .editModelWrap .tableDel {
    /*position: absolute;
    right: 0;
    top: 0;*/
    /*width: 1.14rem;*/
    float:right;
   	padding:0 0.07rem;
    height: 0.35rem;
    line-height: 0.35rem;
    text-align: center;
    border-radius: 0 0 0.1rem 0.1rem;
    background-color: #ffffff;
    border: solid 1px #E95858;
    color: #E95858;
    font-size: 0.16rem;
    cursor: pointer;
    margin-right:0.1rem;

}
.editModel .editModelWrap .tableDel p{
    padding-left:0.35rem;
    background-repeat:no-repeat;
    background-position:left center;
    background-size:0.3rem 0.6rem;
    font-size:0.16rem;
}
.btnloading{
	pointer-events:none;
}
</style>
<script>
export default {
//  components:{ },
    props: ['tfbtns'],
    computed:{

	},
	created(){

	},
    data() {
        return {
//			btnCenter:{
//				cancelText:'不同意',
//				submitText:'同意',
//			},
//			btnLeft:{
//				btnText:'导出Excel表格',
//			},
//			btnRight:{
//				btnText:'导出Excel表格',
//			},
//			btnOne:{
//				btnText:'导出Excel表格',
//			},
        }
    },
    methods:{
    	btnCenterS(){
			this.$emit("tfootEvent",'btnCenterS');
//			window.history.go(-1)
		},
		btnCenterNo(){
			this.$emit("tfootEvent",'btnCenterL');
//			window.history.go(-1)
		},
		btnCenterYes(){
			this.$emit("tfootEvent",'btnCenterR');			
//			window.history.go(-1)
		},
		btnLeft(){
			this.$emit("tfootEvent",'btnLeft');			
		},
		btnRight(){
			this.$emit("tfootEvent",'btnRight');			
		},
		btnOne(){
			this.$emit("tfootEvent",'btnOne');
		},
		tableAdd(){
			this.$emit("tfootEvent",'tableAdd');
		},
		tableDel(){
			this.$emit("tfootEvent",'tableDel');
		},
    },
    mounted:function(){
//		console.log(this.breadcrumb)
    }
    
}
	
</script>