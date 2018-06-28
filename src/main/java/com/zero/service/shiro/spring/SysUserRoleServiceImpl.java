package com.zero.service.shiro.spring;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zero.mapper.shiro.SysUserRoleMapper;
import com.zero.pojo.excel.Imptest;
import com.zero.pojo.shiro.SysUserRole;
import com.zero.pojo.shiro.SysUserRoleExample;
import com.zero.pojo.shiro.SysUserRoleExample.Criteria;
import com.zero.service.shiro.SysUserRoleService;
import com.zero.sys.IDGenerator;
import com.zero.util.JSONUtil;

/**
 * @Description
 * @author Hevin*Xiong
 * @time 2018-2-28 下午7:29:15
 * @version 1.0.0
 */
@Service
public class SysUserRoleServiceImpl implements SysUserRoleService {
	@Autowired
	private SysUserRoleMapper sysUserRoleMapper;

	@Override
	public String update(String fdRoleId, String[] fdUserIds) {
		JSONObject jsonObject = new JSONObject();
		try {
			SysUserRoleExample tSysUserRoleExample = new SysUserRoleExample();
			Criteria criteria = tSysUserRoleExample.createCriteria();
			criteria.andFdRoleIdEqualTo(fdRoleId);
			sysUserRoleMapper.deleteByExample(tSysUserRoleExample);

			List<SysUserRole> mSysUserRole = new ArrayList<SysUserRole>();
			if(fdUserIds != null) {
				for (String fdUserId : fdUserIds) {
					SysUserRole tSysUserRole = new SysUserRole();
					tSysUserRole.setFdId(IDGenerator.generateID());
					tSysUserRole.setFdUserId(fdUserId);
					tSysUserRole.setFdRoleId(fdRoleId);

					mSysUserRole.add(tSysUserRole);
				}
				sysUserRoleMapper.insertInfoBatch(mSysUserRole);
			}
			
			jsonObject.put("flag", "success");
			jsonObject.put("msg", "保存成功！");
		} catch (Exception e) {
			jsonObject.put("flag", "error");
			jsonObject.put("msg", "保存失败，原因是：" + e.getMessage());
		}
		return jsonObject.toString();
	}

}
