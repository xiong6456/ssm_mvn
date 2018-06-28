var contextPath = getContextPath();
var isBackFlag = 1;
function reloadCustomer(){
	isBackFlag=1;
	$('#customer-datagrid-inp').datagrid('reload');
	countMsg();
}

/**
* Name 载入数据
*/
$('#customer-datagrid-inp').datagrid({
	url:contextPath+'/customer/select',
	loadFilter:pagerFilter,		
	rownumbers:true,
	singleSelect:false,
	pageSize:20,           
	pagination:true,
	multiSort:true,
	fitColumns:true,
	fit:true,
	columns:[[
		{ field:'fdId',checkbox:true},
		{ field:'fdName',title:'姓名',width:100},
		{ field:'fdStatusCode',title:'客户状态',width:100},
		{ field:'fdStatus',hidden:'true'},
		{ field:'fdPhone',title:'电话',width:100},
		{ field:'fdQq',title:'QQ',width:100},
		{ field:'fdWechat',title:'微信',width:100},
		{ field:'fdSkinCode',title:'肌肤问题',width:100},
		{ field:'fdIsRecommend',title:'是否推介',width:100},
		{ field:'fdSaleId',hidden:'true'},
		{ field:'fdHistorySaleId',hidden:'true'},
		{ field:'fdHistorySaleName',title:'前销售人员',width:100},
		{ field:'fdMemo',title:'备注',width:100}
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
	$('#customer_searchform').form('submit', {
		type: "post",
		url:contextPath+'/customer/selectBox',
		datatype: "json",
		success:function(data){
			var tData=eval('(' + data + ')');
			$('#customer-datagrid-inp').datagrid('loadData', tData);
		}
	});
}



function backCustomer() {
	$.ajax({
        url:contextPath+'/customer/selectBack',
        type:"post",
        processData:false,
        contentType:false,
        success:function(data){
        	isBackFlag=0;
			var tData=eval('(' + data + ')');
			$('#customer-datagrid-inp').datagrid('loadData', tData);
		}
    }); 
}



function countMsg() {
	$.ajax({
        url:contextPath+'/customer/getCount',
        type:"post",
        processData:false,
        contentType:false,
        success:function(data){
        	//alert(data);
        	var countMsg= document.getElementById("countMsg");
        	countMsg.innerHTML = data;
		}
    }); 
}

countMsg();

function loadRankingData_dialog(importModule) {  
    $('#pageTable_dialog').datagrid({
    	url:contextPath+'/user/select',
    	loadFilter:pagerFilter,		
    	rownumbers:true,
    	pageSize:10,
    	singleSelect : true,
    	pagination:true,
    	multiSort:true,
    	fitColumns:true,
    	fit:true,
    	columns:[[
    		{ field:'fdId',hidden:'true'},
    		{ field:'fdLoginName',title:'用户名',width:100,sortable:true},
    		{ field:'fdName',title:'姓名',width:100},
    		{ field:'fdPhone',title:'手机号',width:100}
    	]],
    	//双击获取值
    	onDblClickCell: function (index, field, value) {
    	    var selectedRow = $(this).datagrid('getSelected');
    	    var fdSaleId=selectedRow.fdId;
    	    postToCustomer(importModule,fdSaleId);
    	    $('#tongji_ranking_dialog').dialog('close');
    	   }
    });
}   
  
function postCustomer(){
	if(isBackFlag!=1) {
		alert("请按刷新按钮后操作");
		return;}
	var items = $('#customer-datagrid-inp').datagrid('getChecked');
	var importModule = new Array(); 
	$.each(items, function (index, item) {
      //  alert(item.fdId);
        importModule[index] = item.fdId;
	});
	$('#tongji_ranking_dialog').window('open'); 
	loadRankingData_dialog(importModule); 
}
/**
 * 推荐客户资料
 * @returns
 */
function postToCustomer(ids,saleid){
	if(isBackFlag!=1) {
		alert("请按刷新按钮后操作");
		return;}
	$.ajax({
		url:contextPath+'/customer/postToCustomer',
		type:'post',
		traditional: true,
		data:JSON.stringify({'ids':ids, 'fdSaleId':saleid}),
		contentType:'application/json',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
           	$.messager.alert('信息提示',tData.msg,'info');
			if(flag == 'success') {
           		$('#customer-dialog-inp').dialog('close');
				$('#customer-datagrid-inp').datagrid('reload');
				countMsg();
			}
		}
	});
}

$('#fdDeptIdBox_1').combotree({
	onClick: function(node){
		selectBox1();
	}
});

function selectBox1() {
	$('#searchform_1').form('submit', {
		type: "post",
		url:contextPath+'/user/selectBox',
		datatype: "json",
		success:function(data){
			var tData=eval('(' + data + ')');
			$('#pageTable_dialog').datagrid('loadData', tData);
		}
	});
	//$("#searchform_1").form('clear');
}

$("#submit_search_1").linkbutton({ iconCls: 'icon-search', plain: true }).click(function () {
	selectBox1();
});



$("#customer_search").click(function () {
	customer_selectBox();
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
	if(isBackFlag!=1) {
		alert("请按刷新按钮后操作");
		return;}
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
				$('fdBak2').val("1");
				//$('#fdStatus').combotree('setValue', tData.fdStatusCode);
				//$('#fdStatus').combotree('check', tData.fdStatus);
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
	if(isBackFlag!=1) {
		alert("请按刷新按钮后操作");
		return;}
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




