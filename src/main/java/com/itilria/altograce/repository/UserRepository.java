package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.itilria.altograce.domain.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByAuthid_Id(long id);
    @Query("SELECT u FROM User u WHERE u.id_passport = ?1")
    Optional<User> findByPassport(String id_passport);
}