package com.example.manage.controller;

import com.example.manage.service.impl.BorrowingServiceImpl;
import com.example.manage.service.impl.CardServiceImpl;
import com.example.manage.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/borrowing")
public class BorrowingController {

    @Autowired
    private BorrowingServiceImpl borrowingService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private CardServiceImpl cardService;

}
