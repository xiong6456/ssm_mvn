var contextPath = getContextPath();

function reloadPerm(){
	$('#permission-datagrid-inp').datagrid('reload');
}
	
/**
* Name 删除记录
*/
function removePerm(){
	$.messager.confirm('信息提示','确定要删除该记录？', function(result){
		if(result){
			var items = $('#permission-datagrid-inp').datagrid('getSelections');
			
			if(items.length == 0) {
				$.messager.alert('错误提示','请至少选择一条数据删除！','info');
				return;
			}
			
			var ids = [];
			$(items).each(function(){
				ids.push(this.fdId);	
			});
			$.ajax({
				url:contextPath+'/permission/delete',
				data:'ids=' + ids,
				success:function(data){
	            	var tData = eval('(' + data + ')');
		            var flag = tData.flag;
					if(flag == 'success') {
		           		$.messager.alert('信息提示',tData.msg,'info');
		           		reloadPerm();
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
function openAddPerm(){
	$('#permission-form-inp').form('clear');
	$('#permission-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "添加信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: addPerm
           }, {
               text: '保存并新建',
               iconCls: 'icon-ok',
               handler: addAllPerm
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#permission-dialog-inp').dialog('close');                    
               }
           }]
       });
}

function addPerm(){
	insertPerm(false);
}
function addAllPerm(){
	insertPerm(true);
}
/**
* Name 添加记录
*/
function insertPerm(tFlag){
	$('#permission-form-inp').form('submit', {
		type:"post",
		url:contextPath+'/permission/insert',
		success:function(data){
			 var tData = eval('(' + data + ')');
	            var flag = tData.flag;
				if(flag == 'success') {
	           		$.messager.alert('信息提示',tData.msg,'info');
	           		if(!tFlag){
		           		$('#permission-dialog-inp').dialog('close');
	           		}
	           		reloadPerm();
					$('#permission-form-inp').form('clear');
				}else{
					$.messager.alert('错误提示',tData.msg,'error');
				}
		}
	});
}

/**
* Name 打开修改窗口
*/
function openEditPerm(){
	$('#permission-form-inp').form('clear');
	var item = $('#permission-datagrid-inp').datagrid('getSelected');
	if(item == null) {
		$.messager.alert('错误提示','请选择一条数据修改！','info');
		return;
	}
	$.ajax({
		url:contextPath+'/permission/selectById',
		data:'fdId='+item.fdId,
		success:function(data){
			var tData=eval('(' + data + ')');
			var flag = tData.flag;
			if(flag == 'success') {
				//绑定值
				$('#permission-form-inp').form('load', tData);
			} else{
				$.messager.alert('信息提示',tData.msg,'info');
				$('#permission-dialog-inp').dialog('close');	
			}
		}	
	});
	$('#permission-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "修改信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: editPerm
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#permission-dialog-inp').dialog('close');                    
               }
           }]
       });
}	

/**
* Name 修改记录
*/
function editPerm(){
	$('#permission-form-inp').form('submit', {
		url:contextPath+'/permission/update',
		success:function(data){
			var tData = eval('(' + data + ')');
            var flag = tData.flag;
           	$.messager.alert('信息提示',tData.msg,'info');
			if(flag == 'success') {
           		$('#permission-dialog-inp').dialog('close');
				$('#permission-datagrid-inp').datagrid('reload');
			}else{
				$.messager.alert('信息提示',tData.msg,'error');
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
$('#permission-datagrid-inp').datagrid({
	url:contextPath+'/permission/select',
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
		{ field:'fdName',title:'权限名',width:30},
		{ field:'fdPercode',title:'权限编码',width:30},
		{ field:'fdType',title:'权限类型',width:30},
		{ field:'fdUrl',title:'权限链接',width:60},
		{ field:'fdDescription',title:'权限描述',width:100}
	]]
});

$("#submit_search").linkbutton({ iconCls: 'icon-search', plain: true }).click(function () {
	selectBox();
});

function selectBox() {
	$('#searchform').form('submit', {
		type: "post",
		url:contextPath+'/permission/selectBox',
		datatype: "json",
		success:function(data){
			var tData=eval('(' + data + ')');
			$('#permission-datagrid-inp').datagrid('loadData', tData);
		}
	});
}