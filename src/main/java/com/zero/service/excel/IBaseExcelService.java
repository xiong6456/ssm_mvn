package com.zero.service.excel;

import java.io.InputStream;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Description 
 * @author Hevin*Xiong
 * @time 2018-2-6 下午7:17:29
 * @version 1.0.0
 */
public interface IBaseExcelService {
	public JSONObject importExcelInfo(InputStream in, MultipartFile file, String userId) throws Exception;
	public void eachExcelData(List<List<Object>> allExcelData, JSONObject tempJson);
	public void checkExcelData(int row, int col, Object checkExcelData, JSONObject tempJson);
	public void importResult(int row, int col, String msg, JSONObject tempJson);
	public String excelColIndexToStr(int columnIndex);
	public boolean successInfo(JSONObject tempJson, int allSize, int sSize);
	/**
	 * @Description 
	 * @return 
	 * @author Hevin*Xiong
	 * @param excelName 
	 * @time 2018-2-7 下午9:18:42
	 */
	public XSSFWorkbook exportExcelInfo(String excelName);
}
