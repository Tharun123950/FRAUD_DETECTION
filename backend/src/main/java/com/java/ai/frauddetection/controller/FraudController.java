package com.java.ai.frauddetection.controller;

import com.java.ai.frauddetection.dto.BankingRequest;
import com.java.ai.frauddetection.dto.FraudResponse;
import com.java.ai.frauddetection.dto.HospitalRequest;
import com.java.ai.frauddetection.service.FraudService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fraud")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend access
public class FraudController {

    private final FraudService fraudService;

    @PostMapping("/banking")
    public ResponseEntity<FraudResponse> checkBankingFraud(@Valid @RequestBody BankingRequest request) {
        return ResponseEntity.ok(fraudService.processBankingTransaction(request));
    }

    @PostMapping("/hospital")
    public ResponseEntity<FraudResponse> checkHospitalFraud(@Valid @RequestBody HospitalRequest request) {
        return ResponseEntity.ok(fraudService.processHospitalTransaction(request));
    }
}
