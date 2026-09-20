package com.example.dateinvite.model;

import jakarta.validation.constraints.NotBlank;

public record DateResponseRequest(
    @NotBlank String answer,
    String location, String time, String place, String mood, String activity, String message
) {}
