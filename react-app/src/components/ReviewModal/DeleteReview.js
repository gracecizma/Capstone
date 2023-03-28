import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/reviews";
import './deletereview.css'

export default function DeleteReviewModal({ review }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()


  const handleClick = (e) => {
    e.preventDefault()
    dispatch(deleteReview(review)).then(closeModal)
  }

  return (
    <>
      <div className="delete-modal">
        <div className="delete-review-header">
          <h1 className="confirm-delete">Confirm Delete</h1>
          <div className="are-you-sure">Are you sure you want to delete this review?</div>
        </div>
        <div className="confirm-delete-buttons">
          <button
            className="yes-delete"
            onClick={handleClick}
            type="submit"
          > Yes (Delete Review)
          </button>
          <button
            className="no-delete"
            onClick={closeModal}
            type="submit"
          > No (Keep Review)
          </button>
        </div>
      </div>
    </>
  )
}
