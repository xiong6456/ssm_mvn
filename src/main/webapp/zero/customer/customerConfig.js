var contextPath = getContextPath();
setTimeout("getCustomerConfig()",1);
/**
 * 载入数据
 * @param data
 * @returns
 */
function getCustomerConfig(){
	$.ajax({
        url:contextPath+'/sysConfig/select',
        type:"post",
        processData:false,
        contentType:false,
        success:function(data){
        	//alert(data);
			var tData=eval('(' + data + ')');
			//alert(tData.dayCount);
			$('#dayCount').val(tData.dayCount);
			$('#dayAvg').val(tData.dayAvg);
			$('#dayBack').val(tData.dayBack);
		}
    }); 
}
function submitCustomerConfig(){
	$('#customerConfig').form('submit', {
        url:contextPath+'/sysConfig/insert',
        type:"post",
        processData:false,
        contentType:false,
        success:function(data){
        	var tData = eval('(' + data + ')');
            var flag = tData.flag;
            $.messager.alert('信息提示',tData.msg,'info');
 			if(flag == 'success') {
 				getCustomerConfig();
 			}
		}
    }); 
}