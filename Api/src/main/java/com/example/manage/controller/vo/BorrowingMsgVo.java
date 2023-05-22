package com.example.manage.controller.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BorrowingMsgVo {

    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long bno;
    private String bna;
    private Date expire;
    // 过期时间  超过30天为正，否则为负，前端为正就显示当前天数，否则就显示未过期，为正计算需要缴费金额
    private Integer Time;
    private Double money;
    private Date createTime; // 创建时间，作为借书时间

}
