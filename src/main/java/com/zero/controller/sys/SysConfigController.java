package com.zero.controller.sys;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zero.pojo.sys.ZeroConfig;
import com.zero.service.sys.SysConfigService;
import com.zero.service.sys.SysCodeService;

import net.sf.json.JSONObject;

/**
 * 参数
 * @author 12959
 *
 */
@Controller
@RequestMapping("/sysConfig")
public class SysConfigController {
	private static final Logger logger = LoggerFactory
			.getLogger(SysConfigController.class);
	
	@Autowired
    private SysConfigService sysConfigService;
	
	@ResponseBody
	@RequestMapping("/select")
    public String select(String type, HttpServletResponse response){
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject = sysConfigService.getZeroConfig();
		} catch (Exception e) {
			logger.info("查询失败，原因是：" + e.getMessage());
		}
		return jsonObject.toString();
    }
	

	@ResponseBody
	@RequestMapping("/insert")
    public String insert(ZeroConfig config){
		JSONObject jsonObject = new JSONObject();
		int i = sysConfigService.insert(config);
		if(i>0){
			jsonObject.put("flag", "success");
			jsonObject.put("msg", "参数配置成功！");
		}else{
			jsonObject.put("flag", "error");
			jsonObject.put("msg", "参数配置失败！");
		}
		return jsonObject.toString();
    }
}
