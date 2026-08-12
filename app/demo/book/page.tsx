import { redirect } from "next/navigation";

const FALLBACK_BOOKING_URL = "https://cal.com/clovo/demo";

export default function DemoBookingPage() {
  redirect(process.env.CAL_BOOKING_URL || FALLBACK_BOOKING_URL);
}
