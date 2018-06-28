package com.zero.service.sys.spring;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.json.JsonObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zero.mapper.sys.SysConfigMapper;
import com.zero.pojo.sys.SysConfig;
import com.zero.pojo.sys.ZeroConfig;
import com.zero.service.sys.SysConfigService;
import com.zero.sys.IDGenerator;
import com.zero.util.DateUtil;

import net.sf.json.JSONObject;
@Service
public class SysConfigServiceImpl implements SysConfigService{
	
	@Autowired
	private SysConfigMapper sysConfigMapper;
	/**
	 * 将ZeroConfig对象转换为SysConfig列表
	 * @param config
	 * @return
	 */
	public List<SysConfig> ZeroToSysConfig(ZeroConfig config) {
		List<SysConfig> configs = new ArrayList();
		try {
			Class configClass = config.getClass();
			Field[] fields = configClass.getDeclaredFields();
			for (Field field : fields) {
				SysConfig sysConfig = new SysConfig();
				// 如果类型是String
			    if (field.getGenericType().toString().equals("class java.lang.String")) { // 如果type是类类型，则前面包含"class "，后面跟类名
			     // 拿到该属性的gettet方法
				     Method m = (Method)configClass.getMethod("get"+ getMethodName(field.getName()));
				     String val = (String) m.invoke(config);// 调用getter方法获取属性值
				     if(null!=val){
				    	 sysConfig.setFdType(field.getName());
					     sysConfig.setFdValue(val);
					     sysConfig.setFdId(IDGenerator.generateID());
					     sysConfig.setFdBak1(DateUtil.getDateTimeFormat(new Date()));
				     }else
				    	 sysConfig=null;
			    }
			    if(null!=sysConfig)
			    configs.add(sysConfig);
			}
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return configs;
	}
	//获取方法名
	private static String getMethodName(String fildeName) throws Exception{
	    byte[] items = fildeName.getBytes();
		items[0] = (byte) ((char) items[0] - 'a' + 'A');
		return new String(items);
	}
	@Override
	public int insert(ZeroConfig config) {
		// TODO Auto-generated method stub
		List<SysConfig> sysConfigs= ZeroToSysConfig(config);
		int i=0;
		if(sysConfigs.size()>0){
			i=sysConfigMapper.insertInfoBatch(sysConfigs);
		}
		return i;
	}
	@Override
	public String getValueByType(String fdType) {
		return sysConfigMapper.getValueByType(fdType);
	}
	/**
	 * 返回ZeroConfig对象
	 */
	@Override
	public JSONObject getZeroConfig() {
		JSONObject jsonObject = new JSONObject();
		ZeroConfig config = new ZeroConfig();
		Class configClass = config.getClass();
		try {
			Field[] fields = configClass.getDeclaredFields();
			for (Field field : fields) {
				String name = field.getName();
				// 如果类型是String
			    if (field.getGenericType().toString().equals("class java.lang.String")) { // 如果type是类类型，则前面包含"class "，后面跟类名
			    	field.setAccessible(true);
			    	field.set(config,getValueByType(name));
			    }
			}
			jsonObject = JSONObject.fromObject(config);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}


}
