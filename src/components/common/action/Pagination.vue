<template>
<div class="block tfoot">
	<div class="tfoot_btns" v-if='page.tfootbtns.btns'>
		<p v-if='page.tfootbtns.leading_out' class='leading_out' @click="leading_out_checked">
			<span>导出EXCEL表格</span>		
		</p>

   		<p v-if='page.tfootbtns.connect' class='leading_out' @click="handoverPrint">
      		<span>打印样品领取交接单</span>
    	</p>
		<p v-if='page.tfootbtns.checkPrint' class='leading_out' @click="checkPrint">
      		<span>{{page.tfootbtns.btnText?page.tfootbtns.btnText:'打印样品检验单'}}</span>
    	</p>
    	<p v-if='page.tfootbtns.btnfree' class='leading_out' @click="btnfree">
      		<span>{{page.tfootbtns.btnfree}}</span>
    	</p>
	</div>
    <el-pagination v-show='page.show' @size-change="sizeChange" @current-change="currentChange" :current-page.sync="page.currentPage" :page-size="page.size" layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total="page.total">
    </el-pagination>
</div>
</template>
<script>
import "@/assets/style/common/Pagination.css"
  export default {
    props: ['page'],
    methods: {
//    create_newdata(){
//    	this.$emit('paginationEvent','create')
//    },  
	  btnfree(){
      	this.$emit('paginationEvent','btnfree')
	  },
	  handoverPrint(){
      	this.$emit('paginationEvent','printHandover')
	  },
	  checkPrint(){
      	this.$emit('paginationEvent','PrintCheck')
	  },
      leading_out_checked(){
      	this.$emit('paginationEvent','leading_out')
      },
      sizeChange(){
//    	console.log(this.currentPage,this.page.size);
      },
      currentChange(){
//    	console.log(this.currentPage,this.page.size);
		this.$emit('getCurrentPage',this.page.currentPage);
      },
    },
    data() {
      return {

      };
    }
  }
</script>