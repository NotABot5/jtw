import Attempt from "@/components/attempts/attempt";

export default function Page({ params }) {
  return <Attempt attempt_id={params.id} show_full_answers={true} />;
}
