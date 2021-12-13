import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
function PostReview(props) {
    const url = "https://mc-movie-app.herokuapp.com/"
    const navigate = useNavigate()
    const params = props.params

    // console.log(params.id)
    const initialReview = {
        body: "",
        rating: 0,
        movie_id: params.id
    }
    const [formData, setFormData] = useState(initialReview)
    // console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch((`${url}reviews`), {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        navigate(`/${params.id}`)
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
      }

    const handleHover = (e) => {
        const lowerStars = e.target.parentElement.getElementsByClassName("fas fa-star");
        const hoverValue = e.target.dataset.value;
        for(let star of lowerStars) {
            if(star.dataset.value <= hoverValue) {
                star.style.color = 'yellow'
                star.style.cursor = 'pointer'
            } else {
                star.style.color = 'gray'
            }
        }
    }

    const starClickHandler = (e) => {
        let rating = e.target.dataset.value;
        setFormData({...formData, rating: rating})
    }
    
    const stars = [
        <i className="fas fa-star" data-value="1" key="1" onMouseOver={handleHover} onClick={starClickHandler}></i>,
        <i className="fas fa-star" data-value="2" key="2" onMouseOver={handleHover} onClick={starClickHandler}></i>,
        <i className="fas fa-star" data-value="3" key="3" onMouseOver={handleHover} onClick={starClickHandler}></i>,
        <i className="fas fa-star" data-value="4" key="4" onMouseOver={handleHover} onClick={starClickHandler}></i>,
        <i className="fas fa-star" data-value="5" key="5" onMouseOver={handleHover} onClick={starClickHandler}></i>
    ]

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <input type="text" name="body" placeholder="Leave a Review" value={formData.body} onChange={handleChange} />
            <div className="form-stars">{stars.map(star => star)}</div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default PostReview