import { useState } from "react";
import "./ManageEvents.css";
import { Plus, Pencil, Trash2 } from "lucide-react";

const initialEvents = [
  { id: 1, title: "Janmashtami Celebration", date: "Aug 15, 2026" },
  { id: 2, title: "Diwali Aarti Night", date: "Oct 20, 2026" },
  { id: 3, title: "Rath Yatra", date: "Jul 10, 2026" },
];

function ManageEvents() {

  const [events, setEvents] = useState(initialEvents);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleAddEvent = (e) => {
    e.preventDefault();

    if (!title || !date) return;

    const newEvent = {
      id: Date.now(),
      title,
      date,
    };

    setEvents([...events, newEvent]);
    setTitle("");
    setDate("");
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="events-container">

      <div className="events-header">
        <h1>Manage Events</h1>

        <button className="add-btn">
          <Plus size={16}/> Add Event
        </button>
      </div>

      {/* Add Event Form */}

      <div className="event-form-card">

        <h2>Add New Event</h2>

        <form className="event-form" onSubmit={handleAddEvent}>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Event name"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Event
          </button>

        </form>

      </div>

      {/* Events List */}

      <div className="events-list">

        {events.map((e)=>(
          <div key={e.id} className="event-item">

            <div>
              <p className="event-title">{e.title}</p>
              <p className="event-date">{e.date}</p>
            </div>

            <div className="event-actions">

              <button className="edit-btn">
                <Pencil size={14}/>
              </button>

              <button
                className="delete-btn"
                onClick={()=>handleDelete(e.id)}
              >
                <Trash2 size={14}/>
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ManageEvents;