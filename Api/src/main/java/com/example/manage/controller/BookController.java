package com.example.manage.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.manage.controller.vo.BookInsertVo;
import com.example.manage.pojo.Book;
import com.example.manage.service.impl.BookServiceImpl;
import com.example.manage.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookServiceImpl bookService;

    @PostMapping("/insert")
    public R insert(@RequestBody List<BookInsertVo> vos){
        for(BookInsertVo vo : vos){
            Book book = new Book();
            book.setBna(vo.getBna());
            book.setBda(vo.getBda());
            book.setBpu(vo.getBpu());
            book.setBpl(vo.getBpl());
            book.setBnu(vo.getBnu());
            try{
                bookService.insertBook(book);
            }
            catch (Exception e){
                System.out.println(e);
                return R.ok().data("res", "error");
            }
        }

        return R.ok().data("res", "ok");
    }

    @GetMapping("/list/{current}/{limit}")
    public R list(@PathVariable("current") Integer current,
                  @PathVariable("limit") Integer limit){
        Page<Book> page = new Page<>(current,limit);
        IPage<Book> all = bookService.findAll(page);
        return R.ok().data("list", all);
    }


    @PostMapping("/updateById")
    public R updateById(@RequestBody Book book){
        boolean b = bookService.updateById(book);
        if(b)
            return R.ok().data("res", "ok");
        else
            return R.ok().data("res","error");
    }

    @PostMapping("/deleteById")
    public R deleteById(@RequestParam("id") String id){
        // System.out.println(id);
        Long deleteById =Long.parseLong(id);
        boolean remove = bookService.removeById(deleteById);
        if(remove)
            return R.ok().data("res", "ok");
        else
            return R.ok().data("res", "error");
    }

    @PostMapping("/searchTitle")
    public R searchTitle(@RequestParam("bna") String bna){
        List<Book> books = bookService.selectTitle(bna);

        return R.ok().data("res", books);
    }

    @PostMapping("/insertManuel")
    public R insertManuel(@RequestBody BookInsertVo vo){
        Book book = new Book();
        book.setBna(vo.getBna());
        book.setBda(vo.getBda());
        book.setBpu(vo.getBpu());
        book.setBpl(vo.getBpl());
        book.setBnu(vo.getBnu());
        int i;
        try{
            i = bookService.insertBook(book);
        }
        catch (Exception e){
            System.out.println(e);
            return R.ok().data("res", "error");
        }

        if(i == 0)
            return R.ok().data("res", "error");
        else
            return R.ok().data("res", "ok");
    }

    @GetMapping("/selectBookForStu")
    public R selectBookForStu(){

        List<Book> books = bookService.selectBookForStu();
        if(books.size() != 0)
            return R.ok().data("res", books);
        else
            return R.ok().data("res",new ArrayList<Book>());
    }

    @PostMapping("/searchById")
    public R searchById(@RequestParam("id")String id){
        Long _id = Long.parseLong(id);
        Book bookServiceById = bookService.getById(_id);

        if(bookServiceById != null){
            return R.ok().data("res",bookServiceById);
        }
        else
            return R.ok().data("res", new Book());
    }

}
