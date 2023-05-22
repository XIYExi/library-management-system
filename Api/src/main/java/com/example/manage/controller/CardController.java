package com.example.manage.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.manage.controller.vo.BorrowingMsgVo;
import com.example.manage.controller.vo.UserInsertVo;
import com.example.manage.pojo.Card;
import com.example.manage.pojo.User;
import com.example.manage.service.impl.BorrowingServiceImpl;
import com.example.manage.service.impl.CardServiceImpl;
import com.example.manage.service.impl.UserServiceImpl;
import com.example.manage.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private CardServiceImpl cardService;
    
    @Autowired
    private BorrowingServiceImpl borrowingService;

    @PostMapping("/canBorrow")
    public R canBorrow(@RequestParam("sno")String sno,
                       @RequestParam("bno")String bno){
        Long _bno = Long.parseLong(bno);

        // 先查出借阅列表
        List<BorrowingMsgVo> borrowingListBySno = borrowingService.getBorrowingListBySno(sno);
        
        // 再查card，看其最大借阅数量
        Card byId = cardService.getById(sno);

        // 小于才可以借，大于等于不可以
        if(borrowingListBySno.size() < byId.getSup()){
            // 数量不超标的情况下，再去查询是否有过期书没有还
            for(BorrowingMsgVo item:borrowingListBySno){

                System.out.println(item.getTime());
                // BorrowingMsgVo中time属性表示预期时间，如果为正就表示有书没还，此时不可以借书
                if(item.getTime() > 0)
                    return R.ok().data("res","有书逾期，请先还书");

                // 不可以重复借阅
                if(Objects.equals(item.getBno(), _bno)){
                    System.out.println("不可以");
                    return R.ok().data("res","已经借过这本书了，不要重复借阅");
                }

            }

        }
        else{
            return R.ok().data("res", "借阅数量已经达到上限");
        }

        return R.ok().data("res","ok");
    }


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
