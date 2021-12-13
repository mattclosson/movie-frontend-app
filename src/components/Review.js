import { useNavigate } from 'react-router-dom'

function Review(props) {
    const url = "https://mc-movie-app.herokuapp.com/reviews/"
    const navigate = useNavigate()
    let stars = []
    for(let i = 0; i < props.rating; i++) {
        console.log(props.rating)
        stars.push(<i className="fas fa-star" key={i}></i>)
    }
    const handleSubmit = async () => {
        console.log("submit")
        await fetch(url + props.review_id, {
          method: "delete"
        })
        navigate(`/${props.movie_id}`)
      }
    return <div className="review" key={props.body}>
        <p>{props.body}</p>
        <p>{stars.map(star => star)}</p>
        <form onSubmit={handleSubmit}>
            <button className="delete-btn">X</button>
        </form>
    </div>
} 

export default Review