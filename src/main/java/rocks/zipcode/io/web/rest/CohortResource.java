package rocks.zipcode.io.web.rest;

import com.codahale.metrics.annotation.Timed;
import rocks.zipcode.io.domain.Cohort;
import rocks.zipcode.io.repository.CohortRepository;
import rocks.zipcode.io.web.rest.errors.BadRequestAlertException;
import rocks.zipcode.io.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cohort.
 */
@RestController
@RequestMapping("/api")
public class CohortResource {

    private final Logger log = LoggerFactory.getLogger(CohortResource.class);

    private static final String ENTITY_NAME = "cohort";

    private final CohortRepository cohortRepository;

    public CohortResource(CohortRepository cohortRepository) {
        this.cohortRepository = cohortRepository;
    }

    /**
     * POST  /cohorts : Create a new cohort.
     *
     * @param cohort the cohort to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cohort, or with status 400 (Bad Request) if the cohort has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cohorts")
    @Timed
    public ResponseEntity<Cohort> createCohort(@RequestBody Cohort cohort) throws URISyntaxException {
        log.debug("REST request to save Cohort : {}", cohort);
        if (cohort.getId() != null) {
            throw new BadRequestAlertException("A new cohort cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cohort result = cohortRepository.save(cohort);
        return ResponseEntity.created(new URI("/api/cohorts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cohorts : Updates an existing cohort.
     *
     * @param cohort the cohort to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cohort,
     * or with status 400 (Bad Request) if the cohort is not valid,
     * or with status 500 (Internal Server Error) if the cohort couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cohorts")
    @Timed
    public ResponseEntity<Cohort> updateCohort(@RequestBody Cohort cohort) throws URISyntaxException {
        log.debug("REST request to update Cohort : {}", cohort);
        if (cohort.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cohort result = cohortRepository.save(cohort);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cohort.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cohorts : get all the cohorts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cohorts in body
     */
    @GetMapping("/cohorts")
    @Timed
    public List<Cohort> getAllCohorts() {
        log.debug("REST request to get all Cohorts");
        return cohortRepository.findAll();
    }

    /**
     * GET  /cohorts/:id : get the "id" cohort.
     *
     * @param id the id of the cohort to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cohort, or with status 404 (Not Found)
     */
    @GetMapping("/cohorts/{id}")
    @Timed
    public ResponseEntity<Cohort> getCohort(@PathVariable Long id) {
        log.debug("REST request to get Cohort : {}", id);
        Optional<Cohort> cohort = cohortRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cohort);
    }

    /**
     * DELETE  /cohorts/:id : delete the "id" cohort.
     *
     * @param id the id of the cohort to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cohorts/{id}")
    @Timed
    public ResponseEntity<Void> deleteCohort(@PathVariable Long id) {
        log.debug("REST request to delete Cohort : {}", id);

        cohortRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
