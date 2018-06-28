package com.zero.util;

import java.io.ByteArrayInputStream;
import java.io.UnsupportedEncodingException;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

/**
 * @Description 自定义typehandler，解决mybatis存储blob字段后，出现乱码的问题 配置mapper.xml：
 * @author Hevin*Xiong
 * @time 2018-3-25 下午8:50:53
 * @version 1.0.0
 */
public class ConvertBlobTypeHandler extends BaseTypeHandler<Object> {
	// ###指定字符集
	private static final String DEFAULT_CHARSET = "utf-8";

	@Override
	public String getNullableResult(ResultSet rs, String columnName)
			throws SQLException {
		Blob blob = rs.getBlob(columnName);
		byte[] returnValue = null;
		if (null != blob) {
			returnValue = blob.getBytes(1, (int) blob.length());
		}
		try {
			// ###把byte转化成string
			return new String(returnValue, DEFAULT_CHARSET);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException("BlobEncodingError!");
		}
	}

	@Override
	public String getNullableResult(CallableStatement cs, int columnIndex)
			throws SQLException {
		Blob blob = cs.getBlob(columnIndex);
		byte[] returnValue = null;
		if (null != blob) {
			returnValue = blob.getBytes(1, (int) blob.length());
		}
		try {
			return new String(returnValue, DEFAULT_CHARSET);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException("BlobEncodingError!");
		}

	}

	@Override
	public String getNullableResult(ResultSet arg0, int arg1) throws SQLException {
		// TODOAuto-generatedmethodstub
		return null;

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.ibatis.type.BaseTypeHandler#setNonNullParameter(java.sql.
	 * PreparedStatement, int, java.lang.Object,
	 * org.apache.ibatis.type.JdbcType)
	 */
	@Override
	public void setNonNullParameter(PreparedStatement ps, int i,
			Object parameter, JdbcType jdbcType) throws SQLException {
		ByteArrayInputStream bis;
		String param;
		try {
			param = (String) parameter;
			// ###把String转化成byte流
			bis = new ByteArrayInputStream(param.getBytes(DEFAULT_CHARSET));
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException("BlobEncodingError!");
		}
		ps.setBinaryStream(i, bis, param.length());

	}
}
