package com.example.manage.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.manage.pojo.User;

import java.util.List;

public interface UserService extends IService<User> {

    public abstract List<User> getAllUsers();

    public abstract int insertUser(User user);

    public abstract List<User> selectBySna(String sna);

    public abstract List<User> selectRandBySno();
}
