package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.UserAuthentication;
import java.util.Optional;
import java.util.List;

public interface UserAuthenticationRepository extends JpaRepository<UserAuthentication, Integer>{
    Optional<UserAuthentication> findByUsername(String username);
    List<UserAuthentication> findByCompanyId(int id);
    Optional<UserAuthentication> findByEmail(String username);
}