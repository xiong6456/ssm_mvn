var contextPath = getContextPath();

$(function () {
	 //通过ajax请求生成的新的datagrid的列名
    $.ajax({
    	url:contextPath+"/zero/report/selectBySpreadRole",
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
                singleSelect:true,
                columns:tColumn,//外层ajax请求的表头json
                queryParams:{},
                fitColumns:true,
                data:tData,
                multiSort:true,
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
		url:contextPath+'/zero/report/selectBySpread',
		datatype: "json",
		success:function(data){//获取表头数据成功后，使用easyUi的datagrid去生成表格
			var dataTemp = eval('(' + data + ')');
        	var tColumn = dataTemp.column;
        	var tData = dataTemp.data;
            $('#report-datagrid-inp').datagrid({ 
            	pageSize:20, 
            	pagination:true,
            	fit:true,
            	multiSort:true,
            	rownumbers:true,
            	fitColumns: true,
            	loadFilter:pagerFilter,
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