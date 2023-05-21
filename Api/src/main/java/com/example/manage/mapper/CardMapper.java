package com.example.manage.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.manage.pojo.Card;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper
public interface CardMapper extends BaseMapper<Card> {

    @Select("select * from card where `delete` != 1")
    IPage<Card> findAll(Page page);

    @Select("select * from card where `sna` like concat('%', #{sna}, '%') and `delete` != 1")
    List<Card> findBySna(String sna);
}
