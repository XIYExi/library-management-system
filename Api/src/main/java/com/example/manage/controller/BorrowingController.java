package com.example.manage.controller;

import com.example.manage.controller.vo.BorrowVo;
import com.example.manage.controller.vo.BorrowingMsgVo;
import com.example.manage.controller.vo.ReturnBookVo;
import com.example.manage.pojo.Book;
import com.example.manage.pojo.Borrowing;
import com.example.manage.pojo.Card;
import com.example.manage.pojo.User;
import com.example.manage.service.BookService;
import com.example.manage.service.impl.BookServiceImpl;
import com.example.manage.service.impl.BorrowingServiceImpl;
import com.example.manage.service.impl.CardServiceImpl;
import com.example.manage.service.impl.UserServiceImpl;
import com.example.manage.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/borrowing")
public class BorrowingController {

    @Autowired
    private BorrowingServiceImpl borrowingService;

    @Autowired
    private CardServiceImpl cardService;

    @Autowired
    private BookServiceImpl bookService;

    @GetMapping("/insertList")
    public R insertList(){

        List<Card> cards = cardService.selectRand();
        List<Book> books = bookService.selectRandByBno();

        for(int i = 0;i<cards.size();++i){
            Borrowing borrowing = new Borrowing();
            borrowing.setSno(cards.get(i).getSno());
            borrowing.setBno(books.get(i).getId());
            // borrowing.setExpire(new Date());
            Date date = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.DATE, 30); // 过期时间是当前时间+30天
            borrowing.setExpire(calendar.getTime());

            boolean save = borrowingService.save(borrowing);
            if(!save)
                return R.ok().data("res", "borrowing添加失败");

            // 更新card中now+1 并且要使now < sup
            Card newCard = new Card();
            newCard.setSno(cards.get(i).getSno());
            newCard.setNow(cards.get(i).getNow() + 1);
            boolean b = cardService.updateById(newCard);

            if(!b)
                return R.ok().data("res", "借阅记录写入Card表异常");

            // 更新图书， bnu - 1，实现在库数量-1
            Book newBook = new Book();
            newBook.setId(books.get(i).getId());
            newBook.setBnu(books.get(i).getBnu() - 1);
            boolean b1 = bookService.updateById(newBook);
            if(!b1)
                return R.ok().data("res", "借阅记录更新Book表异常");
        }

        return R.ok().data("res", "ok");
    }

    @GetMapping("/getMyBorrowing")
    public R getMyBorrowing(@RequestParam("sno") String sno){
        List<BorrowingMsgVo> borrowingListBySno = borrowingService.getBorrowingListBySno(sno);

        return R.ok().data("res", borrowingListBySno);
    }

    @PostMapping("/returnBook")
    public R returnBook(@RequestBody ReturnBookVo vo){
        System.out.println(vo);
        // 得到借书记录的工号id
        Long id = Long.parseLong(vo.getId());
        // 得到card的id sno
        String sno = vo.getSno();
        // 得到book的id
        Long bno = Long.parseLong(vo.getBno());

        // 先在book中把当前数量bnu + 1
        Book bookServiceById = bookService.getById(bno);
        System.out.println(bookServiceById);
        Book newBook = new Book();
        newBook.setId(bno);
        newBook.setBnu(bookServiceById.getBnu() + 1);
        boolean b = bookService.updateById(newBook);
        if(!b)
            return R.ok().data("res", "更新书库数量错误");

        // 把card中当前借书数量now - 1
        Card cardById = cardService.getById(sno);
        Card newCard = new Card();
        newCard.setSno(sno);
        newCard.setNow(cardById.getNow() - 1);
        boolean b1 = cardService.updateById(newCard);
        if(!b1)
            return R.ok().data("res", "更新card借阅数量错误");

        // 删除当前借阅记录
        boolean remove = borrowingService.removeById(id);
        if (!remove)
            return R.ok().data("res", "删除借阅记录错误");

        return R.ok().data("res", "ok");
    }

    @PostMapping("/borrow")
    public R borrow(@RequestBody BorrowVo vo){

        System.out.println(vo);

        // 获得图书id
        Long bno =vo.getId();
        // 获得card的id sno
        String sno = vo.getSno();

        // 查询当前图书是否可以借
        // 能查到就说明数量大于0
        Book bookServiceById = bookService.getById(bno);
        Book newBook = new Book();
        newBook.setId(bno);
        newBook.setBnu(bookServiceById.getBnu() - 1);
        boolean b = bookService.updateById(newBook);
        if(!b)
            return R.ok().data("res", "从Book表中取书失败");

        // 给用户card中借阅数目数量 + 1
        Card byId = cardService.getById(sno);
        Card newCard = new Card();
        newCard.setSno(sno);
        newCard.setNow(byId.getNow() + 1);
        boolean b1 = cardService.updateById(newCard);
        if(!b1)
            return R.ok().data("res", "从Card表中增加记录失败");

        // 添加借书记录
        Borrowing borrowing = new Borrowing();
        borrowing.setSno(sno);
        borrowing.setBno(bno);
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, 30); // 过期时间是当前时间+30天
        borrowing.setExpire(calendar.getTime());
        boolean save = borrowingService.save(borrowing);
        if(!save)
            return R.ok().data("res", "添加借书记录失败");

        return R.ok().data("res", "ok");
    }

}
