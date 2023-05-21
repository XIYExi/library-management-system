package com.example.manage.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.manage.pojo.Book;

import java.util.List;

public interface BookService extends IService<Book> {

    public abstract int insertBook(Book book);

    IPage<Book> findAll(Page<Book> page);

    List<Book> selectTitle(String bna);
}
