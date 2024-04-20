package com.itilria.altograce.dto;

import com.itilria.altograce.domain.UserAuthentication;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AuthForm {
    private String username;
    private String email;
    private String password;
    private String role;

    public String getUsername()
    {
        return this.username;
    }

    public String getEmail()
    {
        return this.email;
    }
    public String getPassword()
    {
        return this.password;
    }
    public String getRole()
    {
        return this.role;
    }
    public UserAuthentication toUser(AuthForm authForm) {
        UserAuthentication userAuth = new UserAuthentication();
        userAuth.setUsername(authForm.getUsername());
        userAuth.setEmail(authForm.getEmail());
        userAuth.setPassword(authForm.getPassword());
        userAuth.setRole(authForm.getRole());
        return userAuth;
    }
}
