package com.flexmesiter.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Api {
    @GetMapping("/alive")
    public Alive alive() {
        Alive data = new Alive();
        data.setAlive(true);
        return data;
    }
}