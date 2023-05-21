package com.example.manage.pojo;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Card {

    @TableId(value = "`sno`", type = IdType.ASSIGN_UUID)
    private String sno;

    @TableField(value = "`sna`")
    private String sna;

    @TableField(value="`level`")
    private int level;

    @TableField(value="`sde`")
    private String sde;

    @TableField(value = "`ssp`")
    private String ssp;

    @TableField(value = "`sup`")
    private Integer sup;

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
