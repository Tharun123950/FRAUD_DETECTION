package com.java.ai.frauddetection.service;

import com.java.ai.frauddetection.dto.BankingRequest;
import com.java.ai.frauddetection.dto.FraudResponse;
import com.java.ai.frauddetection.dto.HospitalRequest;
import com.java.ai.frauddetection.entity.BankingTransaction;
import com.java.ai.frauddetection.entity.HospitalTransaction;
import com.java.ai.frauddetection.repository.BankingRepository;
import com.java.ai.frauddetection.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FraudService {

    private final BankingRepository bankingRepository;
    private final HospitalRepository hospitalRepository;

    public FraudResponse processBankingTransaction(BankingRequest request) {
        int score = calculateBankingScore(request);
        String result = getResultFromScore(score);
        String reason = getReasonFromScore(result);

        BankingTransaction transaction = BankingTransaction.builder()
                .accountId(request.getAccountId())
                .amount(request.getTransactionAmount())
                .location(request.getLocation())
                .timestamp(LocalDateTime.now())
                .creditScore(request.getCreditScore())
                .riskScore(score)
                .result(result)
                .reason(reason)
                .build();

        bankingRepository.save(transaction);

        return FraudResponse.builder()
                .riskScore(score)
                .result(result)
                .reason(reason)
                .build();
    }

    public FraudResponse processHospitalTransaction(HospitalRequest request) {
        int score = calculateHospitalScore(request);
        String result = getResultFromScore(score);
        String reason = getReasonFromScore(result);

        HospitalTransaction transaction = HospitalTransaction.builder()
                .patientId(request.getPatientId())
                .treatmentType(request.getTreatmentType())
                .billAmount(request.getBillAmount())
                .insuranceClaim(request.getInsuranceClaim())
                .initialRiskScore(request.getRiskScore())
                .calculatedRiskScore(score)
                .result(result)
                .reason(reason)
                .build();

        hospitalRepository.save(transaction);

        return FraudResponse.builder()
                .riskScore(score)
                .result(result)
                .reason(reason)
                .build();
    }

    private int calculateBankingScore(BankingRequest request) {
        double score = 0;
        
        // Amount factor: higher amounts slightly increase risk
        score += Math.min(request.getTransactionAmount() / 1000, 20);
        
        // Credit score factor: lower credit score increases risk
        score += (850 - request.getCreditScore()) / 10.0;
        
        // Simulated Location Mismatch
        if (request.getLocation().equalsIgnoreCase("Unknown") || request.getLocation().length() > 15) {
            score += 15;
        }

        return (int) Math.min(score, 100);
    }

    private int calculateHospitalScore(HospitalRequest request) {
        double score = request.getRiskScore(); // Start with initial risk score
        
        // Claim Discrepancy: if claim > 90% of bill, increase risk
        if (request.getInsuranceClaim() > request.getBillAmount() * 0.9) {
            score += 20;
        }
        
        // Billing Pattern: very high bills increase risk
        if (request.getBillAmount() > 50000) {
            score += 10;
        }

        return (int) Math.min(score, 100);
    }

    private String getResultFromScore(int score) {
        if (score >= 70) return "FRAUD";
        if (score >= 40) return "MEDIUM RISK";
        return "GENUINE";
    }

    private String getReasonFromScore(String result) {
        return switch (result) {
            case "FRAUD" -> "High risk indicators detected. Immediate attention required.";
            case "MEDIUM RISK" -> "Anomalies detected. Manual review recommended.";
            default -> "No suspicious patterns detected. Transaction is genuine.";
        };
    }
}
