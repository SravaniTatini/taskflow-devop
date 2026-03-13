package com.taskflow.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String status;

}