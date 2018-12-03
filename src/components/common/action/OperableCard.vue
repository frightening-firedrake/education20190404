<template>
		<div class="cardwrap" :class="card.classObject">
			<div :id="card.card_id" class="operable_card" v-if="!card.remove">
				<div class="operable_card_title">
					<i class="icon-circle" v-bind:style="{ color: card.circleColor}"></i>
				    <span class='title'>{{card.title}}</span>
					<span class="ctrTool">
						<i class="icon-move"></i>
				        <i class="icon-refresh" @click="refresh()"></i>
				        <i class="icon-chevron-up" @click="card.slidetoggle=!card.slidetoggle" :class="{rotatetoggle:!card.slidetoggle}"></i>
				        <i class="icon-remove" @click="card.remove=true"></i>
					</span>
				</div>
				<el-collapse-transition >
					<div v-show="card.slidetoggle">
						
				<div class="operable_card_body">
					
					<release-card v-if="card.cardType === 'release'"></release-card>
					<activity-card v-if="card.cardType === 'activity'"></activity-card>
					<weather-card v-if="card.cardType === 'weather'"></weather-card>
					<administration-card v-if="card.cardType === 'administration'"></administration-card>
					<chart-card v-if="card.cardType === 'chart'"></chart-card>
					<draft-card v-if="card.cardType === 'draft'"></draft-card>
					
				</div>
				<div class="operable_card_foot">
				<!--<div class="operable_card_foot"  v-show="card.slidetoggle">-->
					<!--<router-link to='' v-if='card.more' >更多</router-link>-->
					<a href="javascript:;"  v-if='card.more'>更多</a>
				</div>
					</div>
				</el-collapse-transition>
			</div>
		</div>
</template>
<style>
	#showList .cardwrap{
		margin-bottom:0.2rem;
		transition: height 0.5s ease;
	}
	.operable_card{
		/*height:3rem;*/
		padding:0 0.3rem;
		background-color: #fff;
	    background-color: #ffffff;
		box-shadow: 2px 4px 12px 0px 
			rgba(233, 232, 232, 0.75);
		border: solid 1px #eeeeee;
		transition: all 0.5s ease;
	}
	.slideUp{
		height:0.6rem;
		overflow: hidden;
	}
	.operable_card_title{
		height:0.6rem;
		line-height:0.6rem;		
	}
	.operable_card_title >i.icon-circle{
		font-size:0.18rem;	
	}
	.operable_card_title >span.title{
		font-size:0.18rem;
		font-weight: 700;
		color:#333333;;	
	}
	.operable_card_body{
		/*min-height:1.9rem;*/
		min-height:2.4rem;
	}
	.operable_card_foot{
		height:0.5rem;
		line-height:0.5rem;
		text-align: right;
	}
	.operable_card_foot a{
		color: #ed0e68;
		font-size:0.18rem;
	}
	.ctrTool {
		float:right;
		line-height: 0.6rem;
	}
	.ctrTool i{
		font-size:0.2rem;
		padding: 0.03rem;
		cursor:pointer;
	}
	.ctrTool .icon-move {
  		color: #5ca2f7;
	}
	.ctrTool .icon-chevron-up{
		transition:transform 0.2s;
	}
	.ctrTool .rotatetoggle:before{
		transition:all 0.2s;
	}
	.ctrTool .rotatetoggle:before{
		transform:rotate(180deg);
	}
	.ctrTool .icon-refresh {
	    color: #5bde93;
	}
	.ctrTool .icon-remove {
	    color: #ed0e0e;
		font-size:0.23rem;
	}

</style>
<script>
import ReleaseCard from '@/components/home/content/ReleaseCard.vue'	
import ActivityCard from '@/components/home/content/ActivityCard.vue'	
import WeatherCard from '@/components/home/content/WeatherCard.vue'	
import AdministrationCard from '@/components/home/content/AdministrationCard.vue'	
import ChartCard from '@/components/home/content/ChartCard.vue'	
import DraftCard from '@/components/home/content/DraftCard.vue'	
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  export default {
  	props: ['card'],
    data() {
      return {
//      card:{
//      	title:'今日任务',
//      	circleColor:'#ed0e68',
//      	more:true,
//      	slidetoggle:true,
//      	remove:false,
//      	card_id:'card1'
//      } 
      };
    },
    methods: {
      refresh(){
      	var tag="#"+this.card.card_id.toString();
        const loading = this.$loading({
          target:tag,
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      
      }
    },
	components: {
	    ReleaseCard,WeatherCard,AdministrationCard,ChartCard,DraftCard,ActivityCard 
	  }
  }
</script>


