package com.java.ai.frauddetection.repository;

import com.java.ai.frauddetection.entity.BankingTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankingRepository extends JpaRepository<BankingTransaction, Long> {
}
