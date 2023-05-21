package com.example.manage.controller.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookInsertVo {
    private String bna;
    private Date bda;
    private String bpu;
    private String bpl;
    private Integer bnu;
}
