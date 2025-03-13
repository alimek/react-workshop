import type { FormValues } from "../components/SettingsForm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { SettingsForm } from "../components/SettingsForm";

export function SettingsPage() {
  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
