import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

export default function ManageCrowd() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
        Manage Crowd Status
      </h1>

      <div className="bg-card rounded-xl shadow-card p-6">
        <Users className="h-10 w-10 text-primary mb-4" />

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label>Current Status</Label>
            <Select defaultValue="low">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="count">Current Visitor Count</Label>
            <Input
              id="count"
              type="number"
              defaultValue={150}
              className="mt-1"
            />
          </div>

          <Button className="w-full">Update Status</Button>
        </form>
      </div>
    </div>
  );
}