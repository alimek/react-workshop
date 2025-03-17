import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useSettingsStoreReady } from "~/lib/store/settings";
import { SettingsForm } from "../components/SettingsForm";

export function SettingsPage() {
  const isReady = useSettingsStoreReady();

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Card className="w-full max-w-md min-w-sm">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm />
        </CardContent>
      </Card>
      <Button asChild>
        <Link to="/game">Start Game </Link>
      </Button>
    </div>
  );
}
