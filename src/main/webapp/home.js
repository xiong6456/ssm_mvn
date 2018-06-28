var contextPath = getContextPath();
var editor;
$(function(){
	$.ajax({
		url:getContextPath()+'/news/selectUser',
		success:function(data){
			var tData=eval('(' + data + ')');
			if(tData){
				$('#fdLoginName').text(tData.fdLoginName);
				$('#fdName').text(tData.fdName);
				$('#fdSysOrgDept').text(tData.fdSysOrgDept);
				$('#fdPhone').text(tData.fdPhone);
			}
		}	
	});
	
	$.ajax({
		url:getContextPath()+'/news/selectRole',
		success:function(data){
			if(data == 'false'){
				appendDatagrid(false);
			}else{
				appendDatagrid(true);
			}
		}	
	});
	
	selectCulture();
});

function appendDatagrid(tFlag){
	$('#news-datagrid-inp').datagrid({
		url:getContextPath()+'/news/select',
		columns:[[
			{ field:'fdId',hidden:true},
			{ field:'fdTitle',title:'标题',width:100},
			{ field:'_operate',hidden:tFlag,formatter: function(value,row,index){
				return '<a href="javascript:;" onclick=\'removeNews(' + JSON.stringify(row) + ')\'>×</a>';
			}}
		]],
		onSelect:function(rowIndex, rowData) {
 			viewNews(rowData.fdId);
		},
		onUnselect:function(rowIndex, rowData) {
			
		}
	});
}

/**
* Name 打开添加窗口
*/
function openAddNews(){
	$('#news-form-inp').form('clear');
	$('#news-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "添加信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: addNews
           }, {
               text: '保存并新建',
               iconCls: 'icon-ok',
               handler: addAllNews
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#news-dialog-inp').dialog('close');                    
               }
           }]
       });
}

function addNews(){
	insertNews(false);
}
function addAllNews(){
	insertNews(true);
}
/**
* Name 添加记录
*/
function insertNews(tFlag){
	$('#news-form-inp').form('submit', {
		type:"post",
		url:getContextPath()+'/news/insert',
		success:function(data){
			 var tData = eval('(' + data + ')');
	            var flag = tData.flag;
				if(flag == 'success') {
	           		$.messager.alert('信息提示',tData.msg,'info');
	           		if(!tFlag){
		           		$('#news-dialog-inp').dialog('close');
	           		}
	           		$('#news-datagrid-inp').datagrid('reload');
					$('#news-form-inp').form('clear');
				}else{
					$.messager.alert('错误提示',tData.msg,'error');
				}
		}
	});
}

/**
* Name 删除记录
*/
function removeNews(tObj){
	var fdId = tObj.fdId;
	$.messager.confirm('信息提示','确定要删除该记录？', function(result){
		if(result){
			$.ajax({
				url:getContextPath()+'/news/delete',
				data:'fdId=' + fdId,
				success:function(data){
					var tData = eval('(' + data + ')');
		            var flag = tData.flag;
					if(flag == 'success') {
		           		$.messager.alert('信息提示',tData.msg,'info');
		           		$('#news-datagrid-inp').datagrid('reload');
					}else{
						$.messager.alert('错误提示',tData.msg,'error');
					}
				}
			});
		}	
	});
}

function viewNews(fdId) {
	$.ajax({
		url:contextPath+'/news/selectId',
		data:'fdId='+fdId,
		success:function(data){
			var tData=eval('(' + data + ')');
			if(data){
				//绑定值
				$('#fdTitle').textbox('textbox').attr('readonly',true);
				$('#fdContent').textbox('textbox').attr('readonly',true); 
				$('#news-form-inp').form('load', tData);
			} else{
				$('#news-dialog-inp').dialog('close');	
			}
		}	
	});
	$('#news-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "公告详情",
           buttons: [{
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#news-dialog-inp').dialog('close');                    
               }
           }]
       });
}

