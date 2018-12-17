package rocks.zipcode.io.web.rest;

import rocks.zipcode.io.ZipConnectApp;

import rocks.zipcode.io.domain.Privacy;
import rocks.zipcode.io.repository.PrivacyRepository;
import rocks.zipcode.io.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static rocks.zipcode.io.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PrivacyResource REST controller.
 *
 * @see PrivacyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ZipConnectApp.class)
public class PrivacyResourceIntTest {

    private static final Long DEFAULT_PRIVACY_ID = 1L;
    private static final Long UPDATED_PRIVACY_ID = 2L;

    private static final Boolean DEFAULT_PUBLIC_VIEW = false;
    private static final Boolean UPDATED_PUBLIC_VIEW = true;

    private static final Boolean DEFAULT_COHORT_VIEW = false;
    private static final Boolean UPDATED_COHORT_VIEW = true;

    private static final Boolean DEFAULT_EMPLOYER_VIEW = false;
    private static final Boolean UPDATED_EMPLOYER_VIEW = true;

    @Autowired
    private PrivacyRepository privacyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrivacyMockMvc;

    private Privacy privacy;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrivacyResource privacyResource = new PrivacyResource(privacyRepository);
        this.restPrivacyMockMvc = MockMvcBuilders.standaloneSetup(privacyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Privacy createEntity(EntityManager em) {
        Privacy privacy = new Privacy()
            .privacyId(DEFAULT_PRIVACY_ID)
            .publicView(DEFAULT_PUBLIC_VIEW)
            .cohortView(DEFAULT_COHORT_VIEW)
            .employerView(DEFAULT_EMPLOYER_VIEW);
        return privacy;
    }

    @Before
    public void initTest() {
        privacy = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrivacy() throws Exception {
        int databaseSizeBeforeCreate = privacyRepository.findAll().size();

        // Create the Privacy
        restPrivacyMockMvc.perform(post("/api/privacies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(privacy)))
            .andExpect(status().isCreated());

        // Validate the Privacy in the database
        List<Privacy> privacyList = privacyRepository.findAll();
        assertThat(privacyList).hasSize(databaseSizeBeforeCreate + 1);
        Privacy testPrivacy = privacyList.get(privacyList.size() - 1);
        assertThat(testPrivacy.getPrivacyId()).isEqualTo(DEFAULT_PRIVACY_ID);
        assertThat(testPrivacy.isPublicView()).isEqualTo(DEFAULT_PUBLIC_VIEW);
        assertThat(testPrivacy.isCohortView()).isEqualTo(DEFAULT_COHORT_VIEW);
        assertThat(testPrivacy.isEmployerView()).isEqualTo(DEFAULT_EMPLOYER_VIEW);
    }

    @Test
    @Transactional
    public void createPrivacyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = privacyRepository.findAll().size();

        // Create the Privacy with an existing ID
        privacy.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrivacyMockMvc.perform(post("/api/privacies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(privacy)))
            .andExpect(status().isBadRequest());

        // Validate the Privacy in the database
        List<Privacy> privacyList = privacyRepository.findAll();
        assertThat(privacyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrivacies() throws Exception {
        // Initialize the database
        privacyRepository.saveAndFlush(privacy);

        // Get all the privacyList
        restPrivacyMockMvc.perform(get("/api/privacies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(privacy.getId().intValue())))
            .andExpect(jsonPath("$.[*].privacyId").value(hasItem(DEFAULT_PRIVACY_ID.intValue())))
            .andExpect(jsonPath("$.[*].publicView").value(hasItem(DEFAULT_PUBLIC_VIEW.booleanValue())))
            .andExpect(jsonPath("$.[*].cohortView").value(hasItem(DEFAULT_COHORT_VIEW.booleanValue())))
            .andExpect(jsonPath("$.[*].employerView").value(hasItem(DEFAULT_EMPLOYER_VIEW.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPrivacy() throws Exception {
        // Initialize the database
        privacyRepository.saveAndFlush(privacy);

        // Get the privacy
        restPrivacyMockMvc.perform(get("/api/privacies/{id}", privacy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(privacy.getId().intValue()))
            .andExpect(jsonPath("$.privacyId").value(DEFAULT_PRIVACY_ID.intValue()))
            .andExpect(jsonPath("$.publicView").value(DEFAULT_PUBLIC_VIEW.booleanValue()))
            .andExpect(jsonPath("$.cohortView").value(DEFAULT_COHORT_VIEW.booleanValue()))
            .andExpect(jsonPath("$.employerView").value(DEFAULT_EMPLOYER_VIEW.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPrivacy() throws Exception {
        // Get the privacy
        restPrivacyMockMvc.perform(get("/api/privacies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrivacy() throws Exception {
        // Initialize the database
        privacyRepository.saveAndFlush(privacy);

        int databaseSizeBeforeUpdate = privacyRepository.findAll().size();

        // Update the privacy
        Privacy updatedPrivacy = privacyRepository.findById(privacy.getId()).get();
        // Disconnect from session so that the updates on updatedPrivacy are not directly saved in db
        em.detach(updatedPrivacy);
        updatedPrivacy
            .privacyId(UPDATED_PRIVACY_ID)
            .publicView(UPDATED_PUBLIC_VIEW)
            .cohortView(UPDATED_COHORT_VIEW)
            .employerView(UPDATED_EMPLOYER_VIEW);

        restPrivacyMockMvc.perform(put("/api/privacies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrivacy)))
            .andExpect(status().isOk());

        // Validate the Privacy in the database
        List<Privacy> privacyList = privacyRepository.findAll();
        assertThat(privacyList).hasSize(databaseSizeBeforeUpdate);
        Privacy testPrivacy = privacyList.get(privacyList.size() - 1);
        assertThat(testPrivacy.getPrivacyId()).isEqualTo(UPDATED_PRIVACY_ID);
        assertThat(testPrivacy.isPublicView()).isEqualTo(UPDATED_PUBLIC_VIEW);
        assertThat(testPrivacy.isCohortView()).isEqualTo(UPDATED_COHORT_VIEW);
        assertThat(testPrivacy.isEmployerView()).isEqualTo(UPDATED_EMPLOYER_VIEW);
    }

    @Test
    @Transactional
    public void updateNonExistingPrivacy() throws Exception {
        int databaseSizeBeforeUpdate = privacyRepository.findAll().size();

        // Create the Privacy

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrivacyMockMvc.perform(put("/api/privacies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(privacy)))
            .andExpect(status().isBadRequest());

        // Validate the Privacy in the database
        List<Privacy> privacyList = privacyRepository.findAll();
        assertThat(privacyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrivacy() throws Exception {
        // Initialize the database
        privacyRepository.saveAndFlush(privacy);

        int databaseSizeBeforeDelete = privacyRepository.findAll().size();

        // Get the privacy
        restPrivacyMockMvc.perform(delete("/api/privacies/{id}", privacy.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Privacy> privacyList = privacyRepository.findAll();
        assertThat(privacyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Privacy.class);
        Privacy privacy1 = new Privacy();
        privacy1.setId(1L);
        Privacy privacy2 = new Privacy();
        privacy2.setId(privacy1.getId());
        assertThat(privacy1).isEqualTo(privacy2);
        privacy2.setId(2L);
        assertThat(privacy1).isNotEqualTo(privacy2);
        privacy1.setId(null);
        assertThat(privacy1).isNotEqualTo(privacy2);
    }
}
