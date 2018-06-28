<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8" %>  
<html>
<head>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/css/prettify.min.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath }/common/css/multiselect.css" />
<script type="text/javascript" src="${pageContext.request.contextPath }/common/js/multiselect.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/js/prettify.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/js/multiselect.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/common/js/bootbox.min.js"></script>
<style type="text/css">
	.panel-body {padding: 0 !important;}
</style>
</head>
<body>
<!-- 模态框（Modal） -->
<div class="modal fade" id="multiModal" tabindex="-1" role="dialog" aria-labelledby="multiModalLabel" aria-hidden="true" data-backdrop="static">
   	<div class="modal-dialog modal-lg">
    	<div class="modal-content">
    		<div class="modal-header bg-info text-white" style="height:50px;">
	    		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
				</button>
	            <h4 class="modal-title">请选择</h4>
	        </div>
	        <div class="modal-body">
			    <div id="wrap" class="mycontainer">            
			            <div class="row">
			                <div class="col-sm-4">
			                <h4 style="text-align:center;background: aqua;">未选择</h4>
			                    <select name="fromSelObj" id="search" class="form-control" size="8" multiple="multiple">
			                    </select>
			                </div>
			                
			                <div class="col-sm-3">
			                <h4 style="height: 60px;"></h4>
			                    <button type="button" id="search_rightAll" class="btn btn-block"><i class="glyphicon glyphicon-forward"></i></button>
			                    <button type="button" id="search_rightSelected" class="btn btn-block"><i class="glyphicon glyphicon-chevron-right"></i></button>
			                    <button type="button" id="search_leftSelected" class="btn btn-block"><i class="glyphicon glyphicon-chevron-left"></i></button>
			                    <button type="button" id="search_leftAll" class="btn btn-block"><i class="glyphicon glyphicon-backward"></i></button>
			                </div>
			                
			                <div class="col-sm-4">
			                <h4 style="text-align:center;background: aqua;">已选择</h4>
				                <form action="" id="saveData" onsubmit="return false">
				                    <select name="toSelObj" id="search_to" class="form-control" size="8" multiple="multiple"></select>
				                	<input type="hidden" id="fdMultiId" value="">
				                </form>
			                </div>
							
							<input type="hidden" id="hidMultiSave">
			            </div>
					</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick="saveData()">保存</button>
		        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>  
		     </div>
	     </div>
	</div>
</div>
</body>
</html>
