<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>数据导入</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/css/bootstrap.min.css"rel="stylesheet">
	<script type="text/javascript" src="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/js/jquery-2.1.3.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/common/js/bootbox.min.js"></script>
  </head>
  
  <body>
  	<h2>${param.docSubject }</h2>
  	<form id="tf" enctype="multipart/form-data">
  		<table width="500px;" border="1">
  			<tr style="text-align:right;padding:2px">
			  	<a href="${pageContext.request.contextPath}/excel/excelOut?fdTemplateName=${param.fdTemplateName }">
			  	<img alt="Excel模板下载" src="${pageContext.request.contextPath }/resource/excel/images/ico_excel.png" />
			  	<span style="font-size:middle;font-weight:150;color:red">Excel模板下载.xls</span>
			  	</a>
			</tr>
  			<tr>
  				<td>请选择文件:</td><td><input id="excelFile" type='file' name="excelFile" /></td>
  				<td><input type='button' value="导入" onclick="impFile()"/></td>
  			</tr>
  			<input type="hidden" id="ServiceName" name="ServiceName" value="${param.ServiceName }"/>
  			
  			<!--导入数据操作层-->
			<div id="import" class="modal fade bs-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-lg">
					<div class="modal-content">
				        <div class="modal-header bg-info text-white" style="height:50px;">
				            <h4 class="modal-title">导入结果如下</h4>
				        </div>
						<div class="modal-body" id="resInfo" style="height:300px;overflow:auto;">
					  	
						</div>
						<div class="modal-footer">  
					        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>  
					     </div>
				     </div>
				</div>
			</div>
			
			<div id="progress" class="modal fade bs-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
				<div class="modal-dialog modal-lg">
					<div class="progress progress-striped active">
					    <div class="progress-bar progress-bar-success" role="progressbar"
					         aria-valuemin="0" aria-valuemax="100"
					         style="width: 0%;">
					         0% 
					    </div>
					</div>
				</div>
			</div>
			
  		</table>
  	</form>
  	
  	<hr/>
  </body>
</html>
<script>
function impFile(){
	var fileupload = document.getElementById("excelFile");
	if(check(fileupload) == false) {
		return false;
	}
// var size = fileupload.files[0].size;
    //打开进度条
 		$('#progress').modal({
		keyboard: true
	});
		
	progress(true);
		
 	var form = new FormData(document.getElementById("tf"));
    $.ajax({
        url:"${pageContext.request.contextPath}/excel/importFile",
        type:"post",
        data:form,
        processData:false,
        contentType:false,
        success:function(data){
	       	//关闭定时器
	       	progress(false);
	
			var resInfo = "";
			$.each(data, function(index, item){
			   	resInfo += "<p><i class='icon-spinner icon-spin'></i>" + index+item + "</p>";
			});
		    $('#resInfo').html("");
		    $('#resInfo').append(resInfo);
        	setTimeout("resfun()",1000);
        },
        error:function(e){
            alert("错误！！");
            //window.clearInterval(timer);
        }
    });        
   // get();//此处为上传文件的进度条
}

function check(fileupload){
	if (fileupload.value.length < 1) {
			bootbox.alert({ 
			  size: "middle",
			  title: "提示：",
			  message: "请选择一个Excel导入！"
			});
	        return false;
	    }
	    
    var tName = fileupload.value;
    if(tName.indexOf(".xlsx")<0 && tName.indexOf(".xls")<0){
    	bootbox.alert({ 
		  size: "middle",
		  title: "提示：",
		  message: "文件类型有误，请选择一个Excel导入！"
		});
        return false;
    }
    return true;
}

var i = 0;
//进度条达到100后延迟1000ms
function resfun() {
	//打开导入信息弹框
    $('#import').modal({
		keyboard: true
	});
    //关闭进度条，并重新设置进度为0%
	$('#progress').modal('hide');
	$("div[role='progressbar']").css("width","0%"); 
	$("div[role='progressbar']").text("0%");
	i=0;
}

var tFlag = false; 
function progress(flag){
	tFlag = flag;
	var appendTd = setInterval(function() {
		//修改进度条
		i++;
		//如果后台执行完成，则关闭定时器并设置进度条为100%
		if(!tFlag) {
			i = 100;
			clearInterval(appendTd);
		}
		//如果进度条达到99%且后台完执行完成，则停在99%位置并关闭定时器，等待后台执行完成
		if(tFlag && i==99){
			clearInterval(appendTd);
		}
		$("div[role='progressbar']").css("width",i+"%"); 
		$("div[role='progressbar']").text(i+"%");
	}, 1000);
}
 </script>