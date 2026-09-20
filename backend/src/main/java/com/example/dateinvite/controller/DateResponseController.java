package com.example.dateinvite.controller;

import com.example.dateinvite.model.DateResponse;
import com.example.dateinvite.model.DateResponseRequest;
import com.example.dateinvite.repository.DateResponseRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api")
public class DateResponseController {
    private final DateResponseRepository repository;
    public DateResponseController(DateResponseRepository repository){this.repository=repository;}

    @GetMapping("/health")
    public Map<String,String> health(){return Map.of("status","UP");}

    @PostMapping("/responses")
    public ResponseEntity<?> create(@Valid @RequestBody DateResponseRequest r){
        DateResponse x=new DateResponse();
        x.setAnswer(r.answer()); x.setLocation(r.location()); x.setTime(r.time());
        x.setPlace(r.place()); x.setMood(r.mood()); x.setActivity(r.activity());
        x.setMessage(r.message()); x.setSubmittedAt(LocalDateTime.now());
        repository.save(x);
        return ResponseEntity.ok(Map.of("success",true));
    }

    @GetMapping("/admin/responses")
    public ResponseEntity<?> all(HttpSession session){
        if(!AuthController.authenticated(session)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        List<DateResponse> responses = repository.findAll();
Collections.reverse(responses);
return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/admin/responses/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id,HttpSession session){
        if(!AuthController.authenticated(session)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        repository.deleteById(id);
        return ResponseEntity.ok(Map.of("success",true));
    }
}
