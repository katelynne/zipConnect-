package rocks.zipcode.io.repository;

import rocks.zipcode.io.domain.Post;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Post entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("select post from Post post where post.poster.login = ?#{principal.username}")
    List<Post> findByPosterIsCurrentUser();

}
