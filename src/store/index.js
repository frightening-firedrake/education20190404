import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	userName:'',//用户名
	roleName:'',//用户角色
	userId:'',//用户id
	userAuth:'',//用户权限逗号隔开的字符串
	permissions:'',//用户可操作按钮逗号隔开的字符串
	Token:'',//用户token后台鉴权
	libraryName:'',//库点名
	libraryId:'',//库点id
	libraryNames:[],//库点组
	qualitys:['ZC','ZD','LC','SP','TD'],//性质组
	sorts:['小麦','玉米','食用油'],//品种组
	//","","
	stateList:[
		{id:'-1',name:'待审核'},
		{id:'1',name:'已接案'},
		{id:'2',name:'侦办中'},
		{id:'3',name:'已结案'},
		{id:'4',name:'未立案'},
	],
	industryFieldList:[
//		{id:'1',name:'国家政治安全'},
//		{id:'2',name:'基层政权'},
//		{id:'3',name:'宗族势力、村霸'},
//		{id:'4',name:'征地、拆迁'},
//		{id:'5',name:'建设工程、运输、矿产、渔业'},
//		{id:'6',name:'欺行霸市'},
//		{id:'7',name:'黄赌毒'},
//		{id:'8',name:'非法高利放贷、暴力讨债'},
//		{id:'9',name:'插手民间纠纷'},
//		{id:'10',name:'境外黑社会'},
		{id:'1.国家政治安全',name:'1.国家政治安全'},
		{id:'2.基层政权',name:'2.基层政权'},
		{id:'3.宗族势力、村霸',name:'3.宗族势力、村霸'},
		{id:'4.征地、拆迁',name:'4.征地、拆迁'},
		{id:'5.建设工程、运输、矿产、渔业',name:'5.建设工程、运输、矿产、渔业'},
		{id:'6.欺行霸市',name:'6.欺行霸市'},
		{id:"7.黄赌毒",name:"7.'黄赌毒'"},
		{id:'8.非法高利放贷、暴力讨债',name:'8.非法高利放贷、暴力讨债'},
		{id:'9.插手民间纠纷',name:'9.插手民间纠纷'},
		{id:'10.境外黑社会',name:'10.境外黑社会'},
	],
	informTypeList:[
//		{id:'1',name:'威胁政治安全特别是政权安全、制度安全以及向政治领域渗透的黑恶势力'},
//		{id:'2',name:'把持基层政权、操纵破坏基层换届选举、垄断基层资源、侵吞集体资产的黑恶势力'},
//		{id:'3',name:'利用家族、宗族势力横行乡里、称霸一方、欺压残害百姓的“村霸”等黑恶势力'},
//		{id:'4',name:'在征地、租地、拆迁、工程项目建设等过程中煽动群众闹事、组织策划群体性.上访的黑恶势力'},
//		{id:'5',name:'在建筑工程、交通运输、矿产资源、渔业捕捞等行业、领域，强揽工程、恶意竞标、非法占地、滥开滥采的黑恶势力'},
//		{id:'6',name:'在商贸集市、批发市场、车站机场码头、旅游景区等场所欺行霸市、强买强卖、收保护费的市霸、行霸等黑恶势力'},
//		{id:'7',name:'操纵、经营"黄赌毒”等违法犯罪活动的黑恶势'},
//		{id:'8',name:'非法高利放贷，以暴力或软暴力讨债的黑恶势'},
//		{id:'9',name:'插手民间纠纷，充当“地下执法队”的黑恶势力'},
//		{id:'10',name:'境外黑社会入境发展渗透或跨国跨境黑恶势'},
//		{id:'11',name:'地下钱庄”背后的黑恶势力'},
//		{id:'12',name:'垄断一定区域内产品或物资经营的黑恶势力'},
//		{id:'13',name:'侵害学生人身和财产安全，妨害校园及周边治安秩序，或者教唆、胁迫在校学生参加犯罪组织或从事黑恶犯罪的黑恶势力'},
//		{id:'14',name:'恶意插手物业管理、医疗纠纷等案事件，严重妨碍小区、医疗机构等管理秩序，制造负面影响并从中牟利的黑恶势力'},
//		{id:'15',name:'组织雇用网络"水军"在网上威胁、恐吓、侮辱、诽谤、滋扰的黑恶势力'},
//		{id:'16',name:'为黑恶势力充当"保护伞"的公职人员'},
//		{id:'17',name:'群众反映强烈、深恶痛绝的其他各类黑恶势力违法犯罪'},
		{id:"1.威胁政治安全特别是政权安全、制度安全以及向政治领域渗透的黑恶势力;",name:"1.威胁政治安全特别是政权安全、制度安全以及向政治领域渗透的黑恶势力;"},
		{id:"2.把持基层政权、操纵破坏基层换届选举、垄断基层资源、侵吞集体资产的黑恶势力;",name:"2.把持基层政权、操纵破坏基层换届选举、垄断基层资源、侵吞集体资产的黑恶势力;"},
		{id:"3.利用家族、宗族势力横行乡里、称霸一方、欺压残害百姓的“村霸”等黑恶势力;",name:"3.利用家族、宗族势力横行乡里、称霸一方、欺压残害百姓的“村霸”等黑恶势力;"},
		{id:"4.在征地、租地、拆迁、工程项目建设等过程中煽动群众闹事、组织策划群体性上访的黑恶势力;",name:"4.在征地、租地、拆迁、工程项目建设等过程中煽动群众闹事、组织策划群体性上访的黑恶势力;"},
		{id:"5.在建筑工程、交通运输、矿产资源、渔业捕捞等行业、领域，强揽工程、恶意竞标、非法占地、滥开滥采的黑恶势力;",name:"5.在建筑工程、交通运输、矿产资源、渔业捕捞等行业、领域，强揽工程、恶意竞标、非法占地、滥开滥采的黑恶势力;"},
		{id:"6.在商贸集市、批发市场、车站机场码头、旅游景区等场所欺行霸市、强买强卖、收保护费的市霸、行霸等黑恶势力;",name:"6.在商贸集市、批发市场、车站机场码头、旅游景区等场所欺行霸市、强买强卖、收保护费的市霸、行霸等黑恶势力;"},
		{id:"7.操纵、经营“黄赌毒”等违法犯罪活动的黑恶势力;",name:"7.操纵、经营“黄赌毒”等违法犯罪活动的黑恶势力;"},
		{id:"8.非法高利放贷，以暴力或软暴力讨债的黑恶势力;",name:"8.非法高利放贷，以暴力或软暴力讨债的黑恶势力;"},
		{id:"9.插手民间纠纷，充当“地下执法队”的黑恶势力;",name:"9.插手民间纠纷，充当“地下执法队”的黑恶势力;"},
		{id:"10.境外黑社会入境发展渗透或跨国跨境黑恶势力;",name:"10.境外黑社会入境发展渗透或跨国跨境黑恶势力;"},
		{id:"11.“地下钱庄”背后的黑恶势力;",name:"11.“地下钱庄”背后的黑恶势力;"},
		{id:"12.垄断一定区域内产品或物资经营的黑恶势力;",name:"12.垄断一定区域内产品或物资经营的黑恶势力;"},
		{id:"13.侵害学生人身和财产安全，妨害校园及周边治安秩序，或者教唆、胁迫在校学生参加犯罪组织或从事黑恶犯罪的黑恶势力;",name:"13.侵害学生人身和财产安全，妨害校园及周边治安秩序，或者教唆、胁迫在校学生参加犯罪组织或从事黑恶犯罪的黑恶势力;"},
		{id:"14.恶意插手物业管理、医疗纠纷等案事件，严重妨碍小区、医疗机构等管理秩序，制造负面影响并从中牟利的黑恶势力;",name:"14.恶意插手物业管理、医疗纠纷等案事件，严重妨碍小区、医疗机构等管理秩序，制造负面影响并从中牟利的黑恶势力;"},
		{id:"15.组织雇用网络“水军”在网.上威胁、恐吓、侮辱、诽谤、滋扰的黑恶势力;",name:"15.组织雇用网络“水军”在网.上威胁、恐吓、侮辱、诽谤、滋扰的黑恶势力;"},
		{id:"16.为黑恶势力充当“保护伞”的公职人员;",name:"16.为黑恶势力充当“保护伞”的公职人员;"},
		{id:"17.群众反映强烈、深恶痛绝的其他各类黑恶势力违法犯罪。",name:"17.群众反映强烈、深恶痛绝的其他各类黑恶势力违法犯罪。"},
	],
	remarkses:[{"value": "春季抽查"},{"value": "秋季普查"},{"value": "2017年度轮换验收"},{"value": "2018年度轮换验收"},{"value": "收购巡查"},{"value": "出库巡查"}],//备注组
	tests:['水分','容重','杂质','不完善颗粒','硬质','品尝评分','卫生指标','加工品质','(玉米)生霉粒','(玉米)脂肪酸值','(小麦)矿物含量','(小麦)面筋吸水量'],//质检组
	mask:false,//自定义的遮罩层控制选项
	modal_id_number:1000,
    viewdata:[],//查看数据组
	editdata:[],//编辑数据组
	aultdata:[],//编辑数据组
	messions:[],//任务数据组
