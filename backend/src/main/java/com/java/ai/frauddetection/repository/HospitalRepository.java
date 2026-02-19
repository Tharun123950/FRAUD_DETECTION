package com.java.ai.frauddetection.repository;

import com.java.ai.frauddetection.entity.HospitalTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepository extends JpaRepository<HospitalTransaction, Long> {
}
