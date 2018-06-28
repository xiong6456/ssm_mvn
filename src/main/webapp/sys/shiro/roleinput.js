var contextPath = getContextPath();

function reloadRole(){
	$('#role-datagrid-inp').datagrid('reload');
}
	
/**
* Name 删除记录
*/
function removeRole(){
	$.messager.confirm('信息提示','确定要删除该记录？', function(result){
		if(result){
			var items = $('#role-datagrid-inp').datagrid('getSelections');
			
			if(items.length == 0) {
				$.messager.alert('错误提示','请至少选择一条数据删除！','info');
				return;
			}
			
			var ids = [];
			$(items).each(function(){
				ids.push(this.fdId);	
			});
			$.ajax({
				url:contextPath+'/role/delete',
				data:'ids=' + ids,
				success:function(data){
	            	var tData = eval('(' + data + ')');
		            var flag = tData.flag;
					if(flag == 'success') {
		           		$.messager.alert('信息提示',tData.msg,'info');
		           		reloadRole();
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
function openAddRole(){
	$('#role-form-inp').form('clear');
	$('#role-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "添加信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: addRole
           }, {
               text: '保存并新建',
               iconCls: 'icon-ok',
               handler: addAllRole
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#role-dialog-inp').dialog('close');                    
               }
           }]
       });
}

function addRole(){
	insertRole(false);
}
function addAllRole(){
	insertRole(true);
}
/**
* Name 添加记录
*/
function insertRole(tFlag){
	$('#role-form-inp').form('submit', {
		type:"post",
		url:contextPath+'/role/insert',
		success:function(data){
			 var tData = eval('(' + data + ')');
	            var flag = tData.flag;
				if(flag == 'success') {
	           		$.messager.alert('信息提示',tData.msg,'info');
	           		if(!tFlag){
		           		$('#role-dialog-inp').dialog('close');
	           		}
	           		reloadRole();
					$('#role-form-inp').form('clear');
				}else{
					$.messager.alert('错误提示',tData.msg,'error');
				}
		}
	});
}

/**
* Name 打开修改窗口
*/
function openEditRole(){
	$('#role-form-inp').form('clear');
	var item = $('#role-datagrid-inp').datagrid('getSelected');
	if(item == null) {
		$.messager.alert('错误提示','请选择一条数据修改！','info');
		return;
	}
	$.ajax({
		url:contextPath+'/role/selectById',
		data:'fdId='+item.fdId,
		success:function(data){
			var tData=eval('(' + data + ')');
			var flag = tData.flag;
			if(flag == 'success') {
				//绑定值
				$('#role-form-inp').form('load', tData);
			} else{
				$.messager.alert('信息提示',tData.msg,'info');
				$('#role-dialog-inp').dialog('close');	
			}
		}	
	});
	$('#role-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "修改信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: editRole
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#role-dialog-inp').dialog('close');                    
               }
           }]
       });
}	

/**
* Name 修改记录
*/
function editRole(){
	$('#role-form-inp').form('submit', {
		url:contextPath+'/role/update',
		success:function(data){
			var tData = eval('(' + data + ')');
            var flag = tData.flag;
           	$.messager.alert('信息提示',tData.msg,'info');
			if(flag == 'success') {
           		$('#role-dialog-inp').dialog('close');
				$('#role-datagrid-inp').datagrid('reload');
			}else{
				$.messager.alert('信息提示',tData.msg,'error');
			}
		}
	});
}

function formatOper(val,row,index) {
	return '<a href="javascript:;" onclick=\'permissionTab(' + JSON.stringify(row) + ')\'>'
			+'<span class="icon icon-advancedsettings">&nbsp;&nbsp;&nbsp;&nbsp;</span>[编辑权限]</a>'
			+'<a href="javascript:;" onclick=\'memberDialog(' + JSON.stringify(row) + ')\' style="margin-left:10px">'
			+'<span class="icon icon-users ">&nbsp;&nbsp;&nbsp;&nbsp;</span>[管理成员]</a>';
}

//打开权限窗口
function permissionTab(tRow){
    var fdId = tRow.fdId;
    var mTranData = "fdRoleId="+fdId;
    var mSelectPath = contextPath+'/permission/selectByRoleId';
    var mUnSelectPath = contextPath+'/permission/unSelectByRoleId';
    var mSearchUnSelectPath = contextPath+'/permission/unSelectByRoleIdandName';
    var mSavePath = contextPath + '/permissionRole/update';
	openMulti(mSelectPath,mUnSelectPath,mSavePath,mTranData,fdId);
	return;
}

//打开人员窗口
function memberDialog(tRow) {
	var fdId = tRow.fdId;
	var mTranData = "fdRoleId="+fdId;
	var mSelectPath = contextPath+'/user/selectByRoleId';
	var mUnSelectPath = contextPath+'/user/unSelectByRoleId';
	var mSearchUnSelectPath = contextPath+'/user/unSelectByRoleIdandName';
	var mSavePath = contextPath + '/userRole/update';
	openMulti(mSelectPath,mUnSelectPath,mSavePath,mTranData,fdId);
	
	return;
}

function selectBox() {
	$('#searchform').form('submit', {
		type: "post",
		url:contextPath+'/role/selectBox',
		datatype: "json",
		success:function(data){
			var tData=eval('(' + data + ')');
			$('#role-datagrid-inp').datagrid('loadData', tData);
		}
	});
}