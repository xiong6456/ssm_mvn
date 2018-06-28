package com.zero.service.test.spring;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.zero.mapper.excel.ImptestMapper;
import com.zero.pojo.excel.Imptest;
import com.zero.service.excel.spring.BaseExcelServiceImpl;
import com.zero.service.test.TestExcelService;
import com.zero.sys.IDGenerator;
import com.zero.util.ExcelUtil;

/**
 * @Description 
 * @author Hevin*Xiong
 * @time 2018-2-6 下午7:46:27
 * @version 1.0.0
 */
@Service
public class TestExcelServiceImpl extends BaseExcelServiceImpl implements TestExcelService {
	@Autowired
	private ImptestMapper imptestDao;
	/* (non-Javadoc)
	 * @see com.zero.service.excel.ExcelService#importExcelInfo(java.io.InputStream, org.springframework.web.multipart.MultipartFile)
	 */
	@Override
	public JSONObject importExcelInfo(InputStream in, MultipartFile file,String userId) throws Exception {
		List<List<Object>> allExcelData = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
		JSONObject tempJson = new JSONObject();
//		eachExcelData(allExcelData,tempJson);
		//调用子类的导入操作
		int size=0;
		List<Imptest> salaryList = new ArrayList<Imptest>();  
	    //遍历listob数据，把数据放到List中  
	    for (int i = 0; i < allExcelData.size(); i++) {  
	        List<Object> ob = allExcelData.get(i);
	        Imptest imptest = new Imptest();  
	        for (int j = 0; j < ob.size(); j++) {
//	        	checkExcelData(i, j, ob.get(j), tempJson);
		        //设置编号  
		        imptest.setFdId(IDGenerator.generateID());  
		        //通过遍历实现把每一列封装成一个model中，再把所有的model用List集合装载  
		        imptest.setFdName(String.valueOf(ob.get(0)));  
		        imptest.setFdSex(String.valueOf(ob.get(1))); 
	        }
	         
	        salaryList.add(imptest);  
	    }  
	    if(tempJson.size()==0){
	    	//批量插入  
		    imptestDao.insertInfoBatch(salaryList);
		    super.successInfo(tempJson, allExcelData.size(),size);
	    }
		
		return tempJson;
	};
	
	/* (non-Javadoc)
	 * @see com.zero.service.excel.spring.ExcelServiceImpl#checkExcelData(int, int, java.lang.Object, net.sf.json.JSONObject)
	 */
	@Override
	public void checkExcelData(int row, int col, Object checkExcelData,
			JSONObject tempJson) {
		String tStr = (String)checkExcelData;
		if(col==0){
			checkUser(row,col,tStr,tempJson);
		}
		if(col==1){
			checkPsw(row,col,tStr,tempJson);
		}
	}

//	检验第一列用户名不能为空
	public void checkUser(int row, int col,String tStr,JSONObject tempJson) {
		super.importResult(row, col, "用户名不能为空", tempJson);
	}
//	检验第二列密码不能为空
	public void checkPsw(int row, int col,String tStr,JSONObject tempJson) {
		super.importResult(row, col, "密码不能为空", tempJson);
	}
}
