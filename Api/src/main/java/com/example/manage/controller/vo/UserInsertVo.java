package com.example.manage.controller.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInsertVo {

    private String sna;
    private String sde;
    private String ssp;
    private String pwd;
    private String sno;
    private int type;
    private int sup;
}
