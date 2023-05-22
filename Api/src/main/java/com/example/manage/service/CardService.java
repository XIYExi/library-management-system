package com.example.manage.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.manage.pojo.Card;

import java.util.List;

public interface CardService extends IService<Card> {

    public abstract int insertCard(Card card);

    public abstract List<Card> selectRand();

    IPage<Card> findAll(Page<Card> page);

    public abstract List<Card> findBySna(String sna);

}
