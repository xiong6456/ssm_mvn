<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<script type="text/javascript" src="../common/js/pubfun.js"></script>
<script type="text/javascript" src="../home.js"></script>
	<div id="portal" class="easyui-layout" style="width:100%;height:100%;">   
	    <div data-options="region:'west',title:'个人信息',split:true" style="width:280px;background:#eee;">
	    	<ul class="easyui-tree zero-side-tree">
	    		<li iconCls="icon-user">帐号：<font id="fdLoginName"></font></li>
	    		<li iconCls="icon-personal">姓名：<font id="fdName"></font></li>
	    		<li iconCls="icon-group">所在部门：<font id="fdSysOrgDept"></font></li>
	    		<li iconCls="icon-phone">手机号：<font id="fdPhone"></font></li>
<!-- 	    		<li iconCls="icon-page-white-key"><a href="javascript:void(0)" data-icon="icon-page-white-key"  onclick="changePsw(this)">密码修改</a></li> -->
	    	</ul>
	    </div>
	    <shiro:hasAnyRoles name="ROLE_ADMIN,ROLE_SYS,SALE_CHARGE,SPREAD_CHARGE">
	    <div data-options="region:'east',title:'红谷公告',split:true,tools: [{iconCls:'icon-add',handler:openAddNews},{iconCls:'icon-edit',handler:openEditNews},{iconCls:'icon-reload',handler:reloadNews}]" style="width:300px;background:#eee;">
	    	<table id="news-datagrid-inp" class="easyui-datagrid" data-options="showHeader:false,striped:true,fitColumns:true,fit:true"></table>
	    </div>
	    </shiro:hasAnyRoles>
	    <shiro:lacksRole name="ROLE_ADMIN,ROLE_SYS,SALE_CHARGE,SPREAD_CHARGE">
	    <div data-options="region:'east',title:'红谷公告',split:true,tools: [{iconCls:'icon-reload',handler:reloadNews}]" style="width:300px;background:#eee;">
	    	<table id="news-datagrid-inp" class="easyui-datagrid" data-options="showHeader:false,striped:true,fitColumns:true,fit:true"></table>
	    </div>
	    </shiro:lacksRole>
	    <shiro:hasAnyRoles name="ROLE_ADMIN,ROLE_SYS,SALE_CHARGE,SPREAD_CHARGE">
	    	<div id="culture" data-options="region:'center',title:'企业文化',tools: [{iconCls:'icon-edit',handler:openEditCulture}]" style="padding:5px;background:#eee;">
	    </shiro:hasAnyRoles>
	    <shiro:lacksRole name="ROLE_ADMIN,ROLE_SYS,SALE_CHARGE,SPREAD_CHARGE">
	     	<div id="culture" data-options="region:'center',title:'企业文化'" style="padding:5px;background:#eee;">
	    </shiro:lacksRole>
	    		<textarea rows="3" style="width:100%;heigth:100%" id="fdCultureShow" name="fdCultureShow"></textarea>
	   		</div>
	    <div id="culture-dialog-inp" class="easyui-dialog" data-options="closed:true,iconCls:'icon-save'" style="width:800px;height:400px; padding:10px;">
		    <textarea rows="3" style="width:100%;heigth:100%" id="fdCultureContent" name="fdCultureContent" class="easyui-validatebox" data-options="required:true,validType:'length[1,1000000]'" invalidMessage="最大长度不能超过1000000""></textarea>
		</div>   
	    <div id="news-dialog-inp" class="easyui-dialog" data-options="closed:true,iconCls:'icon-save'" style="width:400px; padding:10px;">
			<form id="news-form-inp" method="post">
		        <table>
		        	<tr style="display:none">
		                <td align="right">ID:</td>
		                <td><input type="text" id="fdId" name="fdId"/></td>
		            </tr>
		        	<tr>
		                <td align="right">标题:</td>
		                <td><input id="fdTitle" name="fdTitle" class="easyui-textbox" style="width:300px"/></td>
		            </tr>
		            <tr>
		                <td align="right">内容:</td>
		                <td><input id="fdContent" name="fdContent" style="width:300px;height:230px" class="easyui-textbox" data-options="multiline:true" /></td>
		            </tr>
		        </table>
		    </form>
		    
		</div>   
	</div>
