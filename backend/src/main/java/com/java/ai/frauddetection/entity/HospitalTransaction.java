package com.java.ai.frauddetection.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hospital_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HospitalTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientId;
    private String treatmentType;
    private Double billAmount;
    private Double insuranceClaim;
    private Integer initialRiskScore;

    // Results
    private Integer calculatedRiskScore;
    private String result; // GENUINE, MEDIUM RISK, FRAUD
    private String reason;
}
