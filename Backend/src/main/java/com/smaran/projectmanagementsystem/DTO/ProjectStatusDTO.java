package com.smaran.projectmanagementsystem.DTO;

import com.smaran.projectmanagementsystem.model.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectStatusDTO {
    private ProjectStatus status;
}
