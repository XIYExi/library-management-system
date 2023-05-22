package com.example.manage.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.manage.controller.vo.BorrowingMsgVo;
import com.example.manage.pojo.Borrowing;

import java.util.List;

public interface BorrowingService extends IService<Borrowing> {

    public abstract List<BorrowingMsgVo> getBorrowingListBySno(String sno);

}
