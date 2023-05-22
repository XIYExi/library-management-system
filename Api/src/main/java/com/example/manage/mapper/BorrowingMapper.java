package com.example.manage.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.manage.pojo.Borrowing;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BorrowingMapper extends BaseMapper<Borrowing> {

    @Select("select * from borrowing where `delete` != 1 and `sno` = #{sno}")
    List<Borrowing> getBorrowingListBySno(String sno);

}
