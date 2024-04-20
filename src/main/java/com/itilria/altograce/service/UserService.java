package com.itilria.altograce.service;

import org.springframework.beans.factory.annotation.Autowired;
import com.itilria.altograce.domain.User;
import java.util.Optional;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.repository.UserRepository;
import com.itilria.altograce.repository.VacationRepository;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.UserAuthenticationRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import com.itilria.altograce.domain.EmployeeLeave;
import java.time.format.DateTimeFormatter;
import com.itilria.altograce.dto.UserForm;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAuthenticationRepository uaRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private VacationRepository vacationRepository;
    
    /*-----------------------------GET EMPLOYEES----------------------------*/
    public List<UserForm> getEmployees(int comId)
    {
        List<UserAuthentication> userAuth = uaRepository.findByCompanyId(comId);
        List<UserForm> employee = new ArrayList<UserForm>();
        
        for( UserAuthentication user_auth : userAuth)
        {
            User user = userRepository.findByAuthid_Id(user_auth.getId()).get();
            
            employee.add(new UserForm(user_auth.getEmail(), user.getName(), user.getSurname(), user.getId_passport(),
            user.getNationality(), user.getDesignation(), user.getDob(), user.getContact_details1(), user.getCountry(),
            user.getProvince(), user.getCity(), user.getPost_code(), user.getStreet(), user.getStand_unit(),
            user.getGender(), user.getMaritalStatus(), user.getHonorofic()
            ));
        }

        return employee;
    }
    /*______________________________________________________________________*/

    public void registerUser(User userForm)
    {
        User user = userForm;
        userRepository.save(user); 
    }

    public User getUserDetails(String username)
    {
        UserAuthentication userAuthentication = uaRepository.findByUsername(username).get();
        User user = userRepository.findByAuthid_Id(userAuthentication.getId()).orElse(null);
        return user;
    }

    public User updateUserDetails(String username, User userData)
    {
        UserAuthentication userAuthentication = uaRepository.findByUsername(username).get();
        User user = userRepository.findByAuthid_Id(userAuthentication.getId()).orElse(null);
        if(user != null){
            user.setContact_details1(userData.getContact_details1());
            user.setContact_details2(userData.getContact_details2());
            user.setMaritalStatus(userData.getMaritalStatus());
            
            LocalDate dob = userData.getDob();
            if(dob != null){
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
                String formattedDate = dob.format(formatter);
                user.setDob(LocalDate.parse(formattedDate, formatter));
            }
            
            user.setCountry(userData.getCountry());
            user.setProvince(userData.getProvince());
            user.setCity(userData.getCity());
            user.setPost_code(userData.getPost_code());
            user.setStreet(userData.getStreet());
            user.setStand_unit(userData.getStand_unit());
            return userRepository.save(user);
        }else{
            return null;
        }
    }
/*__________________________________________________________________________________________________*/

/*----------------------------------Vacation Logic--------------------------------------------------*/
    /**
     * add vacation for employee
     */
    public boolean addVacation(int comId, Map<String, String> request)
    {
        Company company = companyRepository.findById(comId)
                        .orElseThrow(() -> new IllegalArgumentException("Company does not exist!"));
        String empIdPassport = request.get("idPassport");
        User employee = userRepository.findByPassport(empIdPassport)
        .orElseThrow(() -> new IllegalArgumentException("employee does not exist!" + empIdPassport));

        try{
            EmployeeLeave employeeVacation = new EmployeeLeave();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            //start date
            // Get the start date string from the request map
            String startDateString = request.get("startDate");
            // Parse the start date string into a LocalDate object using the formatter
            LocalDate startDate = LocalDate.parse(startDateString, formatter);
            // Set the start date for the employee
            employeeVacation.setStartDate(startDate);

            //end date
            String endDateString = request.get("endDate");
            LocalDate endDate = LocalDate.parse(endDateString, formatter);
            employeeVacation.setEndDate(endDate);
            employeeVacation.setRecordEntryDate(LocalDate.now());
            employeeVacation.setVacationType(request.get("vacationType"));
            
            employeeVacation.setEmployee(employee);
            employeeVacation.setCompany(company);

            vacationRepository.save(employeeVacation);
            return true;
        }catch(RuntimeException ex){
            System.out.println(ex);
            return false;
        }

    }
}