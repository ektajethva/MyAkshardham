import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import axios from "axios";

// const bookings = {
//   visit: [
//     { id: "#V001", name: "Raj Patel", date: "Aug 15", persons: 4, status: "Confirmed" },
//     { id: "#V002", name: "Meera Shah", date: "Aug 16", persons: 2, status: "Pending" },
//   ],
//   seva: [
//     { id: "#S001", name: "Amit Desai", date: "Aug 15", type: "Maha Aarti", status: "Confirmed" },
//   ],
//   parking: [
//     { id: "#P001", name: "Raj Patel", date: "Aug 15", vehicle: "GJ 01 AB 1234", status: "Confirmed" },
//   ],
//   tour: [
//     { id: "#T001", name: "John Smith", date: "Aug 17", lang: "English", status: "Pending" },
//   ],
// };

function BookingTable({ data, columns , type , setData , fetchBooking }) {

  const handleConfirm = async (id) => {
     console.log("CLICKED:", id);
  try {
    const res = await axios.put(
      `http://localhost:5000/booking/updateStatus/${type}/${id}`,
      { status: "Confirmed" }
    );

    console.log("API RESPONSE:", res.data);

    // ✅ update correct state
    setData(prev =>
  prev.map(item =>
    item.id === id ? { ...item, status: "Confirmed" } : item
  )
);

  } catch (err) {
    console.log("Update Error:", err);
  }
};

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((c) => (
              <th
                key={c}
                className="pb-3 text-left text-muted-foreground font-medium"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>

         <tbody className="divide-y divide-border">
          {data.map((b) => (
            <tr key={b.id}>
              <td className="py-3">#{b.id}</td>

              <td className="py-3">{b.name}</td>

              <td className="py-3">
                {new Date(
                  b.visit_date || b.booking_date || b.seva_date || b.parking_date
                ).toLocaleDateString()}
              </td>

              <td className="py-3">
                {type === "visit" && b.number_of_person}
                {type === "seva" && b.seva_type}
                {type === "parking" && b.vehicle_number}
                {type === "tour" && b.languages}
              </td>

              <td className="py-3">
                {b.status === "Pending" ? (
                  <button
                    onClick={() => handleConfirm(b.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Confirm
                  </button>
                ) : (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-50 text-green-700">
                    Confirmed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ViewBookings() {

   const [visit, setVisit] = useState([])
  const [seva, setSeva] = useState([])
  const [parking, setParking] = useState([])
  const [tour, setTour] = useState([])

  useEffect(() => {
   fetchBooking();
  }, [])

  const fetchBooking = async () => {
    try {
      const visitRes = await axios.get("http://localhost:5000/booking/allBooking/visit");
      const sevaRes = await axios.get("http://localhost:5000/booking/allBooking/seva");
      const parkingRes = await axios.get("http://localhost:5000/booking/allBooking/parking");
      const tourRes = await axios.get("http://localhost:5000/booking/allBooking/tour");

      setVisit(visitRes.data);
      setSeva(sevaRes.data);
      setParking(parkingRes.data);
      setTour(tourRes.data);

    } catch (err) {
      console.log("Fetch Error:", err);
    }
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
        All Bookings
      </h1>

      <Tabs defaultValue="visit">
        <TabsList className="mb-4">
          <TabsTrigger value="visit">Visits</TabsTrigger>
          <TabsTrigger value="seva">Seva</TabsTrigger>
          <TabsTrigger value="parking">Parking</TabsTrigger>
          <TabsTrigger value="tour">Tour Guide</TabsTrigger>
        </TabsList>

        <div className="bg-card rounded-xl shadow-card p-5">
          <TabsContent value="visit">
            <BookingTable
              data={visit}
              setData={setVisit}
              fetchBooking={fetchBooking}
              type="visit"
              columns={["ID", "Name", "Date", "Persons", "Status"]}
            />
          </TabsContent>

          <TabsContent value="seva">
            <BookingTable
              data={seva}
              setData={setSeva}
              fetchBooking={fetchBooking}
              type="seva"
              columns={["ID", "Name", "Date", "Type", "Status"]}
            />
          </TabsContent>

          <TabsContent value="parking">
            <BookingTable
              data={parking}
              setData={setParking}
              fetchBooking={fetchBooking}
              type="parking"
              columns={["ID", "Name", "Date", "Vehicle", "Status"]}
            />
          </TabsContent>

          <TabsContent value="tour">
            <BookingTable
              data={tour}
              setData={setTour}
              fetchBooking={fetchBooking}
              type="tour"
              columns={["ID", "Name", "Date", "Language", "Status"]}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}