<template>
  <div class="errorPageWrap">
	<div class="bg" style="background-image:url(static/images/sys/403.gif);">
		<h3 class='errorType'>
			<i class="el-icon-warning"></i>
		</h3>
	    <div class='errorMassage'>
	        <h2>你没有权限访问该页面</h2>
	        <h6>请联系管理员获取权限</h6>
	        <p>
	        	或者你可以返回:
	        	<a href="javascript:;" @click="back">上一页</a>
	        </p>
	    </div>

	</div>
  </div>
</template>

<script>
//import errGif from '@/assets/401_images/401.gif'

export default {
  data() {
    return {
      errGif: 'static/images/sys/403.gif',
    }
  },
  methods: {
    back() {
//    if (this.$route.query.noGoBack) {
//      this.$router.push({ path: '/dashboard' })
//    } else {
        this.$router.go(-1)
//    }
    }
  }
}
</script>

<style>
.errorPageWrap{
 	position:relative;
	height: 100%;
	box-sizing: border-box;
	padding:0 0.19rem;
	background:#ffffff;
	border-left:0.41rem solid rgba(241, 241, 241, 1);
	border-right:0.41rem solid rgba(241, 241, 241, 1);
	overflow: hidden;
}
.errorPageWrap .bg{
	box-sizing: border-box;
	overflow: hidden;
	padding-top:1.5rem;
 	width:100%;
 	height:100%;
 	text-align: center;
 	background-position: bottom center;
 	background-repeat:no-repeat;
 	background-size:6rem 4.6rem;
}
/*.errorPageWrap .bg img{
 	width:520px;
 	height:400px;
 	display: block;
 	margin:auto;
}*/
.errorPageWrap .bg h3 i{
 	font-size:1.2rem;
 	color:#F56C6C;
}
.errorPageWrap .errorMassage{
	text-align: center;
}
.errorPageWrap .errorMassage h2{
	color:#A31514;
	font-size:0.5rem;
	text-align: center;
	margin-top:0.1rem;
}
.errorPageWrap .errorMassage h6{
	color:#ff9800;
	font-size:0.3rem;
	text-align: center;
	margin-top:0.1rem;
}
.errorPageWrap .errorMassage p{
	color:#303133;
	font-size:0.2rem;
	text-align: center;
	margin-top:0.1rem;
}
.errorPageWrap .errorMassage p a{

	color:#409EFF;
	font-size:0.2rem;
	text-align: center;
}
</style>
