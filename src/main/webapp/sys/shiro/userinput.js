var contextPath = getContextPath();

function reloadUser(){
	$('#user-datagrid-inp').datagrid('reload');
}
	
/**
* Name 删除记录
*/
function removeUser(){
	$.messager.confirm('信息提示','确定要删除该记录？', function(result){
		if(result){
			var items = $('#user-datagrid-inp').datagrid('getSelections');
			
			if(items.length == 0) {
				$.messager.alert('错误提示','请至少选择一条数据删除！','info');
				return;
			}
			
			var ids = [];
			$(items).each(function(){
				ids.push(this.fdId);	
			});
			$.ajax({
				url:contextPath+'/user/delete',
				data:'ids=' + ids,
				success:function(data){
					var tData = eval('(' + data + ')');
		            var flag = tData.flag;
					if(flag == 'success') {
		           		$.messager.alert('信息提示',tData.msg,'info');
		           		reloadUser();
					}else{
						$.messager.alert('错误提示',tData.msg,'error');
					}
				}
			});
		}	
	});
}
	
/**
* Name 打开添加窗口
*/
function openAddUser(){
	$('#user-form-inp').form('clear');
	$('#user-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "添加信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: addUser
           }, {
               text: '保存并新建',
               iconCls: 'icon-ok',
               handler: addAllUser
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#user-dialog-inp').dialog('close');                    
               }
           }]
       });
}

function addUser(){
	insertUser(false);
}
function addAllUser(){
	insertUser(true);
}

/**
* Name 添加记录
*/
function insertUser(tFlag){
	$('#user-form-inp').form('submit', {
		type:"post",
		url:contextPath+'/user/addUser',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
			if(flag == 'success') {
           		$.messager.alert('信息提示',tData.msg,'info');
           		if(!tFlag){
	           		$('#user-dialog-inp').dialog('close');
           		}
           		reloadUser();
				$('#user-form-inp').form('clear');
			}else{
				$.messager.alert('错误提示',tData.msg,'error');
			}
		}
	});
}

/**
* Name 打开修改窗口
*/
function openEditUser(){
	$('#user-form-inp').form('clear');
	var item = $('#user-datagrid-inp').datagrid('getSelected');
	if(item == null) {
		$.messager.alert('错误提示','请选择一条数据修改！','info');
		return;
	}
	$.ajax({
		url:contextPath+'/user/selectById',
		data:'fdId='+item.fdId,
		success:function(data){
			var tData=eval('(' + data + ')');
			if(data){
				//绑定值
				$('#user-form-inp').form('load', tData);
				$('#fdDeptId').combotree('setValue', tData.fdSysOrgDept);
				$('#fdDeptId').combotree('check', tData.fdDeptId);
			} else{
				$('#user-dialog-inp').dialog('close');	
			}
		}	
	});
	$('#user-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "修改信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: editUser
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#user-dialog-inp').dialog('close');                    
               }
           }]
       });
}	

/**
* Name 修改记录
*/
function editUser(){
	$('#user-form-inp').form('submit', {
		url:contextPath+'/user/update',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
           	$.messager.alert('信息提示',tData.msg,'info');
			if(flag == 'success') {
           		$('#user-dialog-inp').dialog('close');
				$('#user-datagrid-inp').datagrid('reload');
			}
		}
	});
}

/**
* Name 分页过滤器
*/
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

/**
* Name 载入数据
*/
$('#user-datagrid-inp').datagrid({
	url:contextPath+'/user/select',
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
		{ field:'fdLoginName',title:'用户名',width:100,sortable:true},
		{ field:'fdName',title:'姓名',width:100},
		{ field:'fdPhone',title:'手机号',width:100},
		{ field:'fdSysOrgDept',title:'所属部门',width:100},
		{ field:'fdBak2Name',title:'对接人',width:100}
	]]
});

$('#fdDeptIdBox').combotree({
	onClick: function(node){
		selectBox();
	}
});

function selectBox() {
	$('#user_searchform').form('submit', {
		type: "post",
		url:contextPath+'/user/selectBox',
		datatype: "json",
		success:function(data){
			var tData=eval('(' + data + ')');
			$('#user-datagrid-inp').datagrid('loadData', tData);
		}
	});
	//$("#user_searchform").form('clear');
}

$("#submit_search").click(function () {
	selectBox();
});
