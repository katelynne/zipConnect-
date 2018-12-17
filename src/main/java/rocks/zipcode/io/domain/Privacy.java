package rocks.zipcode.io.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Privacy.
 */
@Entity
@Table(name = "privacy")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Privacy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "privacy_id")
    private Long privacyId;

    @Column(name = "public_view")
    private Boolean publicView;

    @Column(name = "cohort_view")
    private Boolean cohortView;

    @Column(name = "employer_view")
    private Boolean employerView;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrivacyId() {
        return privacyId;
    }

    public Privacy privacyId(Long privacyId) {
        this.privacyId = privacyId;
        return this;
    }

    public void setPrivacyId(Long privacyId) {
        this.privacyId = privacyId;
    }

    public Boolean isPublicView() {
        return publicView;
    }

    public Privacy publicView(Boolean publicView) {
        this.publicView = publicView;
        return this;
    }

    public void setPublicView(Boolean publicView) {
        this.publicView = publicView;
    }

    public Boolean isCohortView() {
        return cohortView;
    }

    public Privacy cohortView(Boolean cohortView) {
        this.cohortView = cohortView;
        return this;
    }

    public void setCohortView(Boolean cohortView) {
        this.cohortView = cohortView;
    }

    public Boolean isEmployerView() {
        return employerView;
    }

    public Privacy employerView(Boolean employerView) {
        this.employerView = employerView;
        return this;
    }

    public void setEmployerView(Boolean employerView) {
        this.employerView = employerView;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Privacy privacy = (Privacy) o;
        if (privacy.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), privacy.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Privacy{" +
            "id=" + getId() +
            ", privacyId=" + getPrivacyId() +
            ", publicView='" + isPublicView() + "'" +
            ", cohortView='" + isCohortView() + "'" +
            ", employerView='" + isEmployerView() + "'" +
            "}";
    }
}
