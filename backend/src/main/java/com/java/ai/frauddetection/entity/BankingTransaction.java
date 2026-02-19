package com.java.ai.frauddetection.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "banking_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankingTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountId;
    private Double amount;
    private String location;
    private LocalDateTime timestamp;
    private Integer creditScore;
    
    // Results
    private Integer riskScore;
    private String result; // GENUINE, MEDIUM RISK, FRAUD
    private String reason;
}