//	current_modal:{},
	isCollapse:false,
	breadcrumbHistory:[],
}
const getters = {
    modal_id:function(state){
        return 'Modal'+state.modal_id_number;
    },
    remarkses:function(state){
        return state.remarkses;
    },
    stateList:function(state){
        return state.stateList;
    },
    industryFieldList:function(state){
        return state.industryFieldList;
    },
    informTypeList:function(state){
        return state.informTypeList;
    },
    breadcrumbHistory:function(state){
    	if(state.breadcrumbHistory.length){
    		return state.breadcrumbHistory;    		
    	}else{
    		return state.breadcrumbHistory=JSON.parse(sessionStorage.getItem("breadcrumbHistory"));
    	}
    },
    libraryName:function(state){
    	if(state.libraryName){
    		return state.libraryName;    		
    	}else{
    		return sessionStorage.getItem("libraryName");
    	}
    },
    libraryId:function(state){
    	if(state.libraryId){
    		return state.libraryId;    		
    	}else{
    		return sessionStorage.getItem("libraryId");
    	}
    },
    userName:function(state){
    	if(state.userName){
    		return state.userName;    		
    	}else{
    		return sessionStorage.getItem("userName");
    	}
    },
    roleName:function(state){
    	if(state.roleName){
    		return state.roleName;    		
    	}else{
    		return sessionStorage.getItem("roleName");
    	}
    },
    userAuth:function(state){
    	if(state.userAuth){
    		return state.userAuth;    		
    	}else{
    		return sessionStorage.getItem("userAuth");
    	}
    },
    permissions:function(state){
    	if(state.permissions){
    		return state.permissions;    		
    	}else{
    		return sessionStorage.getItem("permissions");
    	}
    },
    userId:function(state){
    	if(state.userId){
    		return state.userId;    		
    	}else{
    		return sessionStorage.getItem("userId");
    	}
    },
    Token:function(state){
    	if(state.Token){
    		return state.Token;    		
    	}else{
    		return sessionStorage.getItem("Token");
    	}
    },
    libraryNames:function(state){
    	if(state.libraryNames.length){
    		return state.libraryNames;    		
    	}else{
    		var basemsg=JSON.parse(sessionStorage.getItem("basemsg"))
    		return basemsg.libraryNames;
    	}
    },
    qualitys:function(state){
    	if(state.qualitys.length){
    		return state.qualitys;    		
    	}else{
    		var basemsg=JSON.parse(sessionStorage.getItem("basemsg"))
    		return basemsg.qualitys;
    	}
    },
    sorts:function(state){
    	if(state.sorts.length){
    		return state.sorts;    		
    	}else{
    		var basemsg=JSON.parse(sessionStorage.getItem("basemsg"))
    		return basemsg.sorts;
    	}
    },
    remarkses:function(state){
    	if(state.remarkses.length){
    		return state.remarkses;    		
    	}else{
    		var basemsg=JSON.parse(sessionStorage.getItem("basemsg"))
    		return basemsg.remarkses;
    	}
    },
    tests:function(state){
    	if(state.tests.length){
    		return state.tests;    		
    	}else{
    		var basemsg=JSON.parse(sessionStorage.getItem("basemsg"))
    		return basemsg.tests;
    	}
    },
}
const mutations = {
	setUserInfo(state,payload){
		state.libraryName=payload.libraryName;
		state.libraryId=payload.libraryId;
		state.userName=payload.userName;
		state.userId=payload.userId;
		state.userAuth=payload.userAuth;
		state.Token=payload.Token;
		state.roleName=payload.roleName;
		state.permissions=payload.permissions;
		sessionStorage.setItem('libraryId', payload.libraryId);
		sessionStorage.setItem('libraryName', payload.libraryName);
		sessionStorage.setItem('userName', payload.userName);
		sessionStorage.setItem('userId', payload.userId);
		sessionStorage.setItem('userAuth', payload.userAuth);
		sessionStorage.setItem('Token', payload.Token);
		sessionStorage.setItem('permissions', payload.permissions);
		sessionStorage.setItem('roleName', payload.roleName);
	},
	logout(state){
		state.libraryName='';
		state.libraryId='';
		state.userName='';
		state.userId='';
		state.userAuth='';
		state.roleName='';
		state.Token='';
		state.permissions='';
		sessionStorage.removeItem('libraryId');
		sessionStorage.removeItem('libraryName');
		sessionStorage.removeItem('userName');
		sessionStorage.removeItem('userId');
		sessionStorage.removeItem('userAuth');
		sessionStorage.removeItem('Token');
		sessionStorage.removeItem('permissions');
		sessionStorage.removeItem('breadcrumbHistory');
		sessionStorage.removeItem('roleName');
	},
	setBaseMsg(state,payload){
		state.libraryNames=payload.libraryNames;
		state.qualitys=payload.qualitys;
		state.sorts=payload.sorts;
		state.remarkses=payload.remarkses;
		state.tests=payload.tests;
		var basemsg=payload;
		sessionStorage.setItem('basemsg', JSON.stringify(basemsg));
	},
	pushBreadcrumbHistory(state,payload){
//		payload栗子{name:'',fullPath:''}
		state.breadcrumbHistory.push(payload)
		sessionStorage.setItem('breadcrumbHistory', JSON.stringify(state.breadcrumbHistory));
	},
	spliceBreadcrumbHistory(state,payload){
		var startIndex=state.breadcrumbHistory.findIndex((item)=>{
			return item.fullPath==payload.fullPath
		});
		if(startIndex>-1){			
			state.breadcrumbHistory.splice(startIndex+1,state.breadcrumbHistory.length)
		}
		sessionStorage.setItem('breadcrumbHistory', JSON.stringify(state.breadcrumbHistory));
	},
	statBreadcrumbHistory(state){
		state.breadcrumbHistory=[];
		sessionStorage.setItem('breadcrumbHistory', JSON.stringify(state.breadcrumbHistory));
	},
	create_modal_id(state){
        state.modal_id_number+=1;
    },
    is_mask(state,payload){
    	state.mask=payload;
    },
    create_modal(state,payload){
    	var datatype=payload.datatype;
		var newdata=payload.newdata;
		state[datatype].push(newdata);
		console.log('ok')
    },
    close_modal(state,payload){
//  	过滤掉对应id的实现删除效果
		var id=payload.id;
		var type=payload.type;
		var	list=payload.list;
		console.log(payload)
    	switch(type) 
			{ 
			case "view": 
				state.viewdata=state.viewdata.filter(function (item) {
				  	return !(item.list==list&&item.id==id);
				})
			break; 
			case "edit": 
				state.editdata=state.editdata.filter(function (item) {
				  	return !(item.list==list&&item.id==id);
				})
			break; 
			case "ault": 
				state.aultdata=state.aultdata.filter(function (item) {
				  	return !(item.list==list&&item.id==id);
				})
			break; 
			} 
    },  
    hid_modal(state,payload){
//  	过滤掉对应id的查看数据实现删除效果
		var id=payload.id;
		var type=payload.type;
		var	list=payload.list;
		var title=payload.title;
		var icon;
    	switch(type) 
			{ 
			case "view": 
    			icon="icon-eye-open";
			break; 
			case "edit": 
				icon="icon-pencil";
			break; 
			case "ault": 
				icon="icon-key";
			break; 
			} 
    	var newmession={   		
		  		icon:icon,
		  		title:title,
		  		id:id,
		  		type:type,
		  		list:list,
	    	};
		state.messions.unshift(newmession);
    },
    //  通过messions中的item点击时的id,删除id的mession数据并打开查看数据组中对应id的显示
    pop_mession(state,payload){
    	var id=payload.id;
    	var type=payload.type;
		var	list=payload.list;
		switch(type) 
			{ 
			case "view": 
    			var item=state.viewdata.find(function(item){
    				return item.list==list&&item.id==id;
    			});
			break; 
			case "edit": 
				var item=state.editdata.find(function(item){
    				return item.list==list&&item.id==id;
    			});
			break; 
			case "ault": 
				var item=state.aultdata.find(function(item){
    				return item.list==list&&item.id==id;
    			});
			break; 
			} 
//  	var item=this.$refs[id][0].item;
    	if(item.lg){
    		state.mask=false; 		  		
    	}else{
    		state.mask=true;; 		  		
    	}
    	item.show=true;
    },
    del_mession(state,payload){
    	var id=payload.id;
    	var type=payload.type;
		var	list=payload.list;
    	state.messions=state.messions.filter(function (item) {
		  	return !(item.id==id&&item.type==type&&item.list==list);
		});
    },
    slideToggle(state){
    	state.isCollapse=!state.isCollapse; 
//  	mutations.route_click(state);
    },
    route_click(state){
    	var current=mutations.find_current_modal(state)
    	if(current){
    		current.show=!current.show;
    		state.mask=false;
    		var payload={id:current.id,type:current.type,title:current.title}
    		mutations.hid_modal(state,payload)
    	}
    },
    find_current_modal(state){
    	var modal_data=[...state.viewdata,...state.editdata,...state.aultdata,...state.messions]
//  	console.log(modal_data);
    	var current=modal_data.find(function(item){
    		return item.show==true
    	})
    	if(current){
    		return current
    	}
    }
}
 const actions ={
    addAction(context){
        context.commit('create_modal_id')
    },
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
})