<template>
	<div>
		<script id="editor" type="text/plain"></script>
	</div>
</template>
<style>

</style>
<script>
	//import AppConfig from '@/config'
	import 'static/ueditor/ueditor.config.js'
	import 'static/ueditor/ueditor.all.js'
	import 'static/ueditor/ueditor.parse.js'
	import 'static/ueditor/lang/zh-cn/zh-cn.js'
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

	export default {
		name: "UEditor",
		props: {
			id: {
				type: String
			},
			config: {
				type: Object
			},
			content: {
				type: String
			},
		},
		data() {
			return {
				editor: null,
				ready: false,
			}
		},
		created() {
			//获取内容事件

			this.$root.eventHub.$on("UEContent",function(){ 
				this.getUEContent();	
		  	}.bind(this));
		},
		mounted() {
			//初始化UE
			const _this = this;
//			console.log(UE)
			this.editor = UE.delEditor("editor");
			this.editor = UE.getEditor('editor', this.config);
			//UE就绪后方可设置内容不然报错
	    	this.editor.addListener( 'ready', function() {

	    		_this.ready=true
				if(_this.$route.query.model=="edit"){
//	    			_this.editor.setContent(_this.content,false);
//	    			_this.setUEContent(_this.content,false);
	    			_this.setUEContent2();
				}
				_this.$emit("ready")
		  	});

		},
		destroyed() {
//			console.log(this.editor)
//			this.editor.destory();
  			this.$root.eventHub.$off('UEContent')
		},
		computed: {

		},
		methods: {
			getUEContent() {
				var content=this.editor.getContent()
				return content
//				if(this.ready){
//					this.$root.eventHub.$emit("readUEContent",content);
//				}else{
//					setTimeout(()=>{
//						this.getUEContent()
//					},500)
//				}
//				return this.editor.getContent();
			},
			getContentTxt() {
				return this.editor.getContentTxt();
			},
			setUEContent(content, isAppendTo) {
//				console.log(this.ready)
//	    		console.log(content)
				if(this.ready){
					this.editor.setContent(content, false);					
				}else{
					setTimeout(()=>{
						this.setUEContent(content, isAppendTo)
					},500)
				}
			},
			setUEContent2(content, isAppendTo) {
				if(this.ready&&this.content){
					this.editor.setContent(this.content, false);
				}else{
					setTimeout(()=>{
						this.setUEContent2()
					},500)
				}
			},
			
		}
	}
</script>