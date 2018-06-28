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
<script type="text/javascript" src="../zero/customer/customerSpread.js"></script>
<div class="easyui-layout" data-options="fit:true">
 	<!-- Begin of toolbar -->
    <div id="customer-toolbar-inp">
        <div class="zero-toolbar-button">
        	<a href="#" class="easyui-linkbutton" iconCls="icon-add" onclick="postCustomer()" plain="true">推荐客户资料</a>
         	<a href="#" class="easyui-linkbutton" iconCls="icon-edit" onclick="openEditCustomer()" plain="true">修改</a>
         	<a href="#" class="easyui-linkbutton" iconCls="icon-reload" onclick="reloadCustomer()" plain="true">刷新</a>
         	<a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="backCustomer()" plain="true">被返回数据</a>
	         <span id="countMsg" class="datagrid-toolbar"  width="1000px"/> 
        </div>
        <form name="searchform" method="post" id ="customer_searchform">
		    <td height="30">
		       	<label>肌肤问题：</label><input type="text" id="fdStatusBox" name="fdSkinProblem" class="easyui-combotree"
                		data-options="url:contextPath+'/sysCode/select?codeType=skintype'" style="width:160px" />
	            <label>姓 名：</label>
	            <input class="easyui-textbox" id="fdNameBox" name="fdName" style="width:100px"
	            		data-options="prompt:'请输入姓名',events:'{blur:selectBox}'"/>
	            <label>电 话：</label>
	            <input class="easyui-textbox" id="fdPhoneBox" name="fdPhone" style="width:100px"
	            		data-options="prompt:'请输入电话',events:'{blur:selectBox}'"/>
	            <label>QQ：</label>
	            <input class="easyui-textbox" id="fdQQBox" name="fdQq" style="width:100px"
	            		data-options="prompt:'请输入QQ',events:'{blur:selectBox}'"/>
	            <label>微 信：</label>
	            <input class="easyui-textbox" id="fdWechatBox" name="fdWechat" style="width:100px"
	            		data-options="prompt:'请输入微信',events:'{blur:selectBox}'"/>
	            	<a id="customer_search" href="#" class="easyui-linkbutton" onclick="selectsubmit()" iconCls="icon-search">查询</a>
		    </td>
		 </form>
    </div>
     
    <!-- End of toolbar -->
 	<table id="customer-datagrid-inp" class="easyui-datagrid" toolbar="#customer-toolbar-inp"></table>
</div>  

<!-- Begin of easyui-dialog -->
<div id="customer-dialog-inp" class="easyui-dialog" data-options="closed:true,iconCls:'icon-save'" style="width:400px; padding:10px;">
	<form id="customer-form-inp" method="post">
        <table>
        	<tr style="display:none">
                <td align="right">客户ID:</td>
                <td><input type="text" id="fdId" name="fdId"/></td>
            </tr>
            <tr>
                <td align="right">姓 名:</td>
                <td><input type="text" id="fdName" name="fdName" class="zero-text" style="height:23px" /></td>
            </tr>
            <tr>
                <td align="right">性 别:</td>
                <td><input type="text" id="fdSex" name="fdSex" class="zero-text" style="height:23px" /></td>
            </tr>
            <tr>
                <td align="right">电 话:</td>
                <td><input type="text" id="fdPhone" name="fdPhone" class="zero-text" style="height:23px" /></td>
            </tr>
            <tr>
                <td align="right">QQ:</td>
                <td><input type="text" id="fdQq" name="fdQq" class="zero-text" style="height:23px" /></td>
            </tr>
            <tr>
                <td align="right">微 信:</td>
                <td><input type="text" id="fdWechat" name="fdWechat" class="zero-text" style="height:23px" /></td>
            </tr>
            <tr style="display:none">
                <td align="right">销售状态ID:</td>
                <td><input type="text" id="fdStatus" name="fdStatus"/></td>
            </tr>
            <tr style="display:none">
                <td align="right">是否为推广后台修改:</td>
                <td><input type="text" id="fdBak2" name="fdBak2" /></td>
            </tr>
             <tr>
                <td align="right">肌肤问题:</td>
                <td><input type="text" id="fdSkinProblem" name="fdSkinProblem" style="width:260px;height:23px" class="easyui-combobox" 
                		 data-options="valueField:'id',textField:'text',url:contextPath+'/sysCode/select?codeType=skintype'"/></td>
            </tr>
        </table>
    </form>
</div>
<!-- End of easyui-dialog -->

<form id="post-customer" method="post">
	<input type="hidden" id="fdSaleId" name="fdSaleId" class="zero-text" style="height:23px" /></td>
 	<input type="hidden" id="fdSaleName" name="fdSaleName" class="zero-text" style="height:23px" /></td>
</form>
 

<!-- 弹框选择用户列表 -->
 
<div id="tongji_ranking_dialog" class="easyui-window" title="用户列表" data-options="modal:true,closed:true,iconCls:'icon-save',top:0,resizable:false,collapsible:false,minimizable:false,maximizable:false" style="width:700px;height:390px;padding:5px;top:200px;">  
          <div class="easyui-layout" data-options="fit:true">
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