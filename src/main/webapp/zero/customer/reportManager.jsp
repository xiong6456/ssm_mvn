<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>统计管理</title>
<script type="text/javascript" src="../../common/js/pubfun.js"></script>
<link rel="stylesheet" type="text/css"
	href="../../resource/jquery-easyui-1.5.4.2/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css"
	href="../../resource/jquery-easyui-1.5.4.2/themes/icon.css" />
<script type="text/javascript"
	src="../../resource/jquery-easyui-1.5.4.2/jquery.min.js"></script>
<script type="text/javascript"
	src="../../resource/jquery-easyui-1.5.4.2/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="../../resource/jquery-easyui-1.5.4.2/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="./reportManager.js"></script>

</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<div id="customer-toolbar-inp-2">
	<form name="searchform" method="post" id ="report_searchform">
		  <td height="30">
		    <label>开始时间：</label>
		    <input id="fdBeginDate" name="fdBeginDate" type="text" class="easyui-datebox"></input> 
		    &nbsp;&nbsp;
		    <label>结束时间：</label>
		    <input id="fdEndDate" name="fdEndDate" type="text" class="easyui-datebox"></input> 
		    &nbsp;&nbsp;
		    <shiro:hasAnyRoles name="ROLE_ADMIN,ROLE_SYS,SPREAD_CHARGE">
		    <label>所属部门：</label><input type="text" id="fdDeptIdBox" name="fdDeptId" class="easyui-combotree"
                		data-options="url:contextPath+'/dept/selectParent'" style="width:160px" />
            &nbsp;&nbsp;
            </shiro:hasAnyRoles>
            <shiro:hasAnyRoles name="SALE_LEADER,SALE_CHARGE">
            <label>姓 名：</label>
            <input class="easyui-textbox" id="fdNameBox" name="fdName" style="width:100px"
            		data-options="prompt:'请输入姓名',events:'{blur:selectBox}'"/>
		 	</shiro:hasAnyRoles>
            <a id="submit_search" href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="selectBox();">查询</a>
		  </td>
	</form>
	</div>
	<div class="easyui-layout" data-options="fit:true">
		<table id="report-datagrid-inp" class="easyui-datagrid" toolbar="#customer-toolbar-inp-2"></table>
	</div>
</div>  
</body>
</html>