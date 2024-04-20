package com.itilria.altograce.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig{

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
        http.csrf().disable();
        http.authorizeHttpRequests()
        .requestMatchers("/css/**", "/js/**", "/img/**")
            .permitAll()
            .and()
        .formLogin()
            .loginPage("/login")
            .successHandler(successHandler())
            .permitAll()
            .and()
        .logout()
            .logoutUrl("/logout")
            .permitAll();
    
        http.authorizeHttpRequests()
        .requestMatchers("/register/**")
            .permitAll()
            .anyRequest().authenticated();

        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler(){
        return new SimpleUrlAuthenticationSuccessHandler(){
            @Override
            protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            {
                UserDetails userDetails = (UserDetails)authentication.getPrincipal();
                Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
                if(authorities.stream().anyMatch( a -> a.getAuthority().equals("SUPER ADMIN")))
                {
                    return "/admin/dashboard";
                }else if(authorities.stream().anyMatch( a -> a.getAuthority().equals("RECEPTIONIST")))
                {
                    return "/receptionist/dashboard";
                }else{
                   return ""; 
                }
            }
        };
    }

}