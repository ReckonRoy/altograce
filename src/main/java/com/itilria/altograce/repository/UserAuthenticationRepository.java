package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.UserAuthentication;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserAuthenticationRepository extends JpaRepository<UserAuthentication, Long>{
    Optional<UserAuthentication> findByUsername(String username);
    List<UserAuthentication> findByCompanyId(long id);
    Optional<UserAuthentication> findByEmail(String username);
    
    //update company id
    @Modifying
    @Transactional
    @Query("UPDATE UserAuthentication u SET u.companyId = :companyId WHERE u.id = :id")
    int updateCompanyById(@Param("id") long id, @Param("companyId") long companyId);
}