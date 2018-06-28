var contextPath = getContextPath();

$(function(){
	updateParent();
});
function updateParent(){
	$('#fdParentId').combotree({    
	    url: contextPath+'/dept/selectParent'
	});
}
/**
* Name 添加记录
*/
function add(){
	insertDept(false);
}
function addAll(){
	insertDept(true);
}
function insertDept(tFlag){
	$('#dept-form-inp').form('submit', {
		type:"post",
		url:contextPath+'/dept/add',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
			if(flag == 'success') {
           		$.messager.alert('信息提示',tData.msg,'info');
           		if(!tFlag){
	           		$('#dept-dialog-inp').dialog('close');
           		}
				reloadDept();
				$('#dept-form-inp').form('clear');
			}else{
				$.messager.alert('错误提示',tData.msg,'error');
			}
		}
	});
}
function reloadDept(){
	updateParent();
	$('#dept-treegrid-inp').treegrid('reload');
}
	
/**
* Name 删除记录
*/
function removeDept(){
	$.messager.confirm('信息提示','确定要删除该记录？', function(result){
		if(result){
			var item = $('#dept-treegrid-inp').treegrid('getSelected');
			
			if(item == null) {
				$.messager.alert('错误提示','请至少选择一条数据删除！','info');
				return;
			}
			
			$.ajax({
				url:contextPath+'/dept/delete',
				data:'id=' + item.id,
				success:function(data){
		            var tData = eval('(' + data + ')');
	            	$.messager.alert('信息提示',tData.msg,'info');
	            	reloadDept();
				}
			});
		}	
	});
}
	
/**
* Name 打开添加窗口
*/
function openAddDept(){
	$('#dept-form-inp').form('clear');
	$('#dept-dialog-inp').dialog({
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
                   $('#dept-dialog-inp').dialog('close');                    
               }
           }]
       });
}
	
/**
* Name 打开修改窗口
*/
function openEditDept(){
	$('#dept-form-inp').form('clear');
	var item = $('#dept-treegrid-inp').treegrid('getSelected');
	if(item == null) {
		$.messager.alert('错误提示','请选择一条数据修改！','info');
		return;
	}
	$.ajax({
		async:false,
		url:contextPath+'/dept/selectById',
		data:'fdId='+item.id,
		type:'post',
		dataType:'json',
		success:function(data){
			var tData=data;
			if(data){
				//绑定值
				$('#dept-form-inp').form('load', tData);
			} else{
				$('#dept-dialog-inp').dialog('close');	
			}
		},
		error:function(data){
			$.messager.alert('错误提示',data,'error');
		}
	});
	$('#dept-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "修改信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: edit
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#dept-dialog-inp').dialog('close');                    
               }
           }]
       });
}	

/**
* Name 修改记录
*/
function edit(){
	$('#dept-form-inp').form('submit', {
		url:contextPath+'/dept/update',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
           	$.messager.alert('信息提示',tData.msg,'info');
			if(flag == 'success') {
           		$('#dept-dialog-inp').dialog('close');
				reloadDept();
			}
		}
	});
}
$('#dept-treegrid-inp').treegrid({    
    url: contextPath+'/dept/selectParent',    
    idField:'id',    
    treeField:'text',
    fitColumns:'true',
    columns:[[    
        {field:'text',title:'组织架构名称',width:300},
        {field:'fdSysCode',title:'类型',width:200,align:'center'},
        {field:'fdMajorName',title:'主负责人',width:200,align:'center'}
        //,
        //{field:'fdMinorName',title:'副负责人',width:200,align:'center'}
    ]]    
});
