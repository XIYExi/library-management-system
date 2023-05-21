package com.example.manage.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.util.Date;

public class Borrowing {

    @TableId(value = "`id`", type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    @TableField(value = "`sno`")
    private String sno;

    @TableField(value = "`bno`")
    private Long bno;

    @TableField(value = "`expire`")
    private Date expire;

    @TableField(value = "`createTime`", fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(value = "`updateTime`", fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

    @TableField(value = "`version`", fill = FieldFill.INSERT)
    @Version
    private Integer version;

    @TableField(value = "`delete`", fill = FieldFill.INSERT)
    @TableLogic
    private Integer delete;
}
