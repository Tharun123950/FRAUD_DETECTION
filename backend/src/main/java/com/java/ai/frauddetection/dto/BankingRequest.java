package com.java.ai.frauddetection.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BankingRequest {
    @NotBlank(message = "Account ID is required")
    private String accountId;
    
    @NotNull(message = "Transaction Amount is required")
    @Min(value = 0, message = "Amount must be positive")
    private Double transactionAmount;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @NotBlank(message = "Time is required")
    private String time;
    
    @NotNull(message = "Credit Score is required")
    @Min(value = 300, message = "Invalid Credit Score")
    private Integer creditScore;
}
