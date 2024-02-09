import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  // get user session from middleware
  const session = await auth();
  const user = session?.user;

  return (
    <main className="flex flex-col gap-6 items-center">
      <p className="text-6xl font-medium">Welcome, {user?.name}.</p>
      <LogoutButton>
        <Button
          size="lg"
          className="text-lg hover:bg-destructive/75 hover:text-white"
          variant="secondary"
        >
          Logout
        </Button>
      </LogoutButton>
    </main>
  );
}
