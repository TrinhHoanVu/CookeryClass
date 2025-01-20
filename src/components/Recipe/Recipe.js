import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
var id="";
const Recipe = () => {
    const [item, setItem] = useState(); 
    const [comments, setComments] = useState([
        { text: "This recipe looks amazing! Can't wait to try it.", rating: 5, username: "John Doe" },
        { text: "I love the flavors in this dish, will definitely make it again.", rating: 4, username: "Jane Smith" },
        { text: "Great recipe, easy to follow and the video is super helpful!", rating: 5, username: "Mary Johnson" },
        { text: "My family loved this! Thanks for sharing the recipe.", rating: 4, username: "James Brown" },
        { text: "Such a delicious meal. My new favorite dish!", rating: 5, username: "Patricia Lee" }
    ]);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [username, setUsername] = useState("");
    const { recipeId } = useParams();
    if (recipeId !==" ") {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`).then(res => res.json()).then(data => {
            setItem(data.meals[0]);  
        })
    }
    if(item){
      const strYoutube= item.strYoutube;
      const str=strYoutube.split("=");
      id=str[str.length-1];
    }
  
    const addComment = (e) => {
        e.preventDefault(); 
        if (newComment && newRating && username) {
            setComments([...comments, { text: newComment, rating: newRating, username }]);  
            setNewComment(""); 
            setNewRating(0); 
            setUsername(""); // Reset tên người dùng sau khi gửi
        }
    };

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span 
                    key={i} 
                    className={`star ${i <= rating ? "filled" : ""}`} 
                    onClick={() => setNewRating(i)} 
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };
    return (
        <>
            {
            (!item) ? "" : <div className="content">
                    <img src={item.strMealThumb} alt="" />
                    <div className="inner-content">
                        <h1>{item.strMeal}</h1>
                        <h2>{item.strArea} Food</h2>
                        <h3>Category {item.strCategory}</h3>
                    </div>
                
                    <div className="recipe-details">
                        <div className="ingredients">
                            <h2>Ingredients</h2><br />
                            <h4>{item.strIngredient1}:{item.strMeasure1}</h4>
                            <h4>{item.strIngredient2}:{item.strMeasure2}</h4>
                            <h4>{item.strIngredient3}:{item.strMeasure3}</h4>
                            <h4>{item.strIngredient4}:{item.strMeasure4}</h4>
                            <h4>{item.strIngredient5}:{item.strMeasure5}</h4>
                            <h4>{item.strIngredient6}:{item.strMeasure6}</h4>
                            <h4>{item.strIngredient7}:{item.strMeasure7}</h4>
                            <h4>{item.strIngredient8}:{item.strMeasure8}</h4>
                        </div>
                        <div className="instructions">
                            <h2>Instructions</h2><br />
                            <h4>{item.strInstructions}</h4>
                        </div>
                    </div>
                    <div className="video">
                       
                            {/* setVurl(item.strYoutube)
                                //const str=item.strYoutube.split("=");
                                //state=str[str.length-1];
                                //state="hj"    */}
                       
                       
                        <iframe width="
                        100%" height="515" title="recipeVideo"
                            src={`https://www.youtube.com/embed/${id}`}>
                        </iframe>
                    </div>
                    <div className="review-section">
                        <h4>Leave a Review</h4>
                        <div className="rating">
                            {renderStars(newRating)}
                        </div>
                        <h5 className='fs-16 text-black'>User Reviews:</h5>
                        <textarea 
                            className="comment-box" 
                            placeholder="Write your comment..." 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button className="submit-btn" onClick={addComment}>Submit</button>

                        <div className="reviews">
                            <h5>Reviews:</h5>
                            {comments.map((comment, index) => (
                                <div key={index} className="review-item">
                                    <div className="review-stars">
                                        {renderStars(comment.rating)}
                                    </div>
                                    <p><strong>{comment.username}</strong>: {comment.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
export default Recipe