package com.example.manage.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.manage.pojo.Book;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BookMapper extends BaseMapper<Book> {

    @Select("select * from book where `delete` != 1")
    IPage<Book> findAll(Page page);

    @Select("select * from book where `bna` like concat('%', #{bna}, '%') and `delete` != 1")
    List<Book> selectTitle(String bna);

    /**
     * bnu 至少为1，所以可以大胆 -1
     * @return List<Book>
     */
    @Select("select * from book where `delete` != 1 and `bnu` > 0 order by RAND() limit 10")
    List<Book> selectRandByBno();

    @Select("select * from book where `delete` != 1 and `bnu` > 0")
    public abstract List<Book> selectBookForStu();
}
