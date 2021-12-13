import { useParams } from "react-router"
import { useEffect } from "react/cjs/react.development"
import { useState } from 'react';
import Review from './../components/Review'
import PostReview from "../components/PostReview";

function SingleMovie(props) {
    const url = "https://mc-movie-app.herokuapp.com/"
    const params = useParams()
    const id = parseInt(params.id)
    const [reviews, setReviews] = useState([])
    const [sortedReview, setSortedReview] = useState(reviews)

    const movie = props.movies.find((m) => m.id === id)
    const getReviews = async () => {
      const response = await fetch(`${url}movies/${id}/reviews`);
      const data = await response.json()
      setReviews(data)
      setSortedReview(data)
    }

    useEffect(() => {
        getReviews()
    }, [])

    const latestSort = (e) => {
        e.preventDefault()
        const latestReview = [].concat(reviews).sort((a,b) => {
            let DateA = new Date(a.created_at)
            let DateB = new Date(b.created_at)
            return DateB - DateA
        })
        setSortedReview(latestReview)
    }

    const highestSort = (e) => {
        e.preventDefault()
        const highestReview = [].concat(reviews).sort((a,b) => a.rating > b.rating ? -1 : 1)
        setSortedReview(highestReview)
    }

    const lowestSort = (e) => {
        e.preventDefault()
        const highestReview = [].concat(reviews).sort((a,b) => a.rating > b.rating ? 1 : -1)
        setSortedReview(highestReview)
    }
    return (
        <>
        <div className="single-movie-header">
            <img src={movie?.poster} alt={movie?.title} />
            <div className="movie-about">
                <h1>{movie?.title}</h1>
                <p><strong>{movie?.year}</strong></p>
                <p>{movie?.description}</p>
            </div>
        </div>
        <div className="reviews">
            <h1>Reviews</h1>
            <PostReview params={params} />
            <div className="sort-btn-container">
                <button className="sort-btn lowest" onClick={lowestSort}>Lowest</button>
                <button className="sort-btn" onClick={highestSort}>Highest</button>
                <button className="sort-btn latest" onClick={latestSort}>Latest</button>
            </div>
            {sortedReview.map(review => <Review body={review.body} review_id={review.id} movie_id={id} rating={review.rating} date={review.created_at} />)}
        </div>
        </>    
    )
}

export default SingleMovie