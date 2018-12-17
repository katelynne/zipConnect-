package rocks.zipcode.io.repository;

import rocks.zipcode.io.domain.Cohort;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cohort entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CohortRepository extends JpaRepository<Cohort, Long> {

}
