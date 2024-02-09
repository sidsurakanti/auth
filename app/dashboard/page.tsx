import { auth, signOut } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const user = await auth();
  console.log(user);

  return (
    <main className="flex flex-col gap-5 items-center">
      <p className="text-5xl">Welcome, {user?.user?.name}.</p>
      <LogoutButton>
        <Button size="lg" variant="secondary">
          Sign out
        </Button>
      </LogoutButton>
    </main>
  );
}
