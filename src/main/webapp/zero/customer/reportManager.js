var contextPath = getContextPath();

$(function () {
	 //通过ajax请求生成的新的datagrid的列名
    $.ajax({
    	url:contextPath+"/zero/report/selectByRole",
        type:"POST",
        dataType:'json',
        success:function(data){//获取表头数据成功后，使用easyUi的datagrid去生成表格
        	var tColumn = data.column;
        	var tData = data.data;
            $('#report-datagrid-inp').datagrid({ 
            	pageSize:20, 
            	pagination:true,
            	fit:true,
            	rownumbers:true,
            	loadFilter:pagerFilter,
            	multiSort:true,
            	fitColumns: true,
                singleSelect:true,
                columns:tColumn,//外层ajax请求的表头json
                queryParams:{},
                fitColumns:true,
                data:tData,
                onSelect:function(rowIndex, rowData){
//                    alert(rowData.appId);
                }
            });
        },error:function(xhr){
            alert(xhr);
        }
    });
});

function selectBox() {
	if(selectCheck() == false) {
		return false;
	}
	$('#report_searchform').form('submit', {
		type: "post",
		url:contextPath+'/zero/report/selectBox',
		datatype: "json",
		success:function(data){//获取表头数据成功后，使用easyUi的datagrid去生成表格
			var dataTemp = eval('(' + data + ')');
        	var tColumn = dataTemp.column;
        	var tData = dataTemp.data;
            $('#report-datagrid-inp').datagrid({ 
            	pageSize:20, 
            	pagination:true,
            	fit:true,
            	rownumbers:true,
            	loadFilter:pagerFilter,
            	multiSort:true,
            	fitColumns: true,
                singleSelect:true,
                columns:tColumn,//外层ajax请求的表头json
                queryParams:{},
                fitColumns:true,
                data:tData,
                onSelect:function(rowIndex, rowData){
                }
            });
        },error:function(xhr){
            alert(xhr);
        }
	});
}

function selectCheck() {
	var fdBeginDate = $("#fdBeginDate").val();
	var fdEndDate = $("#fdEndDate").val();
	if(fdBeginDate>fdEndDate){
		$.messager.alert('提示','开始时间不能大于结束时间！');
		return false;
	}
	return true;
}