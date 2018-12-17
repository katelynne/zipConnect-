package rocks.zipcode.io.repository;

import rocks.zipcode.io.domain.Privacy;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Privacy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrivacyRepository extends JpaRepository<Privacy, Long> {

}
