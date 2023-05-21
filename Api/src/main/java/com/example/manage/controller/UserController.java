package com.example.manage.controller;

import com.example.manage.controller.vo.UserInsertVo;
import com.example.manage.pojo.User;
import com.example.manage.service.impl.UserServiceImpl;
import com.example.manage.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/insert")
    public R insert(@RequestBody List<UserInsertVo> vos){
        System.out.println("hello");
        for(UserInsertVo vo : vos){
            User user = new User();
            user.setSna(vo.getSna());
            user.setPwd(vo.getPwd());
            user.setType(vo.getType());
            user.setSde(vo.getSde());
            user.setSsp(vo.getSsp());
            user.setSup(vo.getSup());
            user.setSno(vo.getSno());
            try{
                userService.insertUser(user);
            }
            catch (Exception e){
                System.out.println(e);
                return R.ok().data("res", "error");
            }

        }
        return R.ok().data("res", "ok");
    }

    @GetMapping("/list")
    public R list(){
        List<User> allUsers = userService.getAllUsers();
        return R.ok().data("list", allUsers);
    }

    @GetMapping("/selectBySna")
    public R selectBySna(@RequestParam("sna") String sna){
        List<User> allUsers = userService.selectBySna(sna);
        return R.ok().data("res", allUsers);
    }
}
