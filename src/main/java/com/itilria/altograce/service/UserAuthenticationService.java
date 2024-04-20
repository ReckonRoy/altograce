package com.itilria.altograce.service;
/** 
 * @Author Le-Roy
 * @Date 11/29/2023
*/
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import com.itilria.altograce.dto.AuthForm;
import com.itilria.altograce.dto.PasswordForm;
import com.itilria.altograce.repository.UserAuthenticationRepository;
import com.itilria.altograce.exception.PasswordMatchException;
import com.itilria.altograce.domain.UserAuthentication;

@Service
@RequiredArgsConstructor
@Transactional
public class UserAuthenticationService{
    @Autowired
    private UserAuthenticationRepository userAuthenticationRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void registerUserAuthentication(AuthForm authForm)
    {
        UserAuthentication userAuthentication = authForm.toUser(authForm);
        userAuthentication.setPassword(passwordEncoder.encode(authForm.getPassword()));
        userAuthenticationRepository.save(userAuthentication); 
    }

    //Register employees
    public UserAuthentication employeeRegistration(int companyId, AuthForm authForm)
    {
        if(!userAuthenticationRepository.findByEmail(authForm.getEmail()).isPresent()){
            UserAuthentication userCredentials = authForm.toUser(authForm);;
            // Save user credentials with activated=false
            userCredentials.setEnabled(false);
            userCredentials.setCompanyId(companyId);
            //send email for user to complete registration and activate account
            sendActivationEmail(userCredentials.getEmail());

            return userAuthenticationRepository.save(userCredentials);
        }else{
            return null;
        }
    }

    //Activate account
    public void activateAccount(String email, String password) {
        // Find user credentials by email
        UserAuthentication userCredentials = userAuthenticationRepository.findByEmail(email).orElse(null);

        // Update password and set activated=true
        userCredentials.setPassword(passwordEncoder.encode(password));
        userCredentials.setEnabled(true);
        userAuthenticationRepository.save(userCredentials);
    }

    private void sendActivationEmail(String email) {
    MimeMessage message = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message);
    
    try {
        // Set the sender email address (replace 'yourdomain.com' with your actual domain)
        helper.setFrom("noreply@yourdomain.com");

        // Set the recipient email address
        helper.setTo(email);

        // Set the email subject
        helper.setSubject("Activate Your Account");

        // Generate the activation link (replace 'yourAppBaseUrl' with the actual base URL of your application)
        String activationLink = "localhost:8080/register/activate?email=" + email;

        // Create a Thymeleaf context
        Context context = new Context();
        context.setVariable("activationLink", activationLink);

        // Process the Thymeleaf template
        String emailContent = templateEngine.process("activation-email-template", context);

        // Set the email content as HTML
        helper.setText(emailContent, true);

        // Send the email
        javaMailSender.send(message);
    } catch (MessagingException e) {
        // Handle exceptions
        e.printStackTrace();
    }
}

    
    public UserAuthentication updateEmail(String username, AuthForm userData)
    {
        UserAuthentication userAuthentication = userAuthenticationRepository.findByUsername(username).orElse(null);
        
        if(userAuthentication != null)
        {
            if(!passwordMatch(username, userData.getPassword()))
            {
                throw new PasswordMatchException("Passwords do not match. Please provide a valid Password!");
            }

            userAuthentication.setEmail(userData.getEmail());
            return userAuthenticationRepository.save(userAuthentication); 
        }else{
            return null;
        }
    }

    public UserAuthentication updatePassword(String username, PasswordForm userData)
    {
        UserAuthentication userAuthentication = userAuthenticationRepository.findByUsername(username).orElse(null);
        
        if(userAuthentication != null)
        {
            if(!passwordMatch(username, userData.getOldPassword()))
            {
                throw new PasswordMatchException("Incorrect Password Entered. Please provide a valid Password!");
            }

            userAuthentication.setPassword(passwordEncoder.encode(userData.getNewPassword()));
            return userAuthenticationRepository.save(userAuthentication); 
        }else{
            return null;
        }
    }

    public boolean passwordMatch(String username, String password)
    {
        UserAuthentication userAuthentication = userAuthenticationRepository.findByUsername(username).orElse(null);
        return passwordEncoder.matches(password, userAuthentication.getPassword());
       
    }

    public Optional<UserAuthentication> findByUsername(String username)
    {
        return userAuthenticationRepository.findByUsername(username);
    }
}