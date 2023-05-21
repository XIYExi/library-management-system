package com.example.manage.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.manage.mapper.BorrowingMapper;
import com.example.manage.pojo.Borrowing;
import com.example.manage.service.BorrowingService;
import org.springframework.stereotype.Service;

@Service
public class BorrowingServiceImpl
        extends ServiceImpl<BorrowingMapper, Borrowing> implements BorrowingService {
    
}
