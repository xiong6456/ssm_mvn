<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018-6-19
  Time: 19:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>BootStrap Table使用</title>
    <%--1、Jquery组件引用--%>
    <script src="/common/js/jquery-2.1.3.min.js"></script>

    <%--2、bootstrap组件引用--%>
    <script src="/resource/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    <link href="/resource/bootstrap-3.3.7-dist/css/bootstrap.css" rel="stylesheet" />

    <%--3、bootstrap table组件以及中文包的引用--%>
    <script src="/resource/bootstrap-3.3.7-dist/bootstrap-table/bootstrap-table.js"></script>
    <link href="/resource/bootstrap-3.3.7-dist/bootstrap-table/bootstrap-table.css" rel="stylesheet" />
    <script src="/resource/bootstrap-3.3.7-dist/bootstrap-table/locale/bootstrap-table-zh-CN.js"></script>

    <%--4、页面Js文件的引用--%>
    <script src="./table.js"></script>
</head>
<body>
<div class="panel-body" style="padding-bottom:0px;">
    <div class="panel panel-default">
        <div class="panel-heading">查询条件</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="txt_search_departmentname">部门名称</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="txt_search_departmentname">
                    </div>
                    <label class="control-label col-sm-1" for="txt_search_statu">状态</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="txt_search_statu">
                    </div>
                    <div class="col-sm-4" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_query" class="btn btn-primary">查询</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div id="toolbar" class="btn-group">
        <button id="btn_add" type="button" class="btn btn-default">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
        </button>
        <button id="btn_edit" type="button" class="btn btn-default">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
        </button>
        <button id="btn_delete" type="button" class="btn btn-default">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
        </button>
    </div>
    <table id="tb_departments"></table>
</div>
</body>
</html>
