<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String loginRes = (String)session.getAttribute("loginRes");
	if(loginRes == null){
		loginRes = "";
	}
 %>
<html>
<head>
<title>登录页面</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/css/bootstrap.min.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resource/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<style type="text/css">
.form-sign {
	max-width: 300px;
	padding: 15px;
	margin: 0 auto;
}

input {
	margin-bottom: 3px;
}

.content{
		position: relative;
		top: 90px;
		left: 500px;
		width:300px;
		height:300px;
	}
.imgShow{
	background-image: url('${pageContext.request.contextPath}/common/images/art.jpg');
  	background-repeat: no-repeat;  
	background-size: 100% 100%;
}
</style>
</head>

<body class="imgShow">
	<div class="content">
		<form class="form-signin" action="${pageContext.request.contextPath}/shiro/login" method="post">
			<h2 class="form-signin-heading" style="text-align:center">欢迎登录</h2>
			<div class="control">
				<input type="text" class="form-control" name="fdLoginName"
					placeholder="用户名" required autofocus />
			</div>
			<div class="control">
				<input type="password" class="form-control" name="fdPassword"
					placeholder="密码" required />
			</div>
			<div class="login-button text-center">
				<button type="submit" class="btn btn-lg btn-primary btn-block">登录</button>
			<h5 style="color:red"><strong><%=loginRes %></strong></h5>
			</div>
		</form>
	</div>
</body>
</html>
