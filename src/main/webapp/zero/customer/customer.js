var contextPath = getContextPath();

function reloadCustomer(){
	$('#customer-datagrid-inp').datagrid('reload');
}

/**
* Name 载入数据
*/
$('#customer-datagrid-inp').datagrid({
	url:contextPath+'/customer/selectByUserId',
	loadFilter:pagerFilter,		
	rownumbers:true,
	singleSelect:true,
	pageSize:20,           
	pagination:true,
	multiSort:true,
	fitColumns:true,
	fit:true,
	columns:[[
		{ field:'fdId',hidden:'true'},
		{ field:'fdName',title:'姓名',width:100},
		{ field:'fdStatusCode',title:'客户状态',width:100},
		{ field:'fdPhone',title:'电话',width:100},
		{ field:'fdQq',title:'QQ',width:100},
		{ field:'fdWechat',title:'微信',width:100},
		{ field:'fdSkinCode',title:'肌肤问题',width:100},
		{ field:'fdUpdateTime',title:'状态修改时间',width:100},
		{ field:'fdIsRecommend',title:'是否推介',width:100},
		{ field:'fdSaleId',hidden:'true'}
	]]
});
function pagerFilter(data){            
	if (typeof data.length == 'number' && typeof data.splice == 'function'){// is array                
		data = {                   
			total: data.length,                   
			rows: data               
		};   
	}        
	var dg = $(this);         
	var opts = dg.datagrid('options');          
	var pager = dg.datagrid('getPager');          
	pager.pagination({                
		onSelectPage:function(pageNum, pageSize){                 
			opts.pageNumber = pageNum;                   
			opts.pageSize = pageSize;                
			pager.pagination('refresh',{pageNumber:pageNum,pageSize:pageSize});                  
			dg.datagrid('loadData',data);                
		}          
	});           
	if (!data.originalRows){               
		data.originalRows = (data.rows);       
	}         
	var start = (opts.pageNumber-1)*parseInt(opts.pageSize);          
	var end = start + parseInt(opts.pageSize);        
	data.rows = (data.originalRows.slice(start, end));         
	return data;       
}





function customer_selectBox() {
	//alert(1111);
	$('#customer_searchform').form('submit', {
		type: "post",
		url:contextPath+'/customer/selectBox',
		datatype: "json",
		success:function(data){
			var tData=eval('(' + data + ')');
			$('#customer-datagrid-inp').datagrid('loadData', tData);
		}
	});
	//$("#customer_searchform").form('clear');
}

$("#customer_search").click(function () {
	customer_selectBox();
});



$('#fdStatusBox').combotree({
	onClick: function(node){
		customer_selectBox();
	}
});

$('#fdSkinBox').combotree({
	onClick: function(node){
		customer_selectBox();
	}
});


/**
* Name 打开修改窗口
*/
function openEditCustomer(){
	$('#customer-form-inp').form('clear');
	var item = $('#customer-datagrid-inp').datagrid('getSelected');
	if(item == null) {
		$.messager.alert('错误提示','请选择一条数据修改！','info');
		return;
	}
	$.ajax({
		url:contextPath+'/customer/selectById',
		data:'fdId='+item.fdId,
		success:function(data){
			var tData=eval('(' + data + ')');
			if(data){
				//绑定值
				$('#customer-form-inp').form('load', tData);
				$('#fdStatus').combotree('setValue', tData.fdStatusCode);
				$('#fdStatus').combotree('check', tData.fdStatus);
				$('#fdSkinProblem').combotree('setValue', tData.fdSkinCode);
				$('#fdSkinProblem').combotree('check', tData.fdSkinProblem);
			} else{
				$('#customer-dialog-inp').dialog('close');	
			}
		}	
	});
	$('#customer-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "修改信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: editCustomer
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#customer-dialog-inp').dialog('close');                    
               }
           }]
       });
}	

/**
* Name 修改记录
*/
function editCustomer(){
	$('#customer-form-inp').form('submit', {
		url:contextPath+'/customer/update',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
           	$.messager.alert('信息提示',tData.msg,'info');
			if(flag == 'success') {
           		$('#customer-dialog-inp').dialog('close');
				$('#customer-datagrid-inp').datagrid('reload');
			}
		}
	});
}

var dbclickFlag = 1;

setInterval(function(){
	dbclickFlag =1;
},5000); 
/**
* Name 索取资料
*/
function getCustomer(){
	if(dbclickFlag!=1){
		alert("请勿双击或者频繁点击！");
		return;
	}
	dbclickFlag=2;
	 $.ajax({
         url:contextPath+'/customer/getCustomer',
         type:"post",
         processData:false,
         contentType:false,
         success:function(data){
             var tData = eval('(' + data + ')');
             var flag = tData.flag;
            	$.messager.alert('信息提示',tData.msg,'info');
 			if(flag == 'success') {
            		$('#customer-dialog-inp').dialog('close');
 				$('#customer-datagrid-inp').datagrid('reload');
 			}
 		}
     });  
}



/**
* Name 打开添加窗口
*/
function openAddCustomer(){
	$('#customer-form-inp-add').form('clear');
	$('#customer-dialog-inp-add').dialog({
		closed: false,
		modal:true,
           title: "添加信息",
           buttons: [{
               text: '保存',
               iconCls: 'icon-ok',
               handler: add
           }, {
               text: '保存并新建',
               iconCls: 'icon-ok',
               handler: addAll
           },{
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#customer-dialog-inp-add').dialog('close');                    
               }
           }]
       });
}


/**
* Name 添加记录
*/
function add(){
	insertCustomer(false);
}
function addAll(){
	insertCustomer(true);
}
function insertCustomer(tFlag){
	$('#customer-form-inp-add').form('submit', {
		type:"post",
		url:contextPath+'/customer/add',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
			if(flag == 'success') {
           		$.messager.alert('信息提示',tData.msg,'info');
           		if(!tFlag){
	           		$('#customer-dialog-inp-add').dialog('close');
           		}
				reloadCustomer();
				$('#customer-form-inp-add').form('clear');
			}else{
				$.messager.alert('错误提示',tData.msg,'error');
			}
		}
	});
}

function requirecustomer(){
	$('#getcustomerform').form('submit', {
		type:"post",
		url:contextPath+'/customer/requirecustomer',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
           	$.messager.alert('信息提示',tData.msg,'info');
			if(flag == 'success') {
           		$('#customer-dialog-inp').dialog('close');
				$('#customer-datagrid-inp').datagrid('reload');
			}
		}
	});
}
