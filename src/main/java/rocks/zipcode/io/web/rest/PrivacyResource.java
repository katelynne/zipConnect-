package rocks.zipcode.io.web.rest;

import com.codahale.metrics.annotation.Timed;
import rocks.zipcode.io.domain.Privacy;
import rocks.zipcode.io.repository.PrivacyRepository;
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
 * REST controller for managing Privacy.
 */
@RestController
@RequestMapping("/api")
public class PrivacyResource {

    private final Logger log = LoggerFactory.getLogger(PrivacyResource.class);

    private static final String ENTITY_NAME = "privacy";

    private final PrivacyRepository privacyRepository;

    public PrivacyResource(PrivacyRepository privacyRepository) {
        this.privacyRepository = privacyRepository;
    }

    /**
     * POST  /privacies : Create a new privacy.
     *
     * @param privacy the privacy to create
     * @return the ResponseEntity with status 201 (Created) and with body the new privacy, or with status 400 (Bad Request) if the privacy has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/privacies")
    @Timed
    public ResponseEntity<Privacy> createPrivacy(@RequestBody Privacy privacy) throws URISyntaxException {
        log.debug("REST request to save Privacy : {}", privacy);
        if (privacy.getId() != null) {
            throw new BadRequestAlertException("A new privacy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Privacy result = privacyRepository.save(privacy);
        return ResponseEntity.created(new URI("/api/privacies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /privacies : Updates an existing privacy.
     *
     * @param privacy the privacy to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated privacy,
     * or with status 400 (Bad Request) if the privacy is not valid,
     * or with status 500 (Internal Server Error) if the privacy couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/privacies")
    @Timed
    public ResponseEntity<Privacy> updatePrivacy(@RequestBody Privacy privacy) throws URISyntaxException {
        log.debug("REST request to update Privacy : {}", privacy);
        if (privacy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Privacy result = privacyRepository.save(privacy);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, privacy.getId().toString()))
            .body(result);
    }

    /**
     * GET  /privacies : get all the privacies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of privacies in body
     */
    @GetMapping("/privacies")
    @Timed
    public List<Privacy> getAllPrivacies() {
        log.debug("REST request to get all Privacies");
        return privacyRepository.findAll();
    }

    /**
     * GET  /privacies/:id : get the "id" privacy.
     *
     * @param id the id of the privacy to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the privacy, or with status 404 (Not Found)
     */
    @GetMapping("/privacies/{id}")
    @Timed
    public ResponseEntity<Privacy> getPrivacy(@PathVariable Long id) {
        log.debug("REST request to get Privacy : {}", id);
        Optional<Privacy> privacy = privacyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(privacy);
    }

    /**
     * DELETE  /privacies/:id : delete the "id" privacy.
     *
     * @param id the id of the privacy to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/privacies/{id}")
    @Timed
    public ResponseEntity<Void> deletePrivacy(@PathVariable Long id) {
        log.debug("REST request to delete Privacy : {}", id);

        privacyRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
