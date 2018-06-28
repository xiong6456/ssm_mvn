<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@page import="com.zero.pojo.shiro.SysUser"%>
<%
SysUser tSysUser = (SysUser)session.getAttribute("userInfo");
String loginName = tSysUser.getFdLoginName();
String fdName = tSysUser.getFdName();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="copyright" content="All Rights Reserved, Copyright (C) 2018, Ltd." />
<title>首页</title>
<link rel="stylesheet" type="text/css" href="../resource/jquery-easyui-1.5.4.2/themes/default/easyui.css" />
<link rel="stylesheet" href="../resource/kindeditor-4.1.10/themes/default/default.css" />  
<link rel="stylesheet" type="text/css" href="../common/css/zero.css" />
<script src="../resource/kindeditor-4.1.10/kindeditor-all.js"></script>
<script charset="utf-8" src="../resource/kindeditor-4.1.10/lang/zh_CN.js"></script>  
<link rel="stylesheet" type="text/css" href="../resource/jquery-easyui-1.5.4.2/themes/icon.css" />
<script type="text/javascript" src="../resource/jquery-easyui-1.5.4.2/jquery.min.js"></script>
<script type="text/javascript" src="../resource/jquery-easyui-1.5.4.2/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../resource/jquery-easyui-1.5.4.2/locale/easyui-lang-zh_CN.js"></script>
</head>
<body class="easyui-layout">
	<!-- begin of header -->
	<div class="zero-header" data-options="region:'north',border:false,split:true">
    	<div class="zero-header-left">
        	<h1>南昌红谷片区</h1>
        </div>
        <div class="zero-header-right">
        	<p><strong class="easyui-tooltip" title="登录人员：<%=fdName%>"><shiro:principal/></strong>，欢迎您！</p>
            <p><a href="#">网站首页</a>|<a href="#">支持论坛</a>|<a href="#">帮助中心</a>|<a href="${pageContext.request.contextPath }/shiro/exit">安全退出</a></p>
        </div>
    </div>
    <!-- end of header -->
    <!-- begin of sidebar -->
	<div class="zero-sidebar" data-options="region:'west',split:true,border:true,title:'导航菜单'"> 
    	<div class="easyui-accordion" data-options="border:false,fit:true">
            <div title="系统设置" data-options="iconCls:'icon-advancedsettings'" style="padding:5px;">  	
    			<ul class="easyui-tree zero-side-tree">
    				<shiro:hasRole name="ROLE_SYS">
	                	<li iconCls="icon-chart-organisation"><a href="javascript:void(0)" data-icon="icon-chart-organisation" data-link="../sys/menu/MenuManageInput.jsp" iframe="1">菜单导航</a></li>
                	</shiro:hasRole>
                	<shiro:hasAnyRoles name="ROLE_SYS,ROLE_ADMIN">
	                	<li iconCls="icon-bullet-wrench"><a href="javascript:void(0)" data-icon="icon-bullet-wrench" data-link="../sys/plugin/enuminput.html" iframe="0">枚举配置</a></li>
                	</shiro:hasAnyRoles>
                	<shiro:hasAnyRoles name="ROLE_SYS,ROLE_ADMIN,ROLE_DEPT_VIEW">
                	<li iconCls="icon-users"><a href="javascript:void(0)" data-icon="icon-users" data-link="../sys/shiro/deptinput.html" iframe="0">部门管理</a></li>
                	</shiro:hasAnyRoles>
                	<shiro:hasAnyRoles name="ROLE_SYS,ROLE_ADMIN,ROLE_USER_VIEW">
                	<li iconCls="icon-user"><a href="javascript:void(0)" data-icon="icon-user" data-link="../sys/shiro/userinput.jsp" iframe="0">用户管理</a></li>
                	</shiro:hasAnyRoles>
                	<shiro:hasAnyRoles name="SPREAD_NORMAL,SPREAD_LEADER,SPREAD_CHARGE">
                	<li iconCls="icon-user"><a href="javascript:void(0)" data-icon="icon-user" data-link="../zero/customer/customerSpread.jsp" iframe="0">客户管理</a></li>
                	</shiro:hasAnyRoles>
                	<shiro:hasAnyRoles name="SPREAD_CHARGE,ROLE_SYS,ROLE_ADMIN">
                	<li iconCls="icon-user"><a href="javascript:void(0)" data-icon="icon-user" data-link="../zero/customer/customerConfig.html" iframe="1">参数配置</a></li>
                	</shiro:hasAnyRoles>
                	<shiro:hasAnyRoles name="SALE_NORMAL,SALE_LEADER,SALE_CHARGE">
                	<li iconCls="icon-user"><a href="javascript:void(0)" data-icon="icon-user" data-link="../zero/customer/customer.jsp" iframe="0">客户管理</a></li>
                	</shiro:hasAnyRoles>
                	<shiro:hasAnyRoles name="ROLE_SYS,ROLE_ADMIN">
                	<li iconCls="icon-user-key"><a href="javascript:void(0)" data-icon="icon-user-key" data-link="../sys/shiro/roleinput.jsp" iframe="1">角色管理</a></li>
                	</shiro:hasAnyRoles>
                	<shiro:hasRole name="ROLE_SYS">
                	<li iconCls="icon-drive-user"><a href="javascript:void(0)" data-icon="icon-drive-user" data-link="../sys/shiro/permissioninput.html" iframe="0">权限管理</a></li>
                	</shiro:hasRole>
                	<shiro:hasAnyRoles name="SPREAD_CHARGE,SALE_CHARGE,ROLE_SYS,ROLE_ADMIN">
	                <li iconCls="icon-page-white-key"><a href="javascript:void(0)" data-icon="icon-page-white-key" data-link="../sys/shiro/pswupdateinput.html" iframe="0">密码修改</a></li>
                	</shiro:hasAnyRoles>
                	<shiro:hasAnyRoles name="ROLE_SYS,ROLE_ADMIN">
                		<li iconCls="icon-control-repeat"><a href="javascript:void(0)" data-icon="icon-control-repeat" data-link="../sys/shiro/pswresetinput.html" iframe="0">密码重置</a></li>
                		<li iconCls="icon-lock-open"><a href="javascript:void(0)" data-icon="icon-lock-open" data-link="../sys/shiro/pswopeninput.html" iframe="0">密码解锁</a></li>
                	</shiro:hasAnyRoles>
                </ul>
            </div>
        </div>
    </div>	
    <!-- end of sidebar -->    
    <!-- begin of main -->
    <div class="zero-main" data-options="region:'center'">
        <div id="zero-tabs" class="easyui-tabs" data-options="border:false,fit:true">  
            <div title="首页" data-options="href:'../home.jsp',closable:false,iconCls:'icon-tip',cls:'pd3'"></div>
        </div>
    </div>
    <!-- end of main --> 
    <!-- begin of footer -->
	<div class="zero-footer" data-options="region:'south',border:true,split:true">
    	&copy; 2018 All Rights Reserved
    </div>
    <!-- end of footer -->  
    <script type="text/javascript">
		$(function(){
			//查询菜单 easyui-accordion
			$.ajax({
				url:"${pageContext.request.contextPath }/menu/selectShowTree",
				data:{"fdName":"sys"},
				type: "POST",
				dataType:"json",
				async:false,
				success: function(data){
					var tData = eval(data.result);
					var temp = eval(tData[0]).children;
					for(var i in temp){
						var tDiv = "";
						var tChildObj = temp[i].children;
						if(typeof tChildObj != 'undefined') {
							for(var j in tChildObj){
								tDiv += "<li iconCls='"+tChildObj[j].fdCls+"'><a href='javascript:void(0)' data-icon='"+tChildObj[j].fdCls+"' data-link='"+tChildObj[j].attributes.url+"' iframe='"+tChildObj[j].attributes.iframe+"'>"+tChildObj[j].text+"</a></li>";
							}
						}
						$('.easyui-accordion').accordion('add', {
							title: temp[i].text,
							iconCls:temp[i].fdCls,
							content: "<ul class='easyui-tree zero-side-tree'>"
										+tDiv
										+"</ul>",
							selected: false
						});
					}
					
				 }
			});
			$('.zero-side-tree a').bind("click",function(){
				var title = $(this).text();
				var url = $(this).attr('data-link');
				var iconCls = $(this).attr('data-icon');
				var iframe = $(this).attr('iframe')==1?true:false;
				addTab(title,url,iconCls,iframe);
			});
			/**
		* Name 载入树形菜单 
		*/
		})
		
		/**
		* Name 载入树形菜单 
		*/
		$('#zero-side-tree').tree({
			url:'${pageContext.request.contextPath}/menu/selectTree',
			cache:false,
			onClick:function(node){
			alert(node)
				var url = node.attributes['url'];
				if(url==null || url == ""){
					return false;
				}
				else{
					addTab(node.text, url, '', node.attributes['iframe']);
				}
			}
		});
		
		/**
		* Name 选项卡初始化
		*/
		$('#zero-tabs').tabs({
			tools:[{
				iconCls:'icon-reload',
				border:false,
				handler:function(){
					$('#zero-datagrid').datagrid('reload');
				}
			}]
		});
			
		/**
		* Name 添加菜单选项
		* Param title 名称
		* Param href 链接
		* Param iconCls 图标样式
		* Param iframe 链接跳转方式（true为iframe，false为href）
		*/	
		function addTab(title, href, iconCls, iframe){
			var tabPanel = $('#zero-tabs');
			if(!tabPanel.tabs('exists',title)){
				var content = '<iframe scrolling="auto" frameborder="0"  src="'+ href +'" style="width:100%;height:100%;"></iframe>';
				if(iframe){
					tabPanel.tabs('add',{
						title:title,
						content:content,
						iconCls:iconCls,
						fit:true,
						cls:'pd3',
						closable:true
					});
				}
				else{
					tabPanel.tabs('add',{
						title:title,
						href:href,
						iconCls:iconCls,
						fit:true,
						cls:'pd3',
						closable:true
					});
				}
			}
			else
			{
				tabPanel.tabs('select',title);
			}
		}
		/**
		* Name 移除菜单选项
		*/
		function removeTab(){
			var tabPanel = $('#zero-tabs');
			var tab = tabPanel.tabs('getSelected');
			if (tab){
				var index = tabPanel.tabs('getTabIndex', tab);
				tabPanel.tabs('close', index);
			}
		}
		
	</script>
</body>
</html>
