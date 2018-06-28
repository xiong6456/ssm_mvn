var contextPath = getContextPath();

function reloadEnum(){
	$('#enum-datagrid-inp').datagrid('reload');
}
	
/**
* Name 删除记录
*/
function removeEnum(){
	$.messager.confirm('信息提示','确定要删除该记录？', function(result){
		if(result){
			var items = $('#enum-datagrid-inp').datagrid('getSelections');
			
			if(items.length == 0) {
				$.messager.alert('错误提示','请选择一条数据删除！','info');
				return;
			}
			
			var ids = [];
			
			$(items).each(function(){
				ids.push(this.codeId);	
			});
			
			$.ajax({
				url:contextPath+'/sysCode/delete',
				data:'ids=' + ids,
				success:function(data){
	            	var tData = eval('(' + data + ')');
		            var flag = tData.flag;
					if(flag == 'success') {
		           		$.messager.alert('信息提示',tData.msg,'info');
						reloadEnum();
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
function openAddEnum(){
	$('#enum-form-inp').form('clear');
	$('#enum-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "添加信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: addEnum
           }, {
               text: '保存并新建',
               iconCls: 'icon-ok',
               handler: addAllEnum
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#enum-dialog-inp').dialog('close');                    
               }
           }]
       });
}

/**
* Name 添加记录
*/
function insertEnum(tFlag){
	$('#enum-form-inp').form('submit', {
		type:"post",
		url:contextPath+'/sysCode/insert',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
			if(flag == 'success') {
           		$.messager.alert('信息提示',tData.msg,'info');
           		if(!tFlag){
	           		$('#enum-dialog-inp').dialog('close');
           		}
				reloadEnum();
				$('#enum-form-inp').form('clear');
			}else{
				$.messager.alert('错误提示',tData.msg,'error');
			}
		}
	});
}
function addEnum(){
	insertEnum(false);
}
function addAllEnum(){
	insertEnum(true);
}
	
/**
* Name 打开修改窗口
*/
function openEditEnum(){
	$('#enum-form-inp').form('clear');
	var item = $('#enum-datagrid-inp').datagrid('getSelected');
	
	if(item == null) {
		$.messager.alert('错误提示','请选择一条数据修改！','info');
		return;
	}
	$.ajax({
		url:contextPath+'/sysCode/selectByCodeId',
		data:'codeId='+item.codeId,
		success:function(data){
			var tData=eval('(' + data + ')');
			var flag = tData.flag;
			if(flag == 'success') {
				//绑定值
				$('#enum-form-inp').form('load', tData);
			} else{
				$.messager.alert('信息提示',tData.msg,'info');
				$('#enum-dialog-inp').dialog('close');	
			}
		}	
	});
	$('#enum-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "修改信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: editEnum
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#enum-dialog-inp').dialog('close');                    
               }
           }]
       });
}	

/**
* Name 修改记录
*/
function editEnum(){
	$('#enum-form-inp').form('submit', {
		url:contextPath+'/sysCode/update',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
           	$.messager.alert('信息提示',tData.msg,'info');
			if(flag == 'success') {
           		$('#enum-dialog-inp').dialog('close');
				$('#enum-datagrid-inp').datagrid('reload');
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
$('#enum-datagrid-inp').datagrid({
	url:contextPath+'/sysCode/selectAll',
	loadFilter:pagerFilter,		
	rownumbers:true,
	singleSelect:false,
	pageSize:20,           
	pagination:true,
	multiSort:true,
	fitColumns:true,
	fit:true,
	columns:[[
		{ field:'codeId',checkbox:true},
		{ field:'codeType',title:'枚举类型',width:40,sortable:true},
		{ field:'codeName',title:'枚举名称',width:60},
		{ field:'codeDescription',title:'枚举描述',width:60}
	]]
});

$("#submit_search").linkbutton({ iconCls: 'icon-search', plain: true }).click(function () {
	selectBox();
});

function selectBox() {
	$('#searchform').form('submit', {
		type: "post",
		url:contextPath+'/sysCode/selectBox',
		datatype: "json",
		success:function(data){
			var tData=eval('(' + data + ')');
			$('#enum-datagrid-inp').datagrid('loadData', tData);
		}
	});
}