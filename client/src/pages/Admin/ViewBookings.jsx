import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const bookings = {
  visit: [
    { id: "#V001", name: "Raj Patel", date: "Aug 15", persons: 4, status: "Confirmed" },
    { id: "#V002", name: "Meera Shah", date: "Aug 16", persons: 2, status: "Pending" },
  ],
  seva: [
    { id: "#S001", name: "Amit Desai", date: "Aug 15", type: "Maha Aarti", status: "Confirmed" },
  ],
  parking: [
    { id: "#P001", name: "Raj Patel", date: "Aug 15", vehicle: "GJ 01 AB 1234", status: "Confirmed" },
  ],
  tour: [
    { id: "#T001", name: "John Smith", date: "Aug 17", lang: "English", status: "Pending" },
  ],
};

function BookingTable({ data, columns }) {
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
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((v, j) => (
                <td key={j} className="py-3 text-foreground">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ViewBookings() {
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
              data={bookings.visit}
              columns={["ID", "Name", "Date", "Persons", "Status"]}
            />
          </TabsContent>

          <TabsContent value="seva">
            <BookingTable
              data={bookings.seva}
              columns={["ID", "Name", "Date", "Type", "Status"]}
            />
          </TabsContent>

          <TabsContent value="parking">
            <BookingTable
              data={bookings.parking}
              columns={["ID", "Name", "Date", "Vehicle", "Status"]}
            />
          </TabsContent>

          <TabsContent value="tour">
            <BookingTable
              data={bookings.tour}
              columns={["ID", "Name", "Date", "Language", "Status"]}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}