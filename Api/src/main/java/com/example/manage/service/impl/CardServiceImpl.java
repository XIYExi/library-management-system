package com.example.manage.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.manage.mapper.CardMapper;
import com.example.manage.pojo.Card;
import com.example.manage.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardServiceImpl extends ServiceImpl<CardMapper, Card> implements CardService {

    @Autowired
    private CardMapper cardMapper;

    @Override
    public int insertCard(Card card) {
        return cardMapper.insert(card);
    }

    @Override
    public IPage<Card> findAll(Page<Card> page) {
        return cardMapper.findAll(page);
    }

    @Override
    public List<Card> findBySna(String sna) {
       return cardMapper.findBySna(sna);
    }
}
