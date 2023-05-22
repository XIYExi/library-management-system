package com.example.manage.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.manage.mapper.BookMapper;
import com.example.manage.pojo.Book;
import com.example.manage.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl extends ServiceImpl<BookMapper, Book> implements BookService {

    @Autowired
    private BookMapper bookMapper;

    @Override
    public int insertBook(Book book) {
        return bookMapper.insert(book);
    }

    @Override
    public IPage<Book> findAll(Page<Book> page) {
        return bookMapper.findAll(page);
    }

    @Override
    public List<Book> selectTitle(String bna) {
        List<Book> books = bookMapper.selectTitle(bna);
        if (books.size()!=0)
            return books;
        else
            return new ArrayList<Book>();
    }

    @Override
    public List<Book> selectRandByBno() {
        return bookMapper.selectRandByBno();
    }

    @Override
    public List<Book> selectBookForStu() {
        return bookMapper.selectBookForStu();
    }
}
