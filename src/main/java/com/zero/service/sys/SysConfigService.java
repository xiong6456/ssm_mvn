package com.zero.service.sys;


import com.zero.pojo.sys.ZeroConfig;

import net.sf.json.JSONObject;

public interface SysConfigService {
	int insert(ZeroConfig config);
	String getValueByType(String fdType);
	public JSONObject getZeroConfig();
}
