package com.example.manage.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.manage.controller.vo.BorrowingMsgVo;
import com.example.manage.mapper.BorrowingMapper;
import com.example.manage.pojo.Book;
import com.example.manage.pojo.Borrowing;
import com.example.manage.service.BorrowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class BorrowingServiceImpl
        extends ServiceImpl<BorrowingMapper, Borrowing> implements BorrowingService {

    @Autowired
    private BorrowingMapper borrowingMapper;

    @Autowired
    private BookServiceImpl bookService;

    @Override
    public List<BorrowingMsgVo> getBorrowingListBySno(String sno) {
        List<Borrowing> borrowingListBySno = borrowingMapper.getBorrowingListBySno(sno);
        List<BorrowingMsgVo> vos = new ArrayList<>();
        for(Borrowing item: borrowingListBySno){
            // 对自己的每条借阅数据进行处理，需要根据 bno 查到图书信息，并且当前图书是否已经过期
            Long bno = item.getBno();
            Book byId = bookService.getById(bno);


            BorrowingMsgVo borrowingMsgVo = new BorrowingMsgVo();
            borrowingMsgVo.setId(item.getId());// id,就是借阅记录的id
            borrowingMsgVo.setBno(bno); // bna，图书的id编号
            borrowingMsgVo.setBna(byId.getBna());// bna，图书的名称
            borrowingMsgVo.setExpire(item.getExpire()); // 过期时间
            borrowingMsgVo.setCreateTime(item.getCreateTime());

            Date date = new Date();
            Long now = date.getTime();
            Long expire = item.getExpire().getTime();
            // 用now-expire如果为正说明超过时间，过期了，否则就说明还没过期
            Long num = now - expire;
            int day = (int)(num/24/60/60/1000); // 强转int

            borrowingMsgVo.setTime(day);
            borrowingMsgVo.setMoney(day > 0 ? day * 0.5 : 0);
            vos.add(borrowingMsgVo);
        }
        return vos;
    }
}
