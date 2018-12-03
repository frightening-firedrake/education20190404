<template>
	<div class="printListWrap">
		<div class="printHeader">
			<div class="label">
				{{listdatas.titleLabel}}
			</div>
			<div class="listRow">
				<div class="rowItem" :class="{sub:listdatas.subtitle}">
					<div class="number">
						{{listdatas.titleNumber}}					
					</div>
					<div class="content">
						{{listdatas.title}}	
					</div>
				</div>
				<div class="rowItem" v-if="listdatas.subtitle" :class="{sub:listdatas.subtitle}">
					<div class="subtitle">
						{{listdatas.subtitleLabel}}					
					</div>
					<div class="content">
						{{listdatas.subtitle}}	
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="printDate" v-if="listdatas.printDate">
			<div class="label">
				打印时间
			</div>
			<div class="listRow">
				<div class="rowItem">
					<div class="content">
						{{listdatas.printDate}}	
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="printBody">
			<div class="label" v-bind:style="{ height: bodyheight+ 'rem' }">
				<span>					
					{{listdatas.label}}
				</span>
			</div>
			<div class="listRow">
				<!--<template v-for="(item,index) in checkList">barcodelist-->
				<template v-for="(item,index) in barcodelist">
					<div class="rowItem" :class='item.class'>
						<div class="number">
							{{index+1<10?'0'+(index+1):index+1}}					
						</div>
						<div class="content">
							<!--{{checkAllList[item-1]}}-->					
							{{item.label}}
						</div>							
						<div v-if="listdatas.buttonText" class="button" @click="buttonClick(item)">{{listdatas.buttonText}}</div>
					</div>					
				</template>
				<!--<template v-if="checkList.length%2==1">
					<div class="rowItem">
						<div class="number">
							&nbsp;				
						</div>
						<div class="content">
							&nbsp;					
						</div>							
					</div>					
				</template>-->
				<div class="clear"></div>
			</div>
		</div>
		<div class="printfoot" style="height:0.5rem;">
		</div>
	</div>
</template>
<style>
	
</style>
<script>

//import SinograinModal from '@/components/common/action/Modal.vue';
import "@/assets/style/common/SamplePrintList.css"
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
//本地测试要用下面import代码
//import data from '@/util/mock';

export default {
	props:['listdatas','checkList','checkAllList'],
	components: {
//		SinograinModal
	},
	computed: {
		...mapState(["modal_id_number", "viewdata", "editdata", "aultdata", "messions", "mask"]),
		...mapGetters(["modal_id"]),
		bodyheight(){
			var height;
//			if(this.checkList){				
			if(this.barcodelist){				
//				height=Math.ceil(this.barcodelist.length/2)*0.5;
				height=this.barcodelist.length*0.5;
				if(!height){
					height=0.5;
				}
			}else{
				height=0.5;				
			}
			return height;
		},
		barcodelist(){
			var arr=[
//				{label:'' ,show:false,Suffix:['小1','小2']},
//				{label:'水分',show:false,Suffix:['水']},
//				{label:'硬度指数',show:false,Suffix:['硬']},
//				{label:'面筋吸水量',show:false,Suffix:['面']},
//				{label:'脂肪酸值',show:false,Suffix:['脂']},
//				{label:'品尝评分值',show:false,Suffix:['品']},
//				{label:'',show:false,Suffix:['卫'],class:'full'},
				{label:'' ,show:false,Suffix:['-01小1','-02小2']},
				{label:'水分',show:false,Suffix:['-03水']},
				{label:'硬度指数',show:false,Suffix:['-04硬']},
				{label:'面筋吸水量',show:false,Suffix:['-05面']},
				{label:'脂肪酸值',show:false,Suffix:['-08脂']},
				{label:'品尝评分值',show:false,Suffix:['-06品']},
				{label:'',show:false,Suffix:['-07卫'],class:'full'},
			];
			if(this.checkList){
				this.checkList.forEach((value,index)=>{
					if([1,3,4,5,6].includes(value-0)){
						arr[0].show=true;
						arr[0].label+=this.checkAllList[value-1]+'、';
					}else if([2].includes(value-0)){
						arr[1].show=true;
					}else if([8].includes(value-0)){
						arr[2].show=true;
					}else if([9].includes(value-0)){
						arr[3].show=true;
					}else if([10].includes(value-0)){
						arr[4].show=true;
					}else if([11].includes(value-0)){
						arr[5].show=true;
					}else if([13,14,15,16,17,18,19].includes(value-0)){
						arr[6].show=true;
						arr[6].label+=this.checkAllList[value-1]+'、';
					}
				})
				if(arr[0].label){
					arr[0].label=arr[0].label.slice(0,-1)
				}
				if(arr[6].label){
					arr[6].label=arr[6].label.slice(0,-1)
				}
				return arr.filter((value)=>{
					return value.show
				})				
			}
		}
	},
	created() {
//		console.log(this.$route.params.sampleState)
	},
	data(){
		return {

		}
	},
	methods:{
		buttonClick(item){
//			console.log(item.Suffix)
			this.$emit('print',item.Suffix)
		},
	},
}
</script>