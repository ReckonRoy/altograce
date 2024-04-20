package com.itilria.altograce.service;
/** 
 * @Author Le-Roy
 * @Date 11/29/2023
*/

import org.springframework.beans.factory.annotation.Autowired;
import com.itilria.altograce.repository.UserAuthenticationRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import com.itilria.altograce.domain.UserAuthentication;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{
    
    @Autowired
    private UserAuthenticationRepository userAuthenticationRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        UserAuthentication user = userAuthenticationRepository.findByUsername(username).get();

        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            user.getAuthorities()
        );
    }
}
