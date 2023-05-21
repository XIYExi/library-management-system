package com.example.manage.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.manage.controller.vo.UserInsertVo;
import com.example.manage.pojo.Card;
import com.example.manage.pojo.User;
import com.example.manage.service.impl.CardServiceImpl;
import com.example.manage.service.impl.UserServiceImpl;
import com.example.manage.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private CardServiceImpl cardService;


    @PostMapping("/insert")
    public R insert(@RequestBody List<UserInsertVo> vos){
        for(UserInsertVo vo : vos){
            User user = new User();
            user.setSna(vo.getSna());
            user.setPwd(vo.getPwd());
            user.setType(vo.getType());
            user.setSde(vo.getSde());
            user.setSsp(vo.getSsp());
            user.setSup(vo.getSup());
            try{
                Card card = new Card();
                card.setSno(vo.getSno());
                card.setSna(user.getSna());
                card.setLevel(0);
                card.setSde(user.getSde());
                card.setSsp(user.getSsp());
                card.setSup(user.getSup()); // 一次可以借几本书，默认每个学生初始都是10本
                // card的id，即sno自动生成uuid，这里需要为添加的user，单独加上sno字段，让两张表有关联
                user.setSno(vo.getSno());

                int i = userService.insertUser(user);
                int j = cardService.insertCard(card);

                if(i != 1 || j != 1)
                    return R.ok().data("res", "error");
            }
            catch (Exception e){
                System.out.println(e);
                return R.ok().data("res", "error");
            }
        }
        return R.ok().data("res", "ok");
    }

    @GetMapping("/findAll/{current}/{limit}")
    public R findAll(@PathVariable("current") Integer current,
                  @PathVariable("limit") Integer limit){
        Page<Card> page = new Page<>(current,limit);
        IPage<Card> all = cardService.findAll(page);
        return R.ok().data("res", all);
    }

    @PostMapping("/updateLevel")
    public R updateLevel(
            @RequestParam("sno") String sno,
            @RequestParam("level") Integer level){
        Card byId = cardService.getById(sno);
        Card card = new Card();
        card.setSno(byId.getSno());
        card.setLevel(level);
        if(level == 1)
            card.setSup(20);
        else
            card.setSup(10);
        boolean b = cardService.updateById(card);
        if(b)
            return R.ok().data("res", "ok");
        else
            return R.ok().data("res", "error");
    }


    @PostMapping("/deleteBySno")
    public R deleteBySno(@RequestParam("sno") String sno){
        boolean remove = cardService.removeById(sno);
        return remove ? R.ok().data("res", "ok") : R.ok().data("res", "error");
    }

    @GetMapping("/snaSearch")
    public R snaSearch(@RequestParam("sna") String sna){
        List<Card> bySna = cardService.findBySna(sna);
        return R.ok().data("res", bySna);
    }

    @PostMapping("/addCard")
    public R addCard(@RequestParam("id") String id,@RequestParam("sno")String sno){
        Long _id = Long.parseLong(id);
        User byId = userService.getById(_id);
        byId.setSno(sno);

        Card card = new Card();
        card.setSno(sno);
        card.setSna(byId.getSna());
        card.setLevel(0);
        card.setSde(byId.getSde());
        card.setSsp(byId.getSsp());
        card.setSup(byId.getSup());
        cardService.insertCard(card);

        User updateUser = new User();
        updateUser.setId(byId.getId());
        updateUser.setSno(byId.getSno());
        boolean b = userService.updateById(updateUser);
        return b ? R.ok().data("res", "ok")
                : R.ok().data("res", "error");
    }
}
