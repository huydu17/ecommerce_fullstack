import { Button, Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

function ReviewForm({ handleSendReview, setWriteReview, writeReview }) {
  return (
    <Form className="mt-2 d-flex align-items-start" onSubmit={handleSendReview}>
      <div className="flex-grow-1">
        <div
          style={{
            direction: "ltr",
            fontFamily: "sans-serif",
            touchAction: "none",
          }}
          className="mb-2"
        >
          <Rating
            initialValue={writeReview.rating}
            fillColorArray={[
              "#f14f45",
              "#f16c45",
              "#f18845",
              "#f1b345",
              "#f1d045",
            ]}
            onClick={(e) => setWriteReview({ ...writeReview, rating: e })}
            transition
          />
        </div>
        <Form.Control
          required
          as="textarea"
          rows={3}
          placeholder="Thêm bình luận..."
          value={writeReview.content}
          className="mb-2"
          onChange={(e) =>
            setWriteReview({ ...writeReview, content: e.target.value })
          }
        />
        <Button variant="danger" type="submit" className="float-end">
          Gửi đánh giá của bạn
        </Button>
      </div>
    </Form>
  );
}

export default ReviewForm;