/**
* Name 打开修改窗口
*/
function openEditNews(){
	$('#news-form-inp').form('clear');
	var item = $('#news-datagrid-inp').datagrid('getSelected');
	if(item == null) {
		$.messager.alert('错误提示','请选择一条数据修改！','info');
		return;
	}
	$.ajax({
		url:contextPath+'/news/selectId',
		data:'fdId='+item.fdId,
		success:function(data){
			var tData=eval('(' + data + ')');
			if(data){
				//绑定值
				$('#fdTitle').textbox('textbox').attr('readonly',false);
				$('#fdContent').textbox('textbox').attr('readonly',false); 
				$('#news-form-inp').form('load', tData);
			} else{
				$('#news-dialog-inp').dialog('close');	
			}
		}	
	});
	$('#news-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "修改信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: editNews
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#news-dialog-inp').dialog('close');                    
               }
           }]
       });
}	

/**
* Name 修改记录
*/
function editNews(){
	$('#news-form-inp').form('submit', {
		url:contextPath+'/news/update',
		success:function(data){
            var tData = eval('(' + data + ')');
            var flag = tData.flag;
           	$.messager.alert('信息提示',tData.msg,'info');
			if(flag == 'success') {
           		$('#news-dialog-inp').dialog('close');
				$('#news-datagrid-inp').datagrid('reload');
			}
		}
	});
}

function reloadNews() {
	$('#news-datagrid-inp').datagrid('reload');
}

/**
* Name 打开企业文化修改窗口
*/
function openEditCulture(){
	editor = KindEditor.create('textarea[name="fdCultureContent"]',{
					resizeType : 1,width:"100%",height:"300px",
				afterChange:function(){  
			        this.sync();  
			     },afterBlur:function(){  
			         this.sync();  
			     },onBeforeClose: function (event, ui) {
			 		// 关闭Dialog前移除编辑器
					   KindEditor.remove('#fdCultureContent');
					}
			     });
//	$('#culture-form-inp').form('clear');
	$.ajax({
		url:contextPath+'/zero/culture/select',
		data:'fdId=0000000000000000000000000culture',
		success:function(data){
			var tData=eval('(' + data + ')');
			if(data){
				//绑定值
				KindEditor.html('#fdCultureContent',tData.fdContent);
//				$('#culture-form-inp').form('load', tData);
			} else{
				$('#culture-dialog-inp').dialog('close');	
			}
		}	
	});
	$('#culture-dialog-inp').dialog({
		closed: false,
		modal:true,
           title: "修改信息",
           buttons: [{
               text: '确定',
               iconCls: 'icon-ok',
               handler: editCulture
           }, {
               text: '取消',
               iconCls: 'icon-cancel',
               handler: function () {
                   $('#culture-dialog-inp').dialog('close');                    
               }
           }]
       });
		
}	

/**
* Name 修改记录
*/
function editCulture(){
	var mycontent=document.getElementById("fdCultureContent").value;
	$.ajax({
		url:contextPath+'/zero/culture/update',
		type:'post',
		data://'fdContent='+encodeURI(encodeURI(mycontent))+'&fdId=0000000000000000000000000culture'
			JSON.stringify({'fdContent':mycontent, 'fdId': "0000000000000000000000000culture"}),
		contentType:'application/json',
		//dataType: 'JSON',
			//"application/x-www-form-urlencoded",
		success:function(data){
			var tData = eval('(' + data + ')');
            var flag = tData.flag;
           	$.messager.alert('信息提示',tData.msg,'info');
			if(flag == 'success') {
           		$('#culture-dialog-inp').dialog('close');
           		KindEditor.html('#fdCultureShow',mycontent);
			}
		}	
	});
}

function selectCulture(){
	$.ajax({
		url:contextPath+'/zero/culture/select',
		data:'fdId=0000000000000000000000000culture',
		success:function(data){
			var tData=eval('(' + data + ')');
			if(data){
				//绑定值
				editor = KindEditor.create('textarea[name="fdCultureShow"]',{
					resizeType : 1,width:"100%",height:"440px",items:[],
				afterChange:function(){  
			        this.sync();  
			     },afterBlur:function(){  
			         this.sync();  
			     }
			     });
				editor.readonly(true);
				KindEditor.html('#fdCultureShow',tData.fdContent);
			}
		}	
	});
}

function changePsw(tObj){
	$('#portal').dialog({
	    title: '密码修改',    
	    width: 500,    
	    height: 400,    
	    cache: false,    
	    href: '../sys/shiro/pswupdateinput.html',    
	    modal: true,
	    onClose:function(){
	    	window.location.reload(true);
	    }
	});  
}

