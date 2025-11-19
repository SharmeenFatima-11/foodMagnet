import { Suspense } from "react";
import CreatePasswordPage from "./createPasswordPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePasswordPage />
    </Suspense>
  );
}
