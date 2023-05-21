package com.example.manage.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    /**
     * Long转String，不然js中会丢失精度
     */
    @TableId(value = "`id`", type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    @TableField(value = "`sna`")
    private String sna;

    @TableField(value = "`pwd`")
    private String pwd;

    @TableField(value="`type`")
    private int type;

    @TableField(value="`sde`")
    private String sde;

    @TableField(value = "`ssp`")
    private String ssp;

    @TableField(value = "`sup`")
    private Integer sup;

    /**
     * sno为借书号，和id区分，id为学号用long表示，每个学生肯定有学号
     * 但是不一定会办理借书卡，所以默认不办借书卡的学生借书号为字符串‘0’，
     * 办了卡的就给卡号赋uuid，所以类型为String!
     */
    @TableField(value = "`sno`")
    private String sno;

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
