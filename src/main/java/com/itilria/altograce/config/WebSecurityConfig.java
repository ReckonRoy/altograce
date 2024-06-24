package com.itilria.altograce.config;

import java.util.Collection;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http
            .authorizeHttpRequests((requests) -> requests
                .requestMatchers( new AntPathRequestMatcher("/register/**"), new AntPathRequestMatcher("/css/**"), new AntPathRequestMatcher("/img/**"), new AntPathRequestMatcher("/js/**"))
                .permitAll()
                .anyRequest()
                .authenticated()
            )
            .formLogin((form) -> form
                .loginPage("/login")
                .successHandler(successHandler())
                .permitAll()
            )
            .rememberMe((remember) -> remember
                .key("remember-me-key")
                .rememberMeCookieName("altograce-remember-me")
            )
            .logout((logout) -> logout
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .permitAll()
                .deleteCookies("altograce-remember-me")
            );
        
        return http.build();
    }
    

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return new SimpleUrlAuthenticationSuccessHandler() {
            @Override
            protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

                if (authorities.stream().anyMatch(a -> a.getAuthority().equals("SUPER ADMIN"))) {
                    return "/admin/dashboard";
                } else if (authorities.stream().anyMatch(a -> a.getAuthority().equals("RECEPTIONIST"))) {
                    return "/reception/dashboard";
                } else {
                    return "/";
                }
            }
        };
    }
}