package com.zero.sys;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map.Entry;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.zero.pojo.sys.ColumnInfo;

/**
 * @Description
 * @author Hevin*Xiong
 * @time 2018-3-20 下午8:42:19
 * @version 1.0.0
 */
public class EasyUIDataGridUtil {

	/**
	 * <p>动态拼接DataGrid：</p>
	 * @Description
	 * @author Hevin*Xiong
	 * @time 2018-3-20 下午7:48:12
	 */
	public static String appendDataGrid(List<LinkedHashMap<String, Object>> datainfo,String... args) {
		JSONArray jsonArray = null;
		JSONObject tJSONObject = new JSONObject();
		if(datainfo.size() == 0){
			tJSONObject.put("column", "[[]]");
			tJSONObject.put("data", "[]");
			return tJSONObject.toString();
		}
		LinkedHashMap<String, Object> tSumBef = new LinkedHashMap<String, Object>();
		List<ColumnInfo> list = null;
		List<List<ColumnInfo>> tmList = new ArrayList<List<ColumnInfo>>();
		for (LinkedHashMap<String, Object> linkedHashMap : datainfo) {
			int i=0;
			list = new ArrayList<ColumnInfo>();
			Iterator<?> iter = linkedHashMap.entrySet().iterator();
			while(iter.hasNext()) {
				Entry<?, ?> entry = (Entry<?, ?>) iter.next();
				String keyStr = (String)entry.getKey();
				String valueStr = "";
				if(entry.getValue() != null){
					valueStr = entry.getValue().toString();
				}
				appendColumn((String)entry.getKey(),list);
				if(args[0]!=null){
					appendSum(tSumBef,keyStr,valueStr,i,args);
				}
				i++;
			}
		}
		
		if(tSumBef.size()!=0){
			datainfo.add(tSumBef);
		}
		
		Collections.reverse(list);
		tmList.add(list);
		//列名
		jsonArray = JSONArray.fromObject(tmList);
		String column = jsonArray.toString();
		//数据
		jsonArray = JSONArray.fromObject(datainfo);
		String data = jsonArray.toString();
		
		tJSONObject.put("column", column);
		tJSONObject.put("data", data);
		return tJSONObject.toString();
	}
	
	/**
	 * <p>组装表格头：</p>
	 * @Description
	 * @author Hevin*Xiong
	 * @time 2018-3-20 下午7:48:12
	 */
	public static void appendColumn(String column, List<ColumnInfo> list) {
		ColumnInfo info = new ColumnInfo();// 固定的第一列，如没有，则不需要
		info.setTitle(column);
		info.setField(column);
		info.setWidth(120);
		info.setAlign("center");
		list.add(0, info);
	}
	
	/**
	 * <p>汇总拼接</p>
	 * @Description
	 * @author Hevin*Xiong
	 * @time 2018-3-20 下午7:48:12
	 */
	public static void appendSum(LinkedHashMap<String, Object> tSumBef,String key,String value,int i,String... args) {
		if(args[i]==null){
			int tempSum = 0;
			Object object = tSumBef.get(key);
			if(object!=null){
				tempSum = Integer.parseInt(tSumBef.get(key).toString());
			}
			tempSum += Integer.parseInt(value);
			tSumBef.put(key, tempSum);
		}else{
			tSumBef.put(key, args[i]);
		}
	}
}
