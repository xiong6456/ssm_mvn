<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
<script type="text/javascript" src="../common/js/pubfun.js"></script>
<script type="text/javascript" src="../sys/shiro/userinput.js"></script>
<script type="text/javascript" src="../sys/shiro/userlist.js"></script>
<div class="easyui-layout" data-options="fit:true">
    <!-- Begin of toolbar -->
    <div id="user-toolbar-inp">
        <div class="zero-toolbar-button">
            <a href="#" class="easyui-linkbutton" iconCls="icon-add" onclick="openAddUser()" plain="true">添加</a>
            <a href="#" class="easyui-linkbutton" iconCls="icon-edit" onclick="openEditUser()" plain="true">修改</a>
            <a href="#" class="easyui-linkbutton" iconCls="icon-cross" onclick="removeUser()" plain="true">删除</a>
            <a href="#" class="easyui-linkbutton" iconCls="icon-reload" onclick="reloadUser()" plain="true">刷新</a>
        </div>
        <form name="searchform" method="post" id ="user_searchform">
		    <td height="30">
		       <label>所属部门：</label><input type="text" id="fdDeptIdBox" name="fdDeptId" class="easyui-combotree"
                		data-options="url:contextPath+'/dept/selectParent'" style="width:160px" />
            &nbsp;&nbsp;
            <label>姓 名：</label>
            <input class="easyui-textbox" id="fdNameBox" name="fdName" style="width:100px"
            		data-options="prompt:'请输入姓名',events:'{blur:selectBox}'"/>
            	<a id="submit_search" href="#" class="easyui-linkbutton" iconCls="icon-search">查询</a>
		    </td>
		  </form>
    </div>
    <!-- End of toolbar -->
    <table id="user-datagrid-inp" class="easyui-datagrid" toolbar="#user-toolbar-inp"></table>
</div>
<!-- Begin of easyui-dialog -->
<div id="user-dialog-inp" class="easyui-dialog" data-options="closed:true,iconCls:'icon-save'" style="width:400px; padding:10px;">
	<form id="user-form-inp" method="post">
        <table>
        	<tr style="display:none">
                <td align="right">用户ID:</td>
                <td><input type="text" id="fdId" name="fdId"/></td>
            </tr>
        	<tr>
                <td align="right">用户名:</td>
                <td><input type="text" id="fdLoginName" name="fdLoginName" class="zero-text" style="height:23px"/></td>
            </tr>
            <tr>
                <td align="right">姓 名:</td>
                <td><input type="text" id="fdName" name="fdName" class="zero-text" style="height:23px" /></td>
            </tr>
            <tr>
                <td align="right">手机号:</td>
                <td><input type="text" id="fdPhone" name="fdPhone" class="zero-text" style="height:23px" /></td>
            </tr>
            <tr>
                <td align="right">所属部门:</td>
                <td><input type="text" id="fdDeptId" name="fdDeptId" class="easyui-combotree"
                		data-options="url:contextPath+'/dept/selectParent'" style="width:260px" /></td>
            </tr>
             <tr>
                <td align="right">对接人:</td>
                <td><input type="hidden" id="fdBak2" name="fdBak2" />
               		<input type="text" id="fdBak2Name" name="fdBak2Name" class="zero-text" style="height:23px" onclick="more('fdBak2','fdBak2Name')"/></td>
            </tr>
            
        </table>
    </form>
</div>
<!-- End of easyui-dialog -->

<!-- 弹框选择用户列表 -->
<div id="tongji_ranking_dialog" class="easyui-window" title="用户列表" data-options="modal:true,closed:true,iconCls:'icon-save',top:0,resizable:false,collapsible:false,minimizable:false,maximizable:false" style="width:700px;height:390px;padding:5px;top:200px;">  
          <div class="easyui-layout" data-options="fit:true">
    <!-- Begin of toolbar -->
    <div id="userList-toolbar-inp">
        <form name="searchform_1" method="post" id ="searchform_1">
		    <td height="30">
		       <label>所属部门：</label><input type="text" id="fdDeptIdBox_1" name="fdDeptId" class="easyui-combotree"
                		data-options="url:contextPath+'/dept/selectParent'" style="width:160px" />
            &nbsp;&nbsp;
            <label>姓 名：</label>
            <input class="easyui-textbox" id="fdNameBox" name="fdName" style="width:100px"
            		data-options="prompt:'请输入姓名',events:'{blur:selectBox1}'"/>
            	<a id="submit_search_1" href="#" class="easyui-linkbutton" iconCls="icon-search">查询</a>
		    </td>
		  </form>
    </div>
    <!-- End of toolbar -->
    <div id="" class="">  
         <table id="pageTable_dialog"class="easyui-datagrid"  rownumbers="true"    pagination="true"   singleSelect="true"  fitColumns="true"  style="width:400px;height:346px" toolbar="#userList-toolbar-inp">
           <thead> 
              <tr>
                  <th data-options="field:'id',width:80">id</th>
                  <th data-options="field:'fdLoginName',width:80">登录名</th>
                  <th data-options="field:'fdName',width:80" >姓名</th>
                  <th data-options="field:'fdPhone',width:80" >手机号</th>
              </tr>
           </thead>
       </table>
      </div>
   </div>
</div>  


</body>
</html>