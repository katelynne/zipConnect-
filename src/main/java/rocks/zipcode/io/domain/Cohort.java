package rocks.zipcode.io.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Cohort.
 */
@Entity
@Table(name = "cohort")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cohort implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cohort_id")
    private Double cohortId;

    @Column(name = "grad_date")
    private String gradDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getCohortId() {
        return cohortId;
    }

    public Cohort cohortId(Double cohortId) {
        this.cohortId = cohortId;
        return this;
    }

    public void setCohortId(Double cohortId) {
        this.cohortId = cohortId;
    }

    public String getGradDate() {
        return gradDate;
    }

    public Cohort gradDate(String gradDate) {
        this.gradDate = gradDate;
        return this;
    }

    public void setGradDate(String gradDate) {
        this.gradDate = gradDate;
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
        Cohort cohort = (Cohort) o;
        if (cohort.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cohort.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cohort{" +
            "id=" + getId() +
            ", cohortId=" + getCohortId() +
            ", gradDate='" + getGradDate() + "'" +
            "}";
    }
}
