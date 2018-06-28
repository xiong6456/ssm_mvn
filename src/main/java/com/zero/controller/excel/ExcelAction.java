package com.zero.controller.excel;

import java.beans.IntrospectionException;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.zero.pojo.shiro.SysUser;
import com.zero.service.excel.IBaseExcelService;
import com.zero.sys.SpringContextUtil;

/**
 * @Description
 * @author Hevin*Xiong
 * @time 2018-1-28 下午2:05:11
 * @version 1.0.0
 */
@Controller
@RequestMapping("/excel")
public class ExcelAction {
	// @Autowired
	// Class clazzService;

	private static final Logger logger = Logger.getLogger(ExcelAction.class);

	@ResponseBody
	@RequestMapping(value = "/importFile", method = RequestMethod.POST)
	public Object importFile(HttpServletRequest request, Model model)
			throws Exception {
		Subject subject = SecurityUtils.getSubject();
		SysUser tSysUser = (SysUser)subject.getSession().getAttribute("userInfo");
		JSONObject jsonObject = new JSONObject();
		try {
			// 获取上传的文件
			MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
			MultipartFile file = multipart.getFile("excelFile");
			String importPath = request.getSession().getServletContext()
					.getRealPath("/")
					+ "template/" + file.getOriginalFilename();
			importPath = importPath.replace('\\', '/');
			File temp = new File(importPath);
			if (temp.exists()) {
				temp.delete();
			}
			String ServiceName = request.getParameter("ServiceName");
			IBaseExcelService baseExcelService = (IBaseExcelService) SpringContextUtil
					.getBean(ServiceName);
			file.transferTo(new File(importPath));
			InputStream in = file.getInputStream();
			// 数据导入
			jsonObject = baseExcelService.importExcelInfo(in, file,tSysUser.getFdId());
		} catch (Exception e) {
			logger.info(e.getMessage());
			jsonObject.put("message", e.getMessage());

		}
		return jsonObject;
	}

	@RequestMapping("/export")
	public @ResponseBody
	void export(HttpServletRequest request, HttpServletResponse response)
			throws ClassNotFoundException, IntrospectionException,
			IllegalAccessException, ParseException, InvocationTargetException {
		String ExcelName = request.getParameter("ExcelName");
		response.reset(); // 清除buffer缓存
		Map<String, Object> map = new HashMap<String, Object>();
		// 指定下载的文件名
		response.setHeader("Content-Disposition", "attachment;filename="
				+ ExcelName + ".xlsx");
		response.setContentType("application/vnd.ms-excel;charset=UTF-8");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		XSSFWorkbook workbook = null;
		// 导出Excel对象
		String ServiceName = request.getParameter("ServiceName");
		IBaseExcelService baseExcelService = (IBaseExcelService) SpringContextUtil
				.getBean(ServiceName);
		workbook = baseExcelService.exportExcelInfo(ExcelName);
		OutputStream output;
		try {
			output = response.getOutputStream();
			BufferedOutputStream bufferedOutPut = new BufferedOutputStream(
					output);
			bufferedOutPut.flush();
			workbook.write(bufferedOutPut);
			bufferedOutPut.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/excelOut")
	public void excelStandardTemplateOut(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("UTF-8");
		String fileName = request.getParameter("fdTemplateName");
		fileName = new String(fileName.getBytes("ISO-8859-1"), "UTF-8");
		String filePath = request.getSession().getServletContext()
				.getRealPath("/");
		filePath = filePath + "/template/" + fileName; // Excel模板所在的路径.
		filePath = filePath.replace('\\', '/');
		File f = new File(filePath);
		// 设置response参数，可以打开下载页面
		response.reset();
		response.setContentType("application/vnd.ms-excel;charset=utf-8");
		try {
			response.setHeader("Content-Disposition", "attachment;filename="
					+ new String((fileName).getBytes("gbk"), "iso-8859-1")); // 下载文件的名称
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		ServletOutputStream out = response.getOutputStream();
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		try {
			bis = new BufferedInputStream(new FileInputStream(f));
			bos = new BufferedOutputStream(out);
			byte[] buff = new byte[2048];
			int bytesRead;
			while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
				bos.write(buff, 0, bytesRead);
			}
		} catch (final IOException e) {
			throw e;
		} finally {
			if (bis != null)
				bis.close();
			if (bos != null)
				bos.close();
		}
	}
}
