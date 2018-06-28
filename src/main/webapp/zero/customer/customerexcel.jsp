<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>

<html>
  <head>
    <title>导入测试</title>
  </head>
  
  <body>
 	<jsp:include page="/resource/excel/importexcel.jsp">
		<jsp:param name="docSubject" value="客户导入"/>
		<jsp:param name="fdTemplateName" value="客户导入模板.xlsx"/>
		<jsp:param name="ServiceName" value="customerServiceImpl"/>
	</jsp:include>
  </body>
</html>