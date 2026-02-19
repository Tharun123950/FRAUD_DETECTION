package com.java.ai.frauddetection.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HospitalRequest {
    @NotBlank(message = "Patient ID is required")
    private String patientId;
    
    @NotBlank(message = "Treatment Type is required")
    private String treatmentType;
    
    @NotNull(message = "Bill Amount is required")
    @Min(value = 0, message = "Bill Amount must be positive")
    private Double billAmount;
    
    @NotNull(message = "Insurance Claim is required")
    private Double insuranceClaim;
    
    @NotNull(message = "Risk Score is required")
    private Integer riskScore;
}
