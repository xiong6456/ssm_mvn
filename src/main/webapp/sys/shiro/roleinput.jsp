<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8" %>  
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>角色管理</title>
<script type="text/javascript" src="${pageContext.request.contextPath }/common/js/pubfun.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/jquery-easyui-1.5.4.2/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resource/jquery-easyui-1.5.4.2/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/common/css/zero.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resource/jquery-easyui-1.5.4.2/themes/icon.css" />

<script type="text/javascript" src="${pageContext.request.contextPath }/resource/jquery-easyui-1.5.4.2/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/jquery-easyui-1.5.4.2/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="./roleinput.js"></script>
</head>
<body>
    <!-- Begin of toolbar -->
    <div id="role-toolbar-inp">
        <div class="zero-toolbar-button">
            <a href="#" class="easyui-linkbutton" iconCls="icon-add" onclick="openAddRole()" plain="true">添加</a>
            <a href="#" class="easyui-linkbutton" iconCls="icon-edit" onclick="openEditRole()" plain="true">修改</a>
            <a href="#" class="easyui-linkbutton" iconCls="icon-cross" onclick="removeRole()" plain="true">删除</a>
            <a href="#" class="easyui-linkbutton" iconCls="icon-reload" onclick="reloadRole()" plain="true">刷新</a>
        </div>
        <form name="searchform" method="post" id ="searchform">
		    <td style="width:30px;">
		       <label>角色名：</label>
		    	<input type="text" id="fdNameBox" name="fdName" class="easyui-textbox"
                		data-options="prompt:'请输入角色名'" style="width:100px" />
	            &nbsp;&nbsp;
	            <label>描述：</label>
	            <input class="easyui-textbox" id="fdDescriptionBox" name="fdDescription" style="width:100px"
	            		data-options="prompt:'请输入描述'"/>
	            	<a id="submit_search" href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="selectBox()">查询</a>
			 </td>
		 </form>
    </div>
    <!-- End of toolbar -->
<div class="easyui-layout" data-options="fit:true">
    <table id="role-datagrid-inp" class="easyui-datagrid"
			data-options="url:getContextPath()+'/role/select',loadFilter:pagerFilter,
							rownumbers:true,pageSize:10,pagination:true,multiSort:true,
							fit:true,fitColumns:true,singleSelect:true" toolbar="#role-toolbar-inp">
		<thead>
			<tr>
				<th data-options="field:'fdId',checkbox:true"></th>
				<th data-options="field:'fdCode',align:'center',width:30">角色编码</th>
				<th data-options="field:'fdName',align:'center',width:30">角色名</th>
				<th data-options="field:'fdDescription',align:'center',width:100">描述</th>
				<th data-options="field:'_operate',align:'center',width:60,formatter:formatOper">操作</th>
			</tr>
		</thead>
	</table>
</div>
<!-- Begin of easyui-dialog -->
 <div id="role-dialog-inp" class="easyui-dialog" data-options="closed:true,iconCls:'icon-save'" style="width:400px; padding:10px;">
	<form id="role-form-inp" method="post">
        <table>
        	<tr style="display:none">
                <td align="right">角色ID:</td>
                <td><input type="text" id="fdId" name="fdId"/></td>
            </tr>
            <tr>
                <td align="right">角色编码:</td>
                <td><input type="text" id="fdCode" name="fdCode" class="easyui-textbox" style="height:23px;width:200px"/></td>
            </tr>
            <tr>
                <td align="right">角色名:</td>
                <td><input type="text" id="fdName" name="fdName" class="easyui-textbox" style="height:23px;width:200px"/></td>
            </tr>
            <tr>
                <td align="right">描述:</td>
                <td><input type="text" id="fdDescription" name="fdDescription" class="easyui-textbox" data-options="multiline:true" style="height:60px;width:200px"/></td>
            </tr>
        </table>
    </form>
</div>
<!-- End of easyui-dialog -->
 <div id="role-adduser_dialog" class="easyui-dialog" data-options="closed:true,iconCls:'icon-application-side-contract'"></div>
<c:import url="/common/jsp/multiselect.jsp">
	</c:import>
</body>
</html>