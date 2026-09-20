package com.example.dateinvite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping({"/", "/admin"})
    public String frontend() {
        return "forward:/index.html";
    }
}
