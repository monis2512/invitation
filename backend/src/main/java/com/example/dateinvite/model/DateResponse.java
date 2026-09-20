package com.example.dateinvite.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "date_responses")
public class DateResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String answer;
    private String location;
    private String time;
    private String place;
    private String mood;
    private String activity;
    @Column(length = 2000) private String message;
    @Column(nullable = false) private LocalDateTime submittedAt;

    public Long getId(){return id;}
    public String getAnswer(){return answer;} public void setAnswer(String v){answer=v;}
    public String getLocation(){return location;} public void setLocation(String v){location=v;}
    public String getTime(){return time;} public void setTime(String v){time=v;}
    public String getPlace(){return place;} public void setPlace(String v){place=v;}
    public String getMood(){return mood;} public void setMood(String v){mood=v;}
    public String getActivity(){return activity;} public void setActivity(String v){activity=v;}
    public String getMessage(){return message;} public void setMessage(String v){message=v;}
    public LocalDateTime getSubmittedAt(){return submittedAt;} public void setSubmittedAt(LocalDateTime v){submittedAt=v;}
}
