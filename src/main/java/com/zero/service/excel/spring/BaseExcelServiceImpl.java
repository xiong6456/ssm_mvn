package com.zero.service.excel.spring;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.zero.service.excel.IBaseExcelService;
import com.zero.util.ExcelBean;
import com.zero.util.ExcelUtil;

/**
 * @Description 
 * @author Hevin*Xiong
 * @time 2018-2-6 下午7:20:45
 * @version 1.0.0
 */
@Service
public class BaseExcelServiceImpl implements IBaseExcelService {

	/* (non-Javadoc)
	 * @see com.zero.service.excel.ExcelService#importExcelInfo(java.io.InputStream, org.springframework.web.multipart.MultipartFile)
	 */
	@Override
	public JSONObject importExcelInfo(InputStream in, MultipartFile file,String userId)
			throws Exception {
		List<List<Object>> allExcelData = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
		JSONObject tempJson = new JSONObject();
		eachExcelData(allExcelData,tempJson);
		//调用子类的导入操作
		
		return tempJson;
	}

	/* (non-Javadoc)
	 * @see com.zero.service.excel.ExcelService#eachExcelData(java.util.List)
	 */
	@Override
	public void eachExcelData(List<List<Object>> allExcelData, JSONObject tempJson) {
		String errorMsg = "";
		//遍历allExcelData
	    for (int i = 0; i < allExcelData.size(); i++) {  
	        List<Object> ob = allExcelData.get(i);
	        for (int j = 0; j < ob.size(); j++) {
	        	checkExcelData(i,j,ob.get(j),tempJson);
	        }
	    }
	}
	
	/* (non-Javadoc)
	 * @see com.zero.service.excel.ExcelService#checkExcelData(java.util.List)
	 */
	@Override
	public void checkExcelData(int row, int col, Object checkExcelData, JSONObject tempJson) {
		//调用子类的检验操作
		
	}

	/* (non-Javadoc)
	 * @see com.zero.service.excel.ExcelService#importResult()
	 */
	@Override
	public void importResult(int row, int col, String msg, JSONObject tempJson) {
		String colName = excelColIndexToStr(col);
		tempJson.put("第  "+ (row+1) +" 行，"+ colName +" 列 ：", msg+"。");
	}

	/* (non-Javadoc)
	 * @see com.zero.service.excel.ExcelService#excelColIndexToStr(int)
	 */
	@Override
	public String excelColIndexToStr(int columnIndex) {
        String columnStr = "";
        do {
            if (columnStr.length() > 0) {
                columnIndex--;
            }
            columnStr = ((char) (columnIndex % 26 + (int) 'A')) + columnStr;
            columnIndex = (int) ((columnIndex - columnIndex % 26) / 26);
        } while (columnIndex > 0);
        return columnStr;
	}

	/* (non-Javadoc)
	 * @see com.zero.service.excel.ExcelService#successInfo(net.sf.json.JSONObject)
	 */
	@Override
	public boolean successInfo(JSONObject tempJson,int allSize,int sSize) {
		if(tempJson.size()==0) {
			tempJson.put("导入完成：", "共有 "+ allSize +" 条记录,导入成功 "+sSize+" 条记录.");
			return true;
		}
		return false;
	}

	/* (non-Javadoc)
	 * @see com.zero.service.excel.IBaseExcelService#exportExcelInfo()
	 */
	@Override
	public XSSFWorkbook exportExcelInfo(String excelName) {
		 //根据条件查询数据，把数据装载到一个list中  
	    /*List<Salarymanage> list = salarymanageDao.selectApartInfo(salaryDate);  
	    for(int i=0;i<list.size();i++){  
	        //查询财务名字  
	        int adminId = list.get(i).getAdminId();  
	        String adminName = salarymanageDao.selectAdminNameById(adminId);  
	        list.get(i).setAdminName(adminName);  
	        list.get(i).setId(i+1);  
	    }  
	    List<ExcelBean> excel=new ArrayList<>();  
	    Map<Integer,List<ExcelBean>> map=new LinkedHashMap<>();  
	    XSSFWorkbook xssfWorkbook=null;
	    //设置标题栏  
	    excel.add(new ExcelBean("序号","id",0));  
	    excel.add(new ExcelBean("厂名","company",0));  
	    excel.add(new ExcelBean("工号","number",0));  
	    excel.add(new ExcelBean("姓名","name",0));  
	    excel.add(new ExcelBean("性别","sex",0));  
	    excel.add(new ExcelBean("开户名","cardName",0));  
	    excel.add(new ExcelBean("银行卡号","bankCard",0));  
	    excel.add(new ExcelBean("开户行","bank",0));  
	    excel.add(new ExcelBean("金额","money",0));  
	    excel.add(new ExcelBean("备注","remark",0));  
	    map.put(0, excel);  
	    String sheetName = excelName + "月份收入";  
	    //调用ExcelUtil的方法  
	    xssfWorkbook = ExcelUtil.createExcelFile(Salarymanage.class, list, map, sheetName);  */
	    return null; 
	}

}
