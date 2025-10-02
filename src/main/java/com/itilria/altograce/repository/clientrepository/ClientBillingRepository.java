package com.itilria.altograce.repository.clientrepository;

import java.util.List;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

import com.itilria.altograce.domain.client.ClientBilling;

public interface ClientBillingRepository extends JpaRepository<ClientBilling, Long>{
    List<ClientBilling> findByPrimaryClient_Id(long id);

    //Get the last payement made by client
    @Query(value="SELECT * FROM client_billing WHERE primary_client = :clientId ORDER BY payment_date DESC LIMIT 1",
    nativeQuery = true)
    ClientBilling getlatestPaymentDetails(@Param("clientId") long id);

      //Get the last payement made by client
      Optional<ClientBilling> findTopByPrimaryClientIdOrderByPaymentDateDesc(Long clientId);

    @Query("SELECT cb FROM ClientBilling cb WHERE cb.primaryClient.id = :clientId AND cb.paymentDate = :paymentDate")
    Optional<ClientBilling> findByPrimaryClientIdAndPaymentDate(@Param("clientId") Long clientId,
                                                             @Param("paymentDate") LocalDate paymentDate);

}