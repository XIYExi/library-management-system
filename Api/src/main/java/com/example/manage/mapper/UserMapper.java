package com.example.manage.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.manage.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper<User> {

    @Select("select * from `user` where `delete` != 1 and `type` = 1")
    public abstract List<User> getAllUsers();

    @Select("select * from `user` where sna like concat('%', #{sna}, '%') and `delete` != 1  and `sno` = '0'")
    public abstract List<User> selectBySna(String sna);

    @Select("select * from user where `delete` != 1 and sno != '0' order by RAND() limit 10")
    public abstract List<User> selectRandomBySno();

}
