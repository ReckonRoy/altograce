package com.itilria.altograce.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Setter
@Getter
@NoArgsConstructor 
@AllArgsConstructor 
@Builder 
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserAuthentication implements UserDetails{
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    public int getId()
    {
        return this.id;
    }

    @Column(unique=true, nullable=false)
    private String username;
    @Column(unique=true, nullable=false)
    private String email;
    @Column(unique=true, nullable=true)
    private String password;

    @Column(nullable=false)
    private String role;

    @Column(name = "activated")
    private boolean enabled;

    @Column(nullable = true)
    private int companyId;

    @JsonIgnore
    @OneToOne(mappedBy = "authid", cascade = CascadeType.ALL, orphanRemoval = true)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "username", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Company> company;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getUsername()
    {
        return username;
    }

    @Override
    public String getPassword()
    {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired()
    {
        return true;
    }

    public void setEnabled(boolean enabled)
    {
        this.enabled = enabled;
    }

    @Override
    public boolean isEnabled()
    {
        return this.enabled;
    }

    @Override
    public boolean isAccountNonLocked()
    {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired(){
        return true;
    }
}

