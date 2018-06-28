package com.zero.sys;

import java.lang.annotation.Annotation;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * @Description 权限核心过滤器
 * @author Hevin*Xiong
 * @time 2018-3-22 下午1:00:14
 * @version 1.0.0
 */
public class PermissionInterceptorAdapter extends HandlerInterceptorAdapter {
	private static final Logger logger = LoggerFactory
			.getLogger(PermissionInterceptorAdapter.class);

	/*@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		Class<SimpleAuthorizationInfo> annotationType = SimpleAuthorizationInfo.class;
		handlerMethod.getMethodAnnotation(Class<SimpleAuthorizationInfo>);
		SimpleAuthorizationInfo checkPermission = handlerMethod.getMethodAnnotation(annotationType);
		long time = new java.util.Date().getTime();
		boolean isPermissioin = false;
		Subject currentUser = SecurityUtils.getSubject();
		// 没有获得注解 及不需要权限-- 则直接运行
		if (null != checkPermission) {
			Set<String> permission = checkPermission.getStringPermissions();
			for (String per : permission) {
				// 当前登录人 具有权限
				if (currentUser.isPermitted(per)) {
					isPermissioin = true;
					break;
				}
			}
		} else {
			isPermissioin = true;
		}

		logger.info("拦截到了mvc方法:" + handlerMethod.getMethod() + "方法所用时间：" + time + "到"
				+ new java.util.Date().getTime());
		if (isPermissioin) {
			// 有执行方法或权限不拦截
			return true;
		} else {
			// 跳到权限不足页面
			throw new AuthorizationException();
		}
	}*/
}
