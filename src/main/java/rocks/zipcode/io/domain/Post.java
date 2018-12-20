package rocks.zipcode.io.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Post.
 */
@Entity
@Table(name = "post")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_timestamp")
    private LocalDate timestamp;

    @Column(name = "content")
    private String content;

    @Column(name = "likes")
    private String likes;

    @ManyToOne
    @JsonIgnoreProperties("")
    private UserProfile poster;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Privacy privacySetting;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTimestamp() {
        return timestamp;
    }

    public Post timestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
    }

    public String getContent() {
        return content;
    }

    public Post content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLikes() {
        return likes;
    }

    public Post likes(String likes) {
        this.likes = likes;
        return this;
    }

    public void setLikes(String likes) {
        this.likes = likes;
    }

    public UserProfile getPoster() {
        return poster;
    }

    public Post poster(UserProfile userProfile) {
        this.poster = userProfile;
        return this;
    }

    public void setPoster(UserProfile userProfile) {
        this.poster = userProfile;
    }

    public Privacy getPrivacySetting() {
        return privacySetting;
    }

    public Post privacySetting(Privacy privacy) {
        this.privacySetting = privacy;
        return this;
    }

    public void setPrivacySetting(Privacy privacy) {
        this.privacySetting = privacy;
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
        Post post = (Post) o;
        if (post.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), post.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Post{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", content='" + getContent() + "'" +
            ", likes='" + getLikes() + "'" +
            "}";
    }
}
