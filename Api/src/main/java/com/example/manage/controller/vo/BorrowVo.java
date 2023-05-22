package com.example.manage.controller.vo;

import com.example.manage.pojo.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BorrowVo extends Book {

    private String sno;
}
