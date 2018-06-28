package com.zero.pojo.sys;
/**
 * 参数配置类
 * @author 12959
 *
 */

public class ZeroConfig {
    /**
     * private ZeroConfig(){}
	
	private static ZeroConfig instance = new ZeroConfig();
	
	public static ZeroConfig newInstance(){
		return instance;
	}
     * 
     * 
     */
	
	/**
	 * 客户资料每日索取总数
	 */
    private String dayCount;
    
    /**
     * 客户资料每次索取数量
     */
    private String dayAvg;
    
    /**
     * 返回资料重新返回时间
     */
    private String dayBack;

	public String getDayCount() {
		return dayCount;
	}

	public void setDayCount(String dayCount) {
		this.dayCount = dayCount;
	}

	public String getDayAvg() {
		return dayAvg;
	}

	public void setDayAvg(String dayAvg) {
		this.dayAvg = dayAvg;
	}

	public String getDayBack() {
		return dayBack;
	}

	public void setDayBack(String dayBack) {
		this.dayBack = dayBack;
	}

	
    
}