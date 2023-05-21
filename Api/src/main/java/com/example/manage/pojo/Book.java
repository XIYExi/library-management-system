package com.example.manage.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Book {

    @TableId(value = "`id`", type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    @TableField(value = "`bna`")
    private String bna;

    @TableField(value = "`bda`")
    private Date bda;

    @TableField(value = "`bpu`")
    private String bpu;

    @TableField(value = "`bpl`")
    private String bpl;

    @TableField(value = "`bnu`")
    private Integer bnu;

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
