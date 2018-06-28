var contextPath = getContextPath();
var mId;
var mName;
//弹出更多窗口  
function more(tId,tName){
	mId = tId;
	mName = tName;
    $('#tongji_ranking_dialog').window('open');  
    loadRankingData_dialog();  
}  
function loadRankingData_dialog() {  
    //var searchUrl = contextPath + "/user/select";  
    //alert(searchUrl);  
    //ajaxFun(searchUrl, loadTongJiRankingData_dialog);  
    
    $('#pageTable_dialog').datagrid({
    	url:contextPath+'/user/select',
    	loadFilter:userpagerFilter,		
    	rownumbers:true,
    	//singleSelect:false,
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
    	    //alert(selectedRow.fdName);
    	    $('#'+mId).val(selectedRow.fdId);
    	    $('#'+mName).val(selectedRow.fdName);
    	    $('#tongji_ranking_dialog').dialog('close');
    	   }
    });
}   
  
function userpagerFilter(data){            
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




