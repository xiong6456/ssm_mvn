package com.zero.mapper.excel;

import com.zero.pojo.excel.Imptest;
import com.zero.pojo.excel.ImptestExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ImptestMapper {
    int countByExample(ImptestExample example);

    int deleteByExample(ImptestExample example);

    int insert(Imptest record);

    int insertSelective(Imptest record);

    List<Imptest> selectByExample(ImptestExample example);

    int updateByExampleSelective(@Param("record") Imptest record, @Param("example") ImptestExample example);

    int updateByExample(@Param("record") Imptest record, @Param("example") ImptestExample example);
    
    int insertInfoBatch(List record);
}