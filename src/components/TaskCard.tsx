// STEP 7 — TaskCard: การ์ด 1 ใบ (ดู README: STEP 7)
// ไม่มี state ของตัวเอง — รับ "ข้อมูล" + "callback" มาทาง props
// เวลากดปุ่ม จะเรียก callback กลับขึ้นไปให้ TodolistPage (parent) เป็นคนแก้ state

interface props {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  deleteTaskFunc: (taskId: string) => void; // callback function
  toggleDoneTaskFunc: (taskId: string) => void; // callback function
}

export default function TaskCard({
  id,
  title,
  description,
  isDone,
  deleteTaskFunc,
  toggleDoneTaskFunc,
}: props) {
  // callback function when delete button is clicked
  const deleteBtnOnClick = () => {
    deleteTaskFunc(id);
  };

  const toggleDoneBtnOnClick = () => {
    toggleDoneTaskFunc(id);
  };

  return (
    <div key={id} className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-4">
            <h5
              className={
                isDone
                  ? "text-decoration-line-through card-title"
                  : "card-title"
              }
            >
              {title}
            </h5>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-4">
            <p className="card-text">{description}</p>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
            <button
              className="btn btn-success me-2"
              onClick={toggleDoneBtnOnClick}
            >
              Done
            </button>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
            <button className="btn btn-danger" onClick={deleteBtnOnClick}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
